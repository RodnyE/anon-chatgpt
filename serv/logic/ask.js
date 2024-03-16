
const UserAgent = require("user-agents"); 
const chp = require('child_process');
const { API_URL, API_CLIENT_TOKEN, API_USER_AGENT } = process.env;

/**
 * Sends a question request to the anonymous chat API
 *
 * @param {object} requestBody - Request body.
 * @param {string} requestBody.question - User question
 * @param {object} options - options object.
 * @param {string} options.userAgent - User agent
 * @param {string} options.ip - User IP Address 
 * @returns {Promise<string>} - resolves to the response text.
 */
const askAI = (requestBody, options = {}) => {

    // Default request
    const body = {
        "model": "gpt-3.5-turbo",
        "nsfw": false,
        "question": "null",
        "history": [{"role":"assistant","content":"Hello there 😃, I am ChatGPT. How can I help you today?"}],
        "system": "You are help assitant. Follow the user's instructions carefully.",
        "temperature": 0.7,
        "promptId": "model-gpt-3.5-turbo",
        "documentIds": [],
        "chatFileDocumentIds": [],
        "generateImage": false,
        "generateAudio": false
    };

    // Combines the request body with the default request
    Object.assign(body, requestBody);

    // Converts the body to a JSON string
    const bodyString = JSON.stringify(body);
    
    // Sends the request using curl
    return new Promise((resolve, reject) => {
        // Random user-agent
        const ua = options.userAgent || API_USER_AGENT || new UserAgent(/Linux/); 
        
        // Use curl comand to evade CORS restrictions and evade server refuse.
        const curl = chp.spawn('curl', [
            API_URL,
            '-X', 'POST',
            '-H', 'User-Agent: ' + ua.toString(),
            '-H', 'Accept: application/json, text/plain, */*',
            '-H', 'Content-Type: application/json',
            '-H', 'Authorization: Bearer ' + API_CLIENT_TOKEN,
            '--data-raw', bodyString, 
            '--compressed'
        ]); 
        let responseData = '';
        
        // get chunks
        curl.stdout.on('data', (data) => {
            responseData += data.toString();
        });
        
        // end
        curl.on('close', (code) => { 
            
            if (code === 0) {
                // Processes the response
                let events = responseData.split("\n\n");
                let responseText = "";

                events.forEach((json) => {
                    try {
                        let event = JSON.parse(json.trim());
                        
                        if (event.event === "text") {
                            responseText += event.data;
                        }
                    } catch (e) {
                        // Does nothing...
                        // this event is not a json object
                    }
                });
                
                if (responseText.length === 0) {
                    // Anonymous server refuse the request
                    // Try again 
                    console.log("  !  Ask fail: " + ua.toString());
                    askAI(requestBody).then((_responseText) => {
                        resolve(_responseText);
                    })
                }
                else {
                    // Request successful 
                    console.log("  !  Ask success");
                    resolve(responseText);
                }
            } else {
                reject(new Error("curl exited with code " + code));
            }
        });

        curl.on('error', (error) => {
            reject(error);
        });
    });
};

//
module.exports = { 
    askAI,
};
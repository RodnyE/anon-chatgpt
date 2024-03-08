
import axios from "axios"
import { API_URL, API_CLIENT_TOKEN } from "../env.json"
 
/**
 * Axios options to ask request
 * @type {object}
 */
const requestOptions = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + API_CLIENT_TOKEN,
    }
};

/**
 * Sends a question request to the anonymous chat API.
 *
 * @param {object} requestBody - Request body.
 * @returns {Promise<string>} - resolves to the response text.
 */
export const askAI = (requestBody) => {

    // Default request
    const body = {
        "model": "gpt-3.5-turbo",
        "nsfw": false,
        "question": "null",
        "history": [],
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

    // Sends the request
    return axios.post(API_URL, body, requestOptions)
    .then(response => {
        // Processes the response
        let stream = response.data;
        let events = stream.split("\n\n");
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
        
        return Promise.resolve(responseText);
    });
};
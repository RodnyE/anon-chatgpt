
import axios from "axios"  

/**
 * Axios options to ask request
 * @type {object}
 */
const requestOptions = {
    headers: {
        'Content-Type': 'application/json', 
    }
};

/**
 * Sends a question request to the anonymous chat API.
 *
 * @param {object} requestBody - Request body.
 * @returns {Promise<string>} - resolves to the response text.
 */
export const askAI = (requestBody) => {
     
    // Sends the request
    return axios.post(
        "/api/chat", 
        requestBody, 
        requestOptions
    )
    .then(({data}) => {
        let answer = data.data.answer;
        
        return Promise.resolve(answer);
    });
};
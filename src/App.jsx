import { useState } from "react";
import { askAI } from "./logic/ask";

import Navbar from "./ui/Navbar";
import View from "./ui/View";
import Button from "./ui/Button";
import ChatBody from "./ui/ChatBody";
import ChatField from "./ui/ChatField";
import AnonIcon from "./icons/AnonIcon";

/**
 * Application component. 
 */
export default function App() {
    const [messageList, setMessageList] = useState([]);

    /**
     * Handles sending a message.
     * @param {string} messageContent - The content of the message.
     */
    const handleSendMessage = (messageContent) => {
        const messageListState = [...messageList];
       
        messageListState.push({
            content: messageContent,
            author: "user",
        });
        setMessageList(messageListState);
        
        // Send ask
        askAI({question: messageContent})
            .then((answer) => {
                messageListState.push({
                    content: answer,
                    author: "assistant",
                });
                setMessageList([...messageListState]);
            })
            .catch((error) => {
                messageListState.push({
                    content: error.toString(),
                    author: "system"
                })
                setMessageList([...messageListState]);
            });
    };

    return (
        <View show={true}>
            <Navbar>
                <AnonIcon width="3rem" fill="var(--bs-primary)"/>
                <h1 className="m-0 text-primary"> Anon ChatGPT </h1>
            </Navbar>

            <ChatBody messageList={messageList} />

            <ChatField onSend={handleSendMessage} />
        </View>
    );
}
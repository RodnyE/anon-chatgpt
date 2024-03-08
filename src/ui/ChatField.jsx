
import { useState } from "react"

import TextField from "./TextField"
import Button from "./Button"


export default function ChatField ({onSend}) {
    const [content, setContent] = useState("hols");
    
    return (
        <div className="d-flex p-1">
        
          <div className="m-1 flex-grow-1">
            <TextField
              value={content}
              onInput={(e) => setContent(e.target.value)}
            />
          </div>
          
          <div className="m-1">
            <Button onClick={() => {
                onSend(content);
                setContent("");
            }}> Enviar </Button>
          </div>
          
        </div>
    )
}
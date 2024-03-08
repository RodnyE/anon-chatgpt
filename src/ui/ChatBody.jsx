
/**
 * A message component
 */
function ChatMessage ({content, author}) {
    return (
      <div 
        className={
            "user-select-all d-flex align-items-center m-1 p-2 " +
            "border-3 rounded " + 
            (author === "system" ? 
              "border-danger text-danger " : 
              "border-primary "
            ) +
            (author === "user" ? 
              "border-end justify-content-end " : 
              "border-start justify-content-start "
            )
        }
      >
        {content} 
      </div>
    );
}

/**
 * Messages container
 */
function ChatBody ({messageList}) {
    return (
        <div className="d-flex overflow-y-auto flex-column flex-grow-1">
          {messageList.map((message, index) => {
              return <ChatMessage 
                key={index}
                content={message.content}
                author={message.author}
              /> 
          })}
        </div>
    )
}

export default ChatBody;
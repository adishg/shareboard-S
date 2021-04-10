import React, { useState } from "react";
import "./MessageInput.scss";

type MessageInputProps = {
  sendMessage: Function;
};

export const MessageInput: React.FC<MessageInputProps> = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  return (
    <div className="cmp-message-input input-group">
      <textarea
        value={message}
        className="form-control"
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <div className="input-group-append">
        <button
          onClick={() => {
            message.length && sendMessage(message);
          }}
          className="btn btn-primary bg-primary m-0"
          type="button"
        >
          Send
        </button>
      </div>
    </div>
  );
};

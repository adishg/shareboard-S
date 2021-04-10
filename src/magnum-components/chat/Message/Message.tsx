import React from "react";
import "./Message.scss";

type MessageProps = {
  children?: React.ReactNode;
  isOwnMessage: boolean;
  messageObj: any;
};

export const Message: React.FC<MessageProps> = ({
  isOwnMessage,
  messageObj,
}: MessageProps) => {
  return (
    <div className="cmp-message">
      {messageObj.joinedStatus !== 1 ? (
        <span className={isOwnMessage ? "own-message" : "others-message"}>
          <small>{messageObj.from}</small>
          {messageObj.text}
        </span>
      ) : (
        <small
          className="status"
          style={{ display: "block", textAlign: "center" }}
        >
          {isOwnMessage}
          {isOwnMessage
            ? `You ${messageObj.text}`
            : `${messageObj.from} ${messageObj.text}`}
        </small>
      )}
    </div>
  );
};

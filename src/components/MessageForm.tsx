import React, { useState } from "react";

const styles: Record<string, React.CSSProperties> = {
  addMessage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1em",
  },
};

type Props = {
  onSubmit: (message: string) => void;
};

const MessageForm: React.FC<Props> = ({ onSubmit }) => {
  const [message, setMessage] = useState<string>("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSubmit(message);
      setMessage("");
    }
  };

  return (
    <div style={styles.addMessage}>
      <label htmlFor="AddMessage">Add message, submit by enter.</label>
      <input
        type="text"
        id="AddMessage"
        value={message}
        onChange={onChange}
        onKeyDown={onEnter}
      />
    </div>
  );
};

export default MessageForm;

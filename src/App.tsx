import React, { useState } from "react";
import Messages from "./components/Messages";
import MessageForm from "./components/MessageForm";

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: "#282c34",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    color: "white",
  },
  messages: {
    marginTop: "2em",
  },
};

const App: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const onSubmit = (message: string) => {
    setMessages([message, ...messages]);
  };

  return (
    <div style={styles.container}>
      <MessageForm onSubmit={onSubmit} />
      <div style={styles.messages}>
        <Messages messages={messages} />
      </div>
    </div>
  );
};

export default App;

import React from "react";

type Props = {
  messages: string[];
};

const Messages: React.FC<Props> = ({ messages }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Messages</th>
        </tr>
      </thead>
      <tbody>
        {messages.length > 0 ? (
          messages.map((m, index) => (
            <tr key={index}>
              <td>{m}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td>no messages.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Messages;

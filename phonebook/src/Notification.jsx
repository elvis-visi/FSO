const Notification = ({ message }) => {
  const messageStyle = {
    color: message.type === "green" ? "green" : "red",
    fontStyle: "italic",
    fontSize: 16,
    borderStyle: "solid",
    borderColor: "green",
    backgroundColor: "lightGrey",
    marginBottom: 10,
    padding: 5,
  };

  if (!message.type) {
    return null;
  }

  return <div style={messageStyle}>{message.mess}</div>;
};

export default Notification;

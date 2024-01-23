const Notification = ({ message }) => {
  const messageStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
    borderStyle: "solid",
    borderColor: "green",
    backgroundColor: "lightGrey",
    marginBottom: 10,
    padding: 5,
  };

  if (message === null) {
    return null;
  }

  return <div style={messageStyle}>{message}</div>;
};

export default Notification;

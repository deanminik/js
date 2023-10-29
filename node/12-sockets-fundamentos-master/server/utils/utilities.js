const createMessage = (name, message) => {
    return {
        name,
        message,
        sentDate: new Date().getTime()
    };
}

module.exports = {
    createMessage
}
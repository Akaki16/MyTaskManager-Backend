// define info function for logging iformational messages
const info = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(...params);
    }
}

// define error function for logging error type messages
const error = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        console.error(...params);
    }
}

// export logger functions to use them in other files
module.exports = {
    info,
    error
};
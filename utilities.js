const isValidUrl = (url) => {
    if (url.startsWith("http://") || url.startsWith("https://")) {
        return true;
    }
}

module.exports = { isValidUrl };
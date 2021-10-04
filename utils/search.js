const YouTube = require('simple-youtube-api');
const { get_key } = require("./apikey");

function search(keyword, limit) {
    const youtube = new YouTube(get_key());
    try {

        let results = youtube.searchVideos(keyword, limit)
        return results;

    } catch (error) {

        console.error(error)

    }
}


module.exports = { search }
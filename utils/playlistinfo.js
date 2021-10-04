const YouTube = require('simple-youtube-api');
const { get_key } = require("./apikey");

function playlist_info(p_id) {
    const youtube = new YouTube(get_key());
    try {

        let p = youtube.getPlaylistByID(p_id)
        return p;

    } catch (error) {

        console.error(error)

    }
}

module.exports = { playlist_info }
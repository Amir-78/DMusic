const YouTube = require('simple-youtube-api');
const { get_key } = require("./apikey");

function video_info(v_id) {
    const youtube = new YouTube(get_key());
    try {

        let v = youtube.getVideo(`https://www.youtube.com/watch?v=${v_id}`)
        return v;

    } catch (error) {

        console.error(error)

    }
}

module.exports = { video_info }
const { playlist_info } = require("../utils/playlistinfo");

async function getPlaylistVideos(p_id) {
    let playlist = await playlist_info(p_id);
    let pv = await playlist.getVideos();
    return pv;
}
module.exports = {getPlaylistVideos}
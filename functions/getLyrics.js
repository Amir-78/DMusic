const lyricsFinder = require('lyrics-finder');

async function getLyrics(title) {
    let lyrics = await lyricsFinder("", title) || "Not Found!";
    return lyrics;
}
module.exports = {getLyrics}
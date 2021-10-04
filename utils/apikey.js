const config = require("../config.json");
function get_key(){
    var key = config.YT_API_KEYS[Math.floor(Math.random()*config.YT_API_KEYS.length)];
    return key;
}

module.exports = { get_key }
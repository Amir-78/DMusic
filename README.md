# DMusic

**DMusic** is a discord bot coded with `discord.js v13` Library.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install required packages.

```bash
git clone https://github.com/Amir-78/DMusic
cd DMusic
npm install
```

## FFMPEG Installation

```bash
sudo apt-get install ffmpeg # ffmpeg debian/ubuntu
npm install ffmpeg-static # ffmpeg windows
```
## Usage

- **`config.json`**
```json
{
    "BOT_TOKEN": "YOUR_BOT_TOKEN",
    "BOT_PREFIX": "=",
    "BOT_LISTENING_TITLE" : "Between the Bars",
    "YT_API_KEYS": ["",""],
    "DEVELOPER_ID": "",
    "CODE_VERSION": "1.0.0"
}
```
- `BOT_TOKEN` : **Your bot token**
- `BOT_PREFIX` : **Your bot prefix**
- `BOT_LISTENING_TITLE` : **Listening status title**
- `YT_API_KEYS` : **Youtube API Keys** ( For better result, use more than one from different projects, [Click Here](https://developers.google.com/youtube/v3/getting-started))

## Commands:
**`help`,`play`,`pause`,`resume`,`stop`,`replay`,`queue`,`loop`,`np`,`volume`,`move`,`remove`,`lyrics`,`skip`,`clear`**

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://github.com/Amir-78/DMusic/blob/add-license-1/LICENSE)

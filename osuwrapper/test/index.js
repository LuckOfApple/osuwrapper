const osu = require('osuwrapper')
const client = new osu.Client("1191e7a1e6ea7be72a769e63fb45bbf44a91addd", 1)

async function yo() {
    const res = await client.beatmap.getCoverThumbnail(1115515)
    console.log(res)
}

yo()
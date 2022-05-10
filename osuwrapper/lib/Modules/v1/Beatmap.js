const Module = require("./Module")
const fetch = require('node-fetch-commonjs');

class Beatmap extends Module {
    constructor(client) { super(client) }
    

    async get(sId) {
        const response = await this.callOsu('get_beatmaps', {
            s: sId
        })
        return response;
    }

    async getCoverImage(bm = this.res) {
        const beatmap = bm.setId || bm[0]?.beatmapset_id || bm;
        if (!beatmap) throw new Error("No beatmap specified.");
        if (String(beatmap).match(/^[0-9]+$/) != null) {
            const link = `https://assets.ppy.sh/beatmaps/${beatmap}/covers/cover.jpg`
            const res = await fetch(link)
            if (res.status !== 200) throw new Error({ 404: "Not found." });
            return link;
        } else {
            throw new Error("Beatmap given was not formatted correctly.");
        }
    }

    async getCoverThumbnail(bm) {
        const beatmap = bm.setId || bm[0]?.beatmapset_id || bm;
        if (!beatmap) throw new Error("No beatmap specified.");
        if (String(beatmap).match(/^[0-9]+$/) != null) {
            const link = `https://b.ppy.sh/thumb/${beatmap}l.jpg`
            const res = await fetch(link)
            if (res.status !== 200) throw new Error({ 404: "Not found." });
            return link;
        } else {
            throw new Error("Beatmap given was not formatted correctly.");
        }
    }
}

module.exports = Beatmap;
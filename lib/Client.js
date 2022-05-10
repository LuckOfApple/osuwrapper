const superagent = require('superagent');
const Check = require('./Util/CheckToken')

const BeatmapV1 = require('./Modules/v1/Beatmap')

const AuthenticationV2 = require('./Modules/v2/Authentication')

class Client {
    constructor(key, version = 1, options = {}) {
        if (!key) throw new Error("osu! api key not specified.");
            this.key = key;
            this.base = options.base || `https://osu.ppy.sh/api/${version == 2 ? 'v2/' : ''}`
        switch (version) {
            case 1:
                this.version = 1;
                this.beatmap = new BeatmapV1(this)
                break;
            case 2:
                this.version = 2;
                this.auth = AuthenticationV2(this)
                break;
            default:
                throw new Error("The specified api version is invalid. It must be 1 or 2.");
        }
    }
    async callOsu(endpoint, options = {}, key = this.key, base = this.base) {
        try {
            options.k = key;
            const res = await superagent.get(base + endpoint)
                .query(options)
            if (!res.body || res.body?.length <= 0) {
                throw new Error({ 404: "Not found." });
            } else {
                return res.body;
            }
        } catch (error) {
            throw new Error(error.response || error);
        }
    }
}

module.exports = { Client };
class Module {
    constructor (client) {
        this.key = client.key;
        this.base = client.base;
        this.version = client.version;
        this.callOsu = client.callOsu
    }
}

module.exports = Module;
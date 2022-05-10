const fetch = require('superagent')

async function check(client) {
    console.log(client.key)
    console.log(await get('get_beatmaps', {
        k: client.key,
        s: 1115515
    }, client.base))
}

async function get(endpoint, params = {}, base) {
    const response = await fetch(base + endpoint, {
        method: 'GET',
        params: params,
        redirect: 'follow'
    });
    return response.json();
}

module.exports = check;
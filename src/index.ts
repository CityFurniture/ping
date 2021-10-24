import * as ping from 'ping'

interface Params {
    endpoint:  string;
    interval: number;
}

const endpoint: Params["endpoint"] = process.env.PING_HOST as string
const intervalString: string = process.env.PING_INTERVAL as string
const interval: number = Number.parseInt(intervalString, 10)

async function main(endpoint: Params["endpoint"]): Promise<void> {
    try {
        let res = await ping.promise.probe(endpoint);
        console.log(res)
    } catch (err) {
        console.log(err)
    }
}

setInterval(() => { main(endpoint) }, interval)


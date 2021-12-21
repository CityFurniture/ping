import * as ping from 'ping'
import * as NR from 'newrelic'
interface Params {
    endpoint:  string;
    interval: number;
}

if ('NEWRELIC_LICENSE_KEY' in process.env) {
    const endpoint: Params["endpoint"] = process.env.PING_HOST as string
    const intervalString: string = process.env.PING_INTERVAL as string
    const interval: number = Number.parseInt(intervalString, 10)
    
    async function main(endpoint: Params["endpoint"]): Promise<void> {
        try {
            let res = await ping.promise.probe(endpoint)
            const nrEvent = res as any
            nrEvent.times = JSON.stringify(res.times)
            NR.recordCustomEvent('host_ping', nrEvent)
        } catch (err) {
            console.log(err)
        }
    }
    
    setInterval(() => { main(endpoint) }, interval)
} else {
    console.log('No NEWRELIC_LICENSE_KEY found.')
}


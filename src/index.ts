import * as ping from 'ping'
import axios from 'axios'
// import * as https from 'https'
import { gzip } from 'zlib'
import { promisify } from 'util'
interface Params {
    endpoint:  string;
    interval: number;
}

const do_gzip = promisify(gzip)

// const agent = new https.Agent({  
//     rejectUnauthorized: false
// })

if ('NEW_RELIC_ACCOUNT_ID' in process.env && 'NEW_RELIC_API_KEY' in process.env) {
    const newrelicAPI = `https://insights-collector.newrelic.com/v1/accounts/${process.env.NEW_RELIC_ACCOUNT_ID}/events`
    const newrelicHeaders = { 
        'Api-Key': process.env.NEW_RELIC_API_KEY,
        'Content-Type': 'application/json',
        'Content-Encoding': 'gzip'
    }

    const endpoint: Params["endpoint"] = process.env.PING_HOST as string
    const intervalString: string = process.env.PING_INTERVAL as string
    const interval: number = Number.parseInt(intervalString, 10)
    
    async function main(endpoint: Params["endpoint"]): Promise<void> {
        try {
            let res = await ping.promise.probe(endpoint)
            const nrEvent = res as any
            nrEvent.times = JSON.stringify(res.times)
            nrEvent.eventType = 'Ping'
            const request = Buffer.from(JSON.stringify(nrEvent), 'utf-8')
            const gzippedBody = await do_gzip(request)
            await axios.post(newrelicAPI, gzippedBody, { headers: newrelicHeaders /* httpsAgent: agent */ })
        } catch (err) {
            console.log(err)
        }
    }
    
    setInterval(() => { main(endpoint) }, interval)
} else {
    console.log('No NEWRELIC_LICENSE_KEY found.')
}


# ping
Container to ping a host, internal ones mostly, utilizing node-ping and reporting to Newrelic through [Events API](https://docs.newrelic.com/docs/data-apis/ingest-apis/introduction-event-api/#submit-event).

Get the latest [package version](https://github.com/CityFurniture/ping/pkgs/container/ping)
```
docker pull ghcr.io/CityFurniture/ping:main
```

Run container, passing `PING_HOST` as a string, defaults to example.com, and `PING_INTERVAL` in milliseconds, defaults to 5000.

You will need to pieces of info from NR:
- Account ID
- API Key

### One-liner

```go
docker run -e "NEW_RELIC_ACCOUNT_ID={NEW_RELIC_ACCOUNT_ID}" -e "NEW_RELIC_API_KEY={NEW_RELIC_API_KEY}" -e "PING_HOST=example.com" -e "PING_INTERVAL=2000"  ghcr.io/CityFurniture/ping:main 
```

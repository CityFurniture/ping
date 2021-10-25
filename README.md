# ping
Container to ping a host, internal ones mostly, utilizing node-ping.

Get the latest [package version](https://github.com/RabeaWahab/ping/pkgs/container/ping)
```
docker pull ghcr.io/rabeawahab/ping:main
```

Run container, passing PING_HOST as a string, defaults to google.com, and PING_INTERVAL in milliseconds, defaults to 5000.
```
docker run ghcr.io/rabeawahab/ping:main -e PING_HOST=google.com -e PING_INTERVAL=2000
```

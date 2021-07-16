# Getting Started (nuxt.config.js)
```properties
import requests from '@geedium/requests';

serverMiddleware: [
    requests.create({
        whitelist: [], // IP addresses to block
        log: true // Log every request
    })
]
```
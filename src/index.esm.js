function create(_options = []) {
    const options = { ..._options}

    function middleware(req, res, next) {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
        let block = false;
        
        if(options.whitelist && Array.isArray(options.whitelist)) {
            whitelist.forEach(attacker => {
                if(ip == attacker) {
                    block = true;
                }
            });
        }

        if(options.log) {
            console.log('[\x1b[1m\x1b[37m' + req.method + '\x1b[0m/\x1b[1m\x1b[33m' + ip + '\x1b[0m]: \x1b[2m\x1b[37m' + req.url + '\x1b[0m')
        }

        if(!block && next) {
            next();
        } else {
            res.end();
        }
    }

    middleware.create = create;

    return middleware;
}

export default create({})
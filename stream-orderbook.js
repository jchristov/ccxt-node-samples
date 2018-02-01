"use strict";

const asTable   = require ('as-table')
    , log       = require ('ololog').noLocate
    , ansi      = require ('ansicolor').nice
    , ccxt      = require ('ccxt')
    , redis     = require("redis")
    , client    = redis.createClient();

let printSupportedExchanges = function () {
    log ('Supported exchanges:', ccxt.exchanges.join (', ').green)
}

let printUsage = function () {
    log ('Usage: node', process.argv[1], 'exchange'.green, 'symbol'.yellow, 'depth'.cyan)
    printSupportedExchanges ()
}

let streamOrderBook = async (id, symbol, depth) => {

    // check if the exchange is supported by ccxt
    let exchangeFound = ccxt.exchanges.indexOf (id) > -1
    if (exchangeFound) {

        log ('Instantiating', id.green, 'exchange')

        // instantiate the exchange by id
        let exchange = new ccxt[id] ({ enableRateLimit: true })

        // load all markets from the exchange
        let markets = await exchange.loadMarkets ()

        // // output a list of all market symbols
        // log (id.green, 'has', exchange.symbols.length, 'symbols:', exchange.symbols.join (', ').yellow)

        if (symbol in exchange.markets) {

            const market = exchange.markets[symbol]
            const pricePrecision = market.precision ? market.precision.price : 8
            const amountPrecision = market.precision ? market.precision.amount : 8

            // Object.values (markets).forEach (market => log (market))

            // make a table of all markets
            // const table = asTable.configure ({ delimiter: ' | ' }) (Object.values (markets))
            // log (table)

            const priceVolumeHelper = color => ([price, amount]) => ({
                price: price.toFixed (pricePrecision)[color],
                amount: amount.toFixed (amountPrecision)[color],
            })

            const cursorUp = '\u001b[1A'
            const tableHeight = depth * 2 + 9 // bids + asks + headers

            while (true) {

                const orderbook = await exchange.fetchOrderBook (symbol)

                client.hset(id, `${symbol}:asks`, JSON.stringify(orderbook.asks.slice (0, depth).reverse()), redis.print );
                client.hset(id, `${symbol}:bids`, JSON.stringify(orderbook.bids.slice (0, depth)), redis.print );

            }

        } else {

            log.error ('Symbol', symbol.bright, 'not found')
        }


    } else {

        log ('Exchange ' + id.red + ' not found')
        printSupportedExchanges ()
    }
}

;(async function main () {

    if (process.argv.length > 4) {

        const id = process.argv[2]
        const symbol = process.argv[3].toUpperCase ()
        const depth = parseInt (process.argv[4])
        await streamOrderBook (id, symbol, depth)

    } else {

        printUsage ()
    }

    process.exit ()

}) ()
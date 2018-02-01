# ccxt-node-samples
    
    # install libs
    npm install 

    # display live datas
    node live-orderbook.js binance xrp/btc 10

    # show all exchanges for a symbol
    node search-all-exchanges.js --strict xrp/btc

    # stream one symbol for one exchange
    node stream-orderbook.js binance xrp/btc 10

    # read from redis
    node read-redis.js

    # start all streams
    ./start-stream.sh

    # stop all streams
    ./stop-stream.sh

    # list all streams running
    ps -eaf | grep -i stream-orderbook.js | grep -v grep


    # launch redis
    docker run -d --name redis-server -p 6379:6379 redis

    # read all from redis
    docker exec -it $(docker ps -a -q --filter="name=redis-server") redis-cli HGETALL "XRP/BTC"

    # read asks only
    docker exec -it $(docker ps -a -q --filter="name=redis-server") redis-cli HGET "XRP/BTC" binance:asks

    # read bids only
    docker exec -it $(docker ps -a -q --filter="name=redis-server") redis-cli HGET "XRP/BTC" binance:bids

    # display continuously data
    while :; do docker exec -it $(docker ps -a -q --filter="name=redis-server") redis-cli HGET "XRP/BTC" binance:bids; done

    # stop then delete
    docker stop $(docker ps -a -q --filter="name=redis-server")
    docker rm $(docker ps -a -q --filter="name=redis-server")

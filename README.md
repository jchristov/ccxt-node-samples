# ccxt-node-samples

    node live-orderbook.js binance xrp/btc 10
    node search-all-exchanges.js --strict xrp/btc

    node stream-orderbook.js binance xrp/btc 10
    node read-redis.js

    ./start-stream.sh
    ./stop-stream.sh

    # run redis
    docker run -d --name redis-server -p 6379:6379 redis

    # read from redis
    docker exec -it $(docker ps -a -q --filter="name=redis-server") redis-cli HGETALL binance

    # stop then delete
    docker stop $(docker ps -a -q --filter="name=redis-server")
    docker rm $(docker ps -a -q --filter="name=redis-server")

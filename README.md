# ccxt-node-samples

    node live-orderbook.js binance xrp/btc 10
    node stream-orderbook.js binance xrp/btc 10


    # run redis 
    docker run -d --name redis-server -p 6379:6379 redis
  
    # stop then delete
    docker stop $(docker ps -a -q --filter="name=redis-server")
    docker rm $(docker ps -a -q --filter="name=redis-server")


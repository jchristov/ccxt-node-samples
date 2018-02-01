#!/bin/bash

symbol="xrp/btc"
depth="10"
list="anxpro binance bitcoincoid bitfinex bitfinex2 bitso bitstamp bitstamp1 bittrex btcmarkets cex gateio hitbtc hitbtc2 huobipro kraken lakebtc okex poloniex qryptos zb"

for market in $list
do
  echo "launch " $market
  node stream-orderbook.js $market $symbol $depth &
done

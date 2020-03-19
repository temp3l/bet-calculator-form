import React from 'react';

export const defaultInstrument: any = {
  lastPrice: 5360,
  symbol: 'XBTUSD',
  lastTickDirection: 'ZeroPlusTick',
  lastChangePcnt: -0.0031,
  timestamp: '2020-03-18T19:51:50.000Z',
  lastPriceProtected: 5360,
  totalVolume: 130883414135,
  volume: 844657,
  totalTurnover: 1866660381217816,
  turnover: 15793763386,
  impactBidPrice: 5346.7358,
  impactMidPrice: 5357,
  openValue: 842112402912,
  fairPrice: 5336.86,
  markPrice: 5336.86,
  indicativeSettlePrice: 5336.79,
  openInterest: 44941424,
  volume24h: 66254531,
  turnover24h: 1254763646039,
  homeNotional24h: 12547.63646039003,
  foreignNotional24h: 66254531,
  prevPrice24h: 5376.5,
  impactAskPrice: 5367.3984,
  fairBasis: 0.07,
  bidPrice: 5358.5,
  midPrice: 5359.25,
  askPrice: 5360,
  hasLiquidity: true,
  vwap: 5280.3886
};

const InstrumentContext = React.createContext(defaultInstrument);

export const InstrumentProvider = InstrumentContext.Provider;
export const InstrumentConsumer = InstrumentContext.Consumer;

export default InstrumentContext;

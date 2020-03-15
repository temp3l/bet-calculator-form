export enum OrderTypeEnum {
  Limit = 'Limit', // The default order type. Specify an orderQty and price.
  Market = 'Market', // A traditional Market order. A Market order will execute until filled or your bankruptcy price is reached, at which point it will cancel.
  Stop = 'Stop', // A Stop Market order. Specify an orderQty and stopPx. When the stopPx is reached, the order will be entered into the book.
  // On sell orders, the order will trigger if the triggering price is lower than the stopPx. On buys, higher.
  Note = 'Note', // Stop orders do not consume margin until triggered. Be sure that the required margin is available in your account so that it may trigger fully.
  Close = 'Close', // Stops don't require an orderQty. See Execution Instructions below.
  StopLimit = 'StopLimit', // Like a Stop Market, but enters a Limit order instead of a Market order. Specify an orderQty, stopPx, and price.
  MarketIfTouched = 'MarketIfTouched', // Similar to a Stop, but triggers are done in the opposite direction. Useful for Take Profit orders.
  LimitIfTouched = 'LimitIfTouched' // As above; use for Take Profit Limit orders.
}
export type IOrder = {
  symbol: string;
  orderQty: number;
  price: number;
  ordType: OrderTypeEnum;
  side: SideEnum;
  text?: string;
};

export enum SideEnum {
  Sell = 'Sell',
  Buy = 'Buy'
}
export type IOrderResponse = {
  orderID: string;
  clOrdID?: string;
  clOrdLinkID?: string;
  account?: number;
  symbol?: string;
  side?: string;
  simpleOrderQty?: number;
  orderQty?: number;
  price?: number;
  displayQty?: number;
  stopPx?: number;
  pegOffsetValue?: number;
  pegPriceType?: string;
  currency?: string;
  settlCurrency?: string;
  ordType?: string;
  timeInForce?: string;
  execInst?: string;
  contingencyType?: string;
  exDestination?: string;
  ordStatus?: string;
  triggered?: string;
  workingIndicator?: boolean;
  ordRejReason?: string;
  simpleLeavesQty?: number;
  leavesQty?: number;
  simpleCumQty?: number;
  cumQty?: number;
  avgPx?: number;
  multiLegReportingType?: string;
  text?: string;
  transactTime?: string;
  timestamp?: string;
};

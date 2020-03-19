import { createContext } from 'react';

const SocketContext = createContext({
  instrument: { lastPrice: -1 },
  trade: {},
  order: {},
  position: {},
  //quoteBin1m: {},
  orderBook: {},
  wallet: {}
});
export default SocketContext;

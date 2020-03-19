/* eslint-disable @typescript-eslint/no-unused-vars */
import crypto from 'crypto';

const SOCKET_CONNECTION_INIT = 'SOCKET_CONNECTION_INIT';
const SOCKET_CONNECTION_SUCCESS = 'SOCKET_CONNECTION_SUCCESS';
const SOCKET_CONNECTION_ERROR = 'SOCKET_CONNECTION_ERROR';
const SOCKET_CONNECTION_CLOSED = 'SOCKET_CONNECTION_CLOSED';
const SOCKET_MESSAGE = 'SOCKET_MESSAGE';

export const initialState = {
  connected: false,
  readyState: null,
  socket: null,
  instrument: {},
  trades: [],
  wallet: {},
  quoteBin1m: [],
  chat: [],
  order: {}
};

type SocketActionType = {
  type?: string;
  socket?: {
    connected: boolean;
  };
  data?: any;
};

export default function reducer(state = initialState, action: SocketActionType = {}) {
  switch (action.type) {
    case SOCKET_CONNECTION_INIT:
      return Object.assign({}, state, {
        connected: false,
        socket: action.socket
      });

    case SOCKET_CONNECTION_SUCCESS:
      return Object.assign({}, state, {
        connected: true
      });

    case SOCKET_CONNECTION_ERROR:
      return Object.assign({}, state, {
        connected: false
      });

    case SOCKET_CONNECTION_CLOSED:
      return Object.assign({}, state, {
        connected: false,
        socket: null
      });

    case SOCKET_MESSAGE:
      try {
        const { table, action: wsAction, data } = JSON.parse(action.data);
        if (table !== 'instrument' && table !== 'trade') console.log({ table, wsAction });
        if (table === 'instrument') return Object.assign({}, state, { instrument: Object.assign({}, state.instrument, ...data) });
        else if (table === 'trade') return Object.assign({}, state, { trades: state.trades.concat(data).slice(0, 100) });
        else if (table === 'order') return Object.assign({}, state, { order: Object.assign({}, state.order, ...data) });
        else if (table === 'wallet') return Object.assign({}, state, { wallet: Object.assign({}, state.wallet, ...data) });
        else if (table === 'quoteBin1m') return Object.assign({}, state, { quoteBin1m: state.quoteBin1m.concat(data).slice(0, 100) });
        else if (table === 'chat') return Object.assign({}, state, { chat: [...state.chat, ...data].slice(0, 800) });
        return state;
      } catch (e) {
        return state;
      }

    default:
      return state;
  }
}

export function initializeSocket() {
  return (dispatch: Function) => {
    const socket = new WebSocket('wss://testnet.bitmex.com/realtime');
    const expires = Math.round(new Date().getTime() / 1000) + 60; // 1 min in the future
    const signature = getSignature({ verb: 'GET', path: '/realtime', postBody: '' });
    const subscribe = (args: string[]) => socket.send(JSON.stringify({ op: 'subscribe', args }));

    dispatch(socketConnectionInit(socket));

    socket.onopen = function() {
      dispatch(socketConnectionSuccess());
      socket.send(JSON.stringify({ op: 'authKeyExpires', args: [process.env.REACT_APP_BITMEX_API_KEY, expires, signature] }));
      subscribe(['instrument:XBTUSD']);
      subscribe(['wallet']);
      subscribe(['order']);
      subscribe(['chat']);
      subscribe(['trade:XBTUSD']);
      subscribe(['quoteBin1m:XBTUSD']);
    };

    socket.onerror = function() {
      dispatch(socketConnectionError());
    };

    socket.onmessage = function(event) {
      dispatch(socketMessage(event.data));
    };

    socket.onclose = function() {
      dispatch(socketConnectionClosed());
    };
  };
}

function socketConnectionInit(socket: any) {
  return {
    type: SOCKET_CONNECTION_INIT,
    socket
  };
}

function socketConnectionSuccess() {
  return {
    type: SOCKET_CONNECTION_SUCCESS
  };
}

function socketConnectionError() {
  return {
    type: SOCKET_CONNECTION_ERROR
  };
}

function socketConnectionClosed() {
  return {
    type: SOCKET_CONNECTION_CLOSED
  };
}

function socketMessage(data: any) {
  return {
    type: SOCKET_MESSAGE,
    data
  };
}

export const getSignature = ({ verb, path, postBody }: any) => {
  const apiKey = `${process.env.REACT_APP_BITMEX_API_KEY}`;
  const apiSecret = `${process.env.REACT_APP_BITMEX_API_SECRET}`;

  const expires = Math.round(new Date().getTime() / 1000) + 60; // 1 min in the future
  const signature = crypto
    .createHmac('sha256', `${process.env.REACT_APP_BITMEX_API_SECRET}`)
    .update(verb + path + expires + postBody)
    .digest('hex');

  return signature;
};

// {"table":"order","action":"partial","keys":["orderID"],"types":{"orderID":"guid","clOrdID":"string","clOrdLinkID":"symbol","account":"long","symbol":"symbol","side":"symbol","simpleOrderQty":"float","orderQty":"long","price":"float","displayQty":"long","stopPx":"float","pegOffsetValue":"float","pegPriceType":"symbol","currency":"symbol","settlCurrency":"symbol","ordType":"symbol","timeInForce":"symbol","execInst":"symbol","contingencyType":"symbol","exDestination":"symbol","ordStatus":"symbol","triggered":"symbol","workingIndicator":"boolean","ordRejReason":"symbol","simpleLeavesQty":"float","leavesQty":"long","simpleCumQty":"float","cumQty":"long","avgPx":"float","multiLegReportingType":"symbol","text":"string","transactTime":"timestamp","timestamp":"timestamp"},"foreignKeys":{"symbol":"instrument","side":"side","ordStatus":"ordStatus"},"attributes":{"orderID":"grouped","account":"grouped","ordStatus":"grouped","workingIndicator":"grouped"},"filter":{"account":145875},"data":[]}
// {"table":"wallet","action":"partial","keys":["account","currency"],"types":{"account":"long","currency":"symbol","prevDeposited":"long","prevWithdrawn":"long","prevTransferIn":"long","prevTransferOut":"long","prevAmount":"long","prevTimestamp":"timestamp","deltaDeposited":"long","deltaWithdrawn":"long","deltaTransferIn":"long","deltaTransferOut":"long","deltaAmount":"long","deposited":"long","withdrawn":"long","transferIn":"long","transferOut":"long","amount":"long","pendingCredit":"long","pendingDebit":"long","confirmedDebit":"long","timestamp":"timestamp","addr":"symbol","script":"symbol","withdrawalLock":"symbols"},"foreignKeys":{},"attributes":{"account":"sorted","currency":"grouped"},"filter":{"account":145875},"data":[{"account":145875,"currency":"XBt","prevDeposited":637730,"prevWithdrawn":0,"prevTransferIn":1000000,"prevTransferOut":0,"prevAmount":683232,"prevTimestamp":"2020-03-18T12:00:00.043Z","deltaDeposited":0,"deltaWithdrawn":0,"deltaTransferIn":0,"deltaTransferOut":0,"deltaAmount":0,"deposited":637730,"withdrawn":0,"transferIn":1000000,"transferOut":0,"amount":683232,"pendingCredit":0,"pendingDebit":0,"confirmedDebit":0,"timestamp":"2020-03-18T12:00:00.602Z","addr":"2NBMEXHqAxZZTSrYzt8k78g2Yt6fQ2HARPy","script":"532102c10be2f0dc20f4285c25156aa22a0c46d2b89ccc4d1c8eaed92ea0c1a8f40c002102ceba29da1af96a0f2ef7cda6950b8be2baeb1adf12c0d5efebb70dbcaa086ba02103d5a42b90e9d7156155661979530a09d2e12e252ef4104e5611274a7ae7e2b0942103fefd3846d19d8f37e1c522c5027cf071d079280bfd6402e6eb2f9ddf6ceec3c154ae","withdrawalLock":[]}]}

// "announcement",        // Site announcements
// "chat",                // Trollbox chat
// "connected",           // Statistics of connected users/bots
// "funding",             // Updates of swap funding rates. Sent every funding interval (usually 8hrs)
// "instrument",          // Instrument updates including turnover and bid/ask
// "insurance",           // Daily Insurance Fund updates
// "liquidation",         // Liquidation orders as they're entered into the book
// "orderBookL2_25",      // Top 25 levels of level 2 order book
// "orderBookL2",         // Full level 2 order book
// "orderBook10",         // Top 10 levels using traditional full book push
// "publicNotifications", // System-wide notifications (used for short-lived messages)
// "quote",               // Top level of the book
// "quoteBin1m",          // 1-minute quote bins
// "quoteBin5m",          // 5-minute quote bins
// "quoteBin1h",          // 1-hour quote bins
// "quoteBin1d",          // 1-day quote bins
// "settlement",          // Settlements
// "trade",               // Live trades
// "tradeBin1m",          // 1-minute trade bins
// "tradeBin5m",          // 5-minute trade bins
// "tradeBin1h",          // 1-hour trade bins
// "tradeBin1d",          // 1-day trade bins

//auth:
// "affiliate",   // Affiliate status, such as total referred users & payout %
// "execution",   // Individual executions; can be multiple per order
// "order",       // Live updates on your orders
// "margin",      // Updates on your current account balance and margin requirements
// "position",    // Updates on your positions
// "privateNotifications", // Individual notifications - currently not used
// "transact"     // Deposit/Withdrawal updates
// "wallet"       // Bitcoin address balance data, including total deposits & withdrawals

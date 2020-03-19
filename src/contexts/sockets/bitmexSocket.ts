import { getSignature } from '../../connectors/bitmexHttp';

export default () => {
  const url = 'wss://testnet.bitmex.com/realtime';
  //const url = 'wss://localhost:4444/realtime';

  const ws = new WebSocket(url);
  const expires = Math.round(new Date().getTime() / 1000) + 60; // 1 min in the future
  const signature = getSignature({ verb: 'GET', path: '/realtime', postBody: '' });
  const subscribe = (args: string[]) => ws.send(JSON.stringify({ op: 'subscribe', args }));

  ws.onopen = () => {
    console.log('connected');
    ws.send(JSON.stringify({ op: 'authKeyExpires', args: [process.env.REACT_APP_BITMEX_API_KEY, expires, signature] }));
    subscribe(['instrument:XBTUSD']);
    subscribe(['wallet']);
    subscribe(['order']);
    //subscribe(['chat']);
    subscribe(['trade:XBTUSD']);
    //subscribe(['quoteBin1m:XBTUSD']);
    subscribe(['orderBook10:XBTUSD']);
  };

  ws.onclose = () => console.log('disconnected');
  return ws;
};

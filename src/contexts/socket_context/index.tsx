/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import SocketContext from './context';
import { initSockets } from '../sockets/index';

const SocketProvider = (props: any) => {
  const [value, setValue] = useState({
    instrument: { lastPrice: -1 },
    trade: {},
    order: {},
    position: {},
    orderBook: {},
    wallet: {}
  });

  // const [wallet, setWallet] = useState({});
  // const [position, setPosition] = useState({});
  // const [trade, setTrade] = useState({});
  // const [order, setOrder] = useState({});
  // const [orderBook, setOrderBook] = useState({});
  // const [instrument, setInstrument] = useState({});

  useEffect(() => initSockets({ setValue }), []); // setWallet, setPosition, setTrade, setOrder, setOrderBook, setInstrument

  return (
    <>
      <SocketContext.Provider {...{ value }}>{props.children}</SocketContext.Provider>;
    </>
  );
};
// , trade, position, order, orderBook, instrument

export default SocketProvider;

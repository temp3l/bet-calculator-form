import { socketEvents } from './events';
import bitmexSocket from './bitmexSocket';
import _ from 'lodash';

export const socket = bitmexSocket();

export const initSockets = ({ value, setValue: setVALUE, setWallet, setPosition, setTrade, setOrder, setOrderBook, setInstrument }: any) => {
  console.log('initSockets');

  let val = {};
  const setValue = (data: any) => {
    val = _.merge({}, val, data);
    setVALUE(val);
  };

  socketEvents({ value, setValue, setWallet, setPosition, setTrade, setOrder, setOrderBook, setInstrument }); // setValue    ^ is passed on to be used by socketEvents
};

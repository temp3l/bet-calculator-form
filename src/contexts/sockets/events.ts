/* eslint-disable @typescript-eslint/no-unused-vars */
import { socket } from './index';
import Emitter from '../../connectors/emitter';

export const socketEvents = ({ setValue, setWallet, setPosition, setTrade, setOrder, setOrderBook, setInstrument }: any) => {
  socket.onmessage = (evt: any) => {
    const { table, action, data } = JSON.parse(evt.data);

    // if (table === 'wallet') setWallet(JSON.parse(evt.data));
    // else if (table === 'position') setPosition(JSON.parse(evt.data));
    // else if (table === 'trade') setTrade(JSON.parse(evt.data));
    // else if (table === 'order') setOrder(data);
    // else if (table === 'orderBook10' || table === 'orderBookL2_25') setOrderBook(data);
    // else if (table === 'instrument') setInstrument(data);
    // else {
    //   if (data && !data.success) {
    //     console.log(evt);
    //   } else {
    //     //console.log(evt);
    //   }
    // }

    if (table) {
      if (data && data.length) {
        //data.forEach((msg: any) => setValue({ [table]: msg }));
      } else {
        //setValue({ [table]: JSON.parse(evt.data) });
      }
    } else {
      //console.log(evt);
    }

    if (table && data && data.length) {
      //Emitter.emit(table, data[0]);
      //console.log(table);

      Emitter.emit(table, { a: 1 });
      // console.log(data[0]);
    }
  };
};

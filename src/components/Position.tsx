import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => ({ position: state.socket.position });

const ConnectedList = ({ position }: any) => (
  <>
    <div className='tradeHist1ory'>
      <pre>{JSON.stringify(position, null, 4)}</pre>
    </div>
  </>
);

const List = connect(mapStateToProps)(ConnectedList);

export default List;

// const sample = { table: 'position', action: 'update',
// data: [{ account: 145875, symbol: 'XBTUSD', currentTimestamp: '2020-03-19T20:59:40.354Z',
// markPrice: 6255.42, posComm: 1275, posMargin: 240206, posMaint: 8552,
// maintMargin: 15828, timestamp: '2020-03-19T20:59:40.354Z', lastPrice: 6255.42,
// currency: 'XBt', currentQty: -77, liquidationPrice: 9186 }] };

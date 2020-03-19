import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => ({ socket: state.socket });

const ConnectedList = ({ socket }: any) => (
  <>
    <h3>Trades</h3>
    <pre>{JSON.stringify(socket.trades, null, 2)}</pre>

    {/*<h3>instrument</h3>
    <pre>{JSON.stringify(socket.instrument, null, 2)}</pre>
    */}
  </>
);

const List = connect(mapStateToProps)(ConnectedList);

export default List;

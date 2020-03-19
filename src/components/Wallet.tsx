import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => ({ wallet: state.socket.wallet });

const ConnectedList = ({ wallet }: any) => (
  <>
    <div>
      <h3>Orders</h3>

      <pre>{JSON.stringify(wallet, null, 2)}</pre>
    </div>
  </>
);

const List = connect(mapStateToProps)(ConnectedList);

export default List;

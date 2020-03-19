import React from 'react';
import { connect } from 'react-redux';
import { initializeSocket } from '../redux/reducers/socket';

type Iprops = {
  dispatch: Function;
  socket: {
    connected: Boolean;
  };
};
class App extends React.Component<Iprops> {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(initializeSocket());
  }

  render() {
    const { socket } = this.props;
    return socket.connected ? <div>Connected!</div> : <div>Connecting...</div>;
  }
}

function mapStateToProps(state: any) {
  return {
    socket: state.socket
  };
}

export default connect(mapStateToProps)(App);

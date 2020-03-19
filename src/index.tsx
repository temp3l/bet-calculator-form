import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import App from './App';
//import Socket from './connectors/bitmexSocket';
import configureStore from './redux/store/index';
//const socket = Socket(); //https://gist.github.com/l0gicgate/98e4c158ee833860d14cbb6a8d423ea5
import { initialState } from './redux/reducers/socket';
const store = configureStore({
  socket: initialState,
  articleReducer: {
    articles: []
  },
  instrumentReducer: {
    instrument: {}
  }
});
(window as any).store = store;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// ReactDOM.render(
//   <>
//     <SocketProvider>
//       <App />
//     </SocketProvider>
//   </>,
//   document.getElementById('root')
// );

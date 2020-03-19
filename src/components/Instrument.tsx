import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => ({ instrument: state.socket.instrument });

const ConnectedList = ({ instrument }: any) => (
  <>
    <div>
      <h3>{instrument.lastPrice}</h3>
      <table className='table table-dark table-condensed table-sm table-small'>
        <tbody>
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
      <pre>{JSON.stringify(instrument, null, 2)}</pre>
    </div>
  </>
);

const List = connect(mapStateToProps)(ConnectedList);

export default List;

// price amount time

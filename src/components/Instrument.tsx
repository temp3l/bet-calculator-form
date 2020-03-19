/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import InstrumentContext from '../contexts/instrument-context';

class ThemedButton extends React.Component {
  render() {
    let props = this.props;
    let theme = this.context;
    return <button {...props} style={{ backgroundColor: theme.background }} />;
  }
}
ThemedButton.contextType = InstrumentContext;

export default ThemedButton;

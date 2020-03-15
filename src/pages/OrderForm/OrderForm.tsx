/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent } from 'react';
import { Button, ToggleButton } from 'react-bootstrap';
import { OrderTypeEnum, IOrder, SideEnum } from '../../types/Order';
import './OrderForm.css';

const OrderTypes = [
  { value: 'Limit', text: 'The default order type. Specify an orderQty and price.' },
  { value: 'Market', text: 'A traditional Market order. A Market order will execute until filled or your bankruptcy price is reached, at which point it will cancel.' }
  //{ value: 'Stop', text: 'A Stop Market order. Specify an orderQty and stopPx. When the stopPx is reached, the order will be entered into the book. On sell orders, the order will trigger if the triggering price is lower than the stopPx. On buys, higher.' },
  //{ value: 'Note', text: 'Stop orders do not consume margin until triggered. Be sure that the required margin is available in your account so that it may trigger fully.' },
  //{ value: 'Close', text: "Stops don't require an orderQty. See Execution Instructions below." },
  //{ value: 'StopLimit', text: 'Like a Stop Market, but enters a Limit order instead of a Market order. Specify an orderQty, stopPx, and price.' },
  //{ value: 'MarketIfTouched', text: 'Similar to a Stop, but triggers are done in the opposite direction. Useful for Take Profit orders.' },
  //{ value: 'LimitIfTouched', text: 'As above; use for Take Profit Limit orders.' }
];
type StopsState = {
  SL: string;
  SLPrice: number;
  TP: string;
  TPPrice: number;
};
const Form = ({ onChange }: FormProps) => {
  const [stops, setStops] = React.useState<StopsState>({ SL: '10', SLPrice: 0, TP: '10', TPPrice: 0 });
  const [state, setState] = React.useState<IOrder>({
    symbol: 'XBTUSD',
    price: 5000,
    orderQty: 1,
    ordType: OrderTypeEnum.Limit,
    side: SideEnum.Buy,
    text: 'from bet-calculator-form'
  });
  const onChange2 = (e: any) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const changeStops = (e: any) => {
    const { name, value } = e.target;
    setStops({ ...stops, [name]: value });
  };

  const calculateStops = () => {};

  React.useEffect(() => {
    const { price: _price, side } = state;
    const SLDiff = (Number(_price) / 100) * Number(stops.SL);
    const TPDiff = (Number(_price) / 100) * Number(stops.TP);
    let _SLPrice, _TPPrice;
    if (side === 'Sell') {
      _SLPrice = Number(_price) + SLDiff;
      _TPPrice = Number(_price) - TPDiff;
    } else {
      _SLPrice = Number(_price) - SLDiff;
      _TPPrice = Number(_price) + TPDiff;
    }
    setStops({
      ...stops,
      SLPrice: Math.round(_SLPrice),
      TPPrice: Math.round(_TPPrice)
    });
  }, [stops.TP, stops.SL, state]);

  return (
    // prettier-ignore
    <div className='container'>
        {/* <!-- Symbol, Limit/Margin -->*/}
        <div className='form-group row none'>
          {/* <!-- select Symbol --> */}

          <div className='col'>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Symbol</span>
              </div>
              <input onChange={onChange2} type='text' name="symbol" className='form-control' id='symbol' value={state.symbol} />
            </div>
          </div>
          {/* <!-- select Limit --> */}
          <div className='col'>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Type</span>
              </div>
              <select className="form-control" id='ordType' onChange={onChange2} name="ordType">
                {OrderTypes.map( ({value,text}) => (
                  <option key={`oType-${value}`} value={value}>{value}</option>
                ))}
              </select>
            </div>
          </div>
        </div>


        {/* <!-- Action Button Group / Submit -->*/}
        <div className="form-group row">
          <div className="col">
            <button onClick={()=>setState({...state, side: SideEnum.Buy})} className={`btn btn-block  ${state.side === 'Buy' ? 'btn-success' : 'btn-outline-success' }`} >
              Long <span className="actionButtonSubtitle">{state.orderQty} @ {state.price}</span>
            </button>
          </div>
          <div className="col">
            <button onClick={()=>setState({...state, side: SideEnum.Sell})} className={`btn btn-block  ${state.side === 'Sell' ? 'btn-danger' : 'btn-outline-danger' }`} >
              Short <span className="actionButtonSubtitle">{state.orderQty} @ {state.price}</span>
            </button>
          </div>
        </div>

        {/* <!-- second row: Price + Quantity --> */}
        <div className='form-group row'>
          <div className='col'>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Price</span>
              </div>
              <input value={state.price} onChange={onChange2}  name="price" type='number' className='form-control' id='orderQty' placeholder='Contract Count' />
            </div>
          </div>
          <div className='col'>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Quantity</span>
              </div>
              <input value={state.orderQty} onChange={onChange2}  name="orderQty" type='number' className='form-control' id='orderQty' placeholder='Contract Count' />
            </div>
          </div>
        </div>


        {/* <!-- third Row: StopLoss + TakeProfit --> */}
        <div className='form-group row'>
          <div className='col'>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text stopsLabel">SL {stops.SL}%</span>
              </div>
              <input min="1" max="100" value={stops.SL} type="range" onChange={changeStops} name="SL" className="form-control form-control-range"/>
                <span className="font-weight-bold ml-2 mt-1">{stops.SLPrice}</span>
            </div>
          </div>

          <div className='col'>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text stopsLabel">TP {stops.TP}%</span>
              </div>
              <input min="1" max="100" value={stops.TP} type="range" onChange={changeStops} name="TP" className="form-control form-control-range" />
              <span className="font-weight-bold ml-2 mt-1">{stops.TPPrice}</span>
            </div>
          </div>
        </div>


      <br/>
      <br/><br/><br/><br/>
      <a href='htTPs://testnet.bitmex.com/api/explorer/#!/Order/Order_new' target='_blank' rel='noopener noreferrer'>posting bitmex orders</a>
      <br/><br/>
      <pre>{JSON.stringify({stops,state},null,2)}</pre>

    </div>
  );
};

type FormProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  price: number;
};

export default Form;

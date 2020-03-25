import React from 'react';

type IOrderType = {
  value: string;
  text: string;
};
const BaseForm = ({ ordType, side, price, lastPrice, onChange, orderTypes, amount = 1000, symbol = 'XBTUSD' }: { side: string; price: number; lastPrice: number; onChange: any; orderTypes: IOrderType[]; amount: number; symbol: string; ordType: string }) => {
  return (
    <>
      <div className='custom-control custom-switch'>
        <input onChange={(e: any) => onChange({ target: { name: 'side', value: side === 'Buy' ? 'Sell' : 'Buy' } })} name='side' checked={side === 'Buy' ? false : true} value={side} type='checkbox' className='custom-control-input' id='customSwitch1' />
        <label className='custom-control-label' htmlFor='customSwitch1'>
          {side}
        </label>
      </div>

      <div className='form-group row'>
        <div className='col'>
          {/* <!-- select Symbol --> */}
          <div className='input-group'>
            <div
              className='input-group-prepend clickRate'
              onClick={() => {
                onChange({ target: { name: 'price', value: lastPrice } });
              }}
            >
              <span className='input-group-text'>
                <span className='lastPrice'>฿ {lastPrice}</span>
              </span>
            </div>
            <input onChange={onChange} type='string' name='price' className='form-control' value={price} placeholder='amount' />
          </div>
        </div>
        <div className='col'>
          {/* <!-- select Symbol --> */}
          <div className='input-group'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>amount</span>
            </div>
            <input onChange={onChange} type='string' name='amount' className='form-control' value={amount} placeholder='amount' />
          </div>
        </div>

        <div className='col'>
          {/* <!-- select Limit --> */}
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>Type</span>
            </div>
            <select className='form-control' id='ordType' onChange={onChange} name='ordType'>
              {orderTypes.map(({ value }) => (
                <option key={`oType-${value}`} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='col'>
          <div className='input-group'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>Symbol</span>
            </div>
            <input readOnly onChange={onChange} type='text' name='symbol' className='form-control' id='symbol' value={symbol} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BaseForm;

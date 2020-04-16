import _ from 'lodash';
import React from 'react';

export const TakeProfit = () => {
  return (
    <>
      <div className='container-fluid'>
        <p>Calculated TakeProfit</p>
        <div className='row form-group'>
          <div className='col-8'>
            <pre>
              Leverage: 25
              Entry-Price: 5000
              ROE: 14%

              calculates
              Target-Price: 4020
              Profit-Loss: 0.54%
              ROE: 17%

              - multiple TakeProfit?
            </pre>
          </div>
        </div>
        <div className='row form-group'>
          {/* orderCount */}
          <div className='col-2'>
            <div className='input-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>count</span>
              </div>
              <input type='number' min={2} name='count' className='form-control' placeholder='count' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

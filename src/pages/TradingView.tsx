import React from 'react';
const TradingView = () => {
  const script = document.createElement('script');
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
  script.async = true;
  document.body.appendChild(script);

  //<script async src='https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js'></script>
  return (
    <>
      <div className='tradingview-widget-container__widget'></div>
    </>
  );
};

export default TradingView;

/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosRequestConfig } from 'axios';
import crypto from 'crypto';
import { ErrorResponse } from '../types/Error';
import { IOrder, IOrderResponse } from '../types/Order';

const apiKey = `${process.env.REACT_APP_BITMEX_API_KEY}`;
const apiSecret = `${process.env.REACT_APP_BITMEX_API_SECRET}`;
console.log({ apiKey, apiSecret });

const sampleOrder = {
  symbol: 'XBTUSD',
  orderQty: 1,
  price: 5160,
  ordType: 'Limit',
  side: 'Buy',
  text: 'from bet-calculator-form'
};
const sampleResponse = {
  orderID: '20820deb-1a70-bdf4-dd47-1c36da018b7b',
  clOrdID: '',
  clOrdLinkID: '',
  account: 145875,
  symbol: 'XBTUSD',
  side: 'Buy',
  simpleOrderQty: null,
  orderQty: 1,
  price: 5160,
  displayQty: null,
  stopPx: null,
  pegOffsetValue: null,
  pegPriceType: '',
  currency: 'USD',
  settlCurrency: 'XBt',
  ordType: 'Limit',
  timeInForce: 'GoodTillCancel',
  execInst: '',
  contingencyType: '',
  exDestination: 'XBME',
  ordStatus: 'Filled',
  triggered: '',
  workingIndicator: false,
  ordRejReason: '',
  simpleLeavesQty: null,
  leavesQty: 0,
  simpleCumQty: null,
  cumQty: 1,
  avgPx: 5153,
  multiLegReportingType: 'SingleSecurity',
  text: 'Submitted via API.',
  transactTime: '2020-03-15T03:55:17.971Z',
  timestamp: '2020-03-15T03:55:17.971Z'
};

export const postOrder = async (order: IOrder): Promise<ErrorResponse | IOrderResponse> => {
  // see this info: https://testnet.bitmex.com/api/explorer/#!/Order/Order_new
  const verb = 'POST';
  const path = '/api/v1/order';
  const expires = Math.round(new Date().getTime() / 1000) + 60; // 1 min in the future

  // Pre-compute the postBody so we can be sure that we're using *exactly* the same body in the request
  // and in the signature. If you don't do this, you might get differently-sorted keys and blow the signature.
  const postBody = JSON.stringify(order);

  const signature = crypto
    .createHmac('sha256', apiSecret)
    .update(verb + path + expires + postBody)
    .digest('hex');

  // prettier-ignore
  const headers = { // https://www.bitmex.com/app/apiKeysUsage for more details.
    'content-type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'api-expires': expires,
    'api-key': apiKey,
    'api-signature': signature,
    json: true
  };

  const requestOptions: AxiosRequestConfig = {
    headers: headers,
    url: 'http://localhost:3000' + path, //url: 'https://testnet.bitmex.com'+path,
    method: verb,
    data: postBody
  };

  try {
    const { data } = await axios.request(requestOptions);
    if (data.error) alert(data.error.message);
    return data;
  } catch (e) {
    console.log(e.message);
    alert(e.message);
    return e;
  }
};

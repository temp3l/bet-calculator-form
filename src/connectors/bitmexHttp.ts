import request from 'request';
import crypto from 'crypto';

const apiKey = process.env.BITMEX_API_KEY;
const apiSecret = process.env.BITMEX_API_SECRET;

const verb = 'POST',
  path = 'http://localhost:3000/api/v1/order',
  //path = '/bitmex/api/v1/order',
  expires = Math.round(new Date().getTime() / 1000) + 60, // 1 min in the future
  data = { symbol: 'XBTUSD', orderQty: 1, price: 590, ordType: 'Limit' };

// Pre-compute the postBody so we can be sure that we're using *exactly* the same body in the request
// and in the signature. If you don't do this, you might get differently-sorted keys and blow the signature.
const postBody = JSON.stringify(data);

const signature = crypto
  .createHmac('sha256', apiSecret)
  .update(verb + path + expires + postBody)
  .digest('hex');

const headers = {
  'content-type': 'application/json',
  Accept: 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
  // This example uses the 'expires' scheme. You can also use the 'nonce' scheme. See
  // https://www.bitmex.com/app/apiKeysUsage for more details.
  'api-expires': expires,
  'api-key': apiKey,
  'api-signature': signature
};

const requestOptions = {
  headers: headers,
  //url: 'https://testnet.bitmex.com' + path,
  url: path,
  method: verb,
  body: postBody
};

request(requestOptions, function(error, response, body) {
  if (error) {
    console.log(error);
  }
  console.log(body);
});

export default () => {};

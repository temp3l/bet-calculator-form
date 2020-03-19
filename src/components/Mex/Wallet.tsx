/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

export default ({ wallet, setWallet }: any) => {
  return (
    <>
      <pre>
        {JSON.stringify(
          {
            table: 'wallet',
            action: 'partial',
            keys: ['account', 'currency'],
            types: {
              account: 'long',
              currency: 'symbol',
              prevDeposited: 'long',
              prevWithdrawn: 'long',
              prevTransferIn: 'long',
              prevTransferOut: 'long',
              prevAmount: 'long',
              prevTimestamp: 'timestamp',
              deltaDeposited: 'long',
              deltaWithdrawn: 'long',
              deltaTransferIn: 'long',
              deltaTransferOut: 'long',
              deltaAmount: 'long',
              deposited: 'long',
              withdrawn: 'long',
              transferIn: 'long',
              transferOut: 'long',
              amount: 'long',
              pendingCredit: 'long',
              pendingDebit: 'long',
              confirmedDebit: 'long',
              timestamp: 'timestamp',
              addr: 'symbol',
              script: 'symbol',
              withdrawalLock: 'symbols'
            },
            foreignKeys: {},
            attributes: {
              account: 'sorted',
              currency: 'grouped'
            },
            filter: {
              account: 145875
            },
            data: [
              {
                account: 145875,
                currency: 'XBt',
                prevDeposited: 637730,
                prevWithdrawn: 0,
                prevTransferIn: 1000000,
                prevTransferOut: 0,
                prevAmount: 683232,
                prevTimestamp: '2020-03-18T12:00:00.043Z',
                deltaDeposited: 0,
                deltaWithdrawn: 0,
                deltaTransferIn: 0,
                deltaTransferOut: 0,
                deltaAmount: 0,
                deposited: 637730,
                withdrawn: 0,
                transferIn: 1000000,
                transferOut: 0,
                amount: 683232,
                pendingCredit: 0,
                pendingDebit: 0,
                confirmedDebit: 0,
                timestamp: '2020-03-18T12:00:00.602Z',
                addr: '2NBMEXHqAxZZTSrYzt8k78g2Yt6fQ2HARPy',
                script: '532102c10be2f0dc20f4285c25156aa22a0c46d2b89ccc4d1c8eaed92ea0c1a8f40c002102ceba29da1af96a0f2ef7cda6950b8be2baeb1adf12c0d5efebb70dbcaa086ba02103d5a42b90e9d7156155661979530a09d2e12e252ef4104e5611274a7ae7e2b0942103fefd3846d19d8f37e1c522c5027cf071d079280bfd6402e6eb2f9ddf6ceec3c154ae',
                withdrawalLock: []
              }
            ]
          },
          null,
          2
        )}
      </pre>
    </>
  );
};

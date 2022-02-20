import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { DAppProvider } from '@usedapp/core'

import MenuHeader from './components/MenuHeader'
import Overview from './components/Overview'

// TODO: Pull Request to @usedapp/core to add Aurora chain model (support Aurora network)

const AuroraTestnet = {
  chainId: 1313161555,
  chainName: 'Aurora Testnet',
  isTestChain: true,
  isLocalChain: false,
  getExplorerAddressLink: (address) => `https://explorer.testnet.testnet.dev/address/${address}`,
  getExplorerTransactionLink: (transactionHash) => `https://explorer.testnet.aurora.dev/tx/${transactionHash}`,
}


const config = {
  readOnlyChainId: AuroraTestnet.chainId,
  readOnlyUrls: {
    [AuroraTestnet.chainId]: 'https://testnet.aurora.dev/',
  },
  multicallVersion: 2,
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <MenuHeader />
      <Overview />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

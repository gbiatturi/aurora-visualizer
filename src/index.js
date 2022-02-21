import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom"

import './index.css';
import { DAppProvider } from '@usedapp/core'

import MenuHeader from './components/MenuHeader'
import Home from './components/Home'
import NftGallery from './components/NftGallery'
import Transaction from './components/Transaction'

// TODO: Pull Request to @usedapp/core to add Aurora chain model (support Aurora network)
const AuroraTestnet = {
  chainId: 1313161555,
  chainName: 'Aurora Testnet',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x755E730F28A31079711aB588e3568e70A40F3564',
  getExplorerAddressLink: (address) => `https://explorer.testnet.testnet.dev/address/${address}`,
  getExplorerTransactionLink: (transactionHash) => `https://explorer.testnet.aurora.dev/tx/${transactionHash}`,
}

const config = {
  readOnlyChainId: AuroraTestnet.chainId,
  readOnlyUrls: {
    [AuroraTestnet.chainId]: 'https://testnet.aurora.dev/',
  },
  networks: [AuroraTestnet]
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <BrowserRouter>
        <MenuHeader />
        <Routes>
          <Route
            path="/"
            exact
            element={<Home />}
          />

          <Route
            path="/gallery"
            exact
            element={<NftGallery />}
          />

          <Route
            path="/transaction"
            exact
            element={<Transaction />}
          />
        </Routes>

      </BrowserRouter>
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

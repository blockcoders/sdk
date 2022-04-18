# Harmony RPC Providers

This library provides a collection of methods to interact with the Harmony blockchain.

Currently under developement 🤓

## Install

```sh
npm i @harmony-js/providers
```

## Usage

### Node

```typescript
// JavaScript
const { HarmonyProvider } = require('@harmony-js/providers')

// TypeScript
import { HarmonyProvider } from '@harmony-js/providers'
```

## Harmony SDK

Expected Methods:
| Method | Description |
| ------------- | ------------- |
| getBlockNumber | Gets the last block number. |
| getBlock | Gets the block data by block number or block hash. |
| getTransaction | Gets the transaction data by transaction hash. |

### Initializing

```typescript
import { HarmonyProvider, HMY_TESTNET_NETWORK } from '@harmony-js/providers'

const provider = new HarmonyProvider(HMY_TESTNET_NETWORK) // Use HMY_NETWORK to interact with Harmony's mainnet
```

### Methods

#### getBlockNumber

Returns the last block number on the blockchain.

```ts
import { HarmonyProvider, HarmonyProviderMethods, HMY_TESTNET_NETWORK } from '@harmony-js/providers'

const provider = new HarmonyProvider(HMY_TESTNET_NETWORK)
const blockNumber = await provider.getBlockNumber()
// Executing the perform method 
const otherWayToGetBlockNumber = await provider.perform(HarmonyProviderMethods.getBlockNumber, {})
```
#### getBlockByTagOrHash

Returns the block data. The block can be searched by it's hash or number. It can retrieve the block transactions data or just the transactions hashes.

```ts
import { HarmonyProvider, HarmonyProviderMethods, HMY_TESTNET_NETWORK } from '@harmony-js/providers'

const provider = new HarmonyProvider(HMY_TESTNET_NETWORK)

// Searching with number

const searchByTag = {
    blockTag: "0x47db8e" // The block number can be and hexadecimal, number or "latest"
}
const block = await provider.getBlockByTagOrHash(searchByTag)
// The second parameter as 'true' here indicates that will retrieve transactions data
const blockWithTransactionsData = await provider.getBlockByTagOrHash(searchByTag, true)

// Searching with hash

const searchByHash = {
    blockHash: "0xd5258b03ae6b7d1ad8e932bf1aed6257241101e98be7ac6dab74013f267596de"
}
const sameBlock = await provider.getBlockByTagOrHash(searchByHash)
// The second parameter as 'true' here indicates that will retrieve transactions data
const sameBlockWithTransactionsData = await provider.getBlockByTagOrHash(searchByHash, true)

// Using perform
const params = {
    blockTag: "0x47db8e", // Change this property for blockHash if you want touse the hash to search the block
    includeTransactions: true // This will indicate the method whether or not to get the transactions data
}
const someBlock = await provider.perform(HarmonyProviderMethods.getBlock, params)
```
#### getTransaction

Returns the transaction data by hash.

```ts
import { HarmonyProvider, HarmonyProviderMethods, HMY_TESTNET_NETWORK } from '@harmony-js/providers'

const provider = new HarmonyProvider(HMY_TESTNET_NETWORK)

const txHash = "0x371ec289c5973c16d58cf600f8f2ce040fe8b429a6007976040d55a1759b8993"
const transaction = await provider.getTransaction(txHash)

// Executing the perform method 
const params = {
    transactionHash: "0x371ec289c5973c16d58cf600f8f2ce040fe8b429a6007976040d55a1759b8993"
}
const otherWayToGetBlockNumber = await provider.perform(HarmonyProviderMethods.getTransaction, params)
```

## Change Log

See [Changelog](CHANGELOG.md) for more information.

## Contributing

Contributions welcome! See [Contributing](CONTRIBUTING.md).

## Collaborators

- [**Jose Ramirez**](https://github.com/0xslipk)
- [**Brian Zuker**](https://github.com/bzuker)
- [**Fernando Sirni**](https://github.com/fersirni)

## Acknowledgements

This project was kindly sponsored by [Harmony](https://www.harmony.one/).

## License

Licensed under the MIT - see the [LICENSE](LICENSE) file for details.



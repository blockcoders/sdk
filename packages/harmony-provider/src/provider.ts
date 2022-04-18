import { JsonRpcProvider, Network, Networkish, TransactionResponse } from '@ethersproject/providers'
import { getNetwork } from './network'

const HARMONY_MAINNET_URL = 'https://api.harmony.one'
const HARMONY_TESTNET_URL = 'https://api.s0.b.hmny.io'

export enum HarmonyProviderMethods {
  getBlockNumber = 'getBlockNumber',
  getBlock = 'getBlock',
  getTransaction = 'getTransaction',
}

interface blockParams {
  blockTag?: string | number
  blockHash?: string
}

export class HarmonyProvider extends JsonRpcProvider {
  constructor(_network?: Networkish) {
    const network = getNetwork(_network)
    const baseUrl = HarmonyProvider.getBaseUrl(network)

    super(baseUrl, network)
    this._nextId = 1
  }

  async perform(method: string, params: Record<string, any>): Promise<any> {
    switch (method) {
      case HarmonyProviderMethods.getBlock:
        return this.getBlockByTagOrHash(params, params.includeTransactions)
      case HarmonyProviderMethods.getBlockNumber:
        return this.getBlockNumber()
      case HarmonyProviderMethods.getTransaction:
        return this.getTransaction(params.transactionHash)
      default:
        return super.perform(method, params)
    }
  }

  async getTransaction(hash: string): Promise<TransactionResponse> {
    return this.send('hmy_getTransactionByHash', [hash])
  }

  async getBlockByTagOrHash(params: blockParams, includeTransactions = false): Promise<any> {
    if (params.blockTag) {
      return this.send('hmy_getBlockByNumber', [params.blockTag, includeTransactions])
    } else if (params.blockHash) {
      return this.send('hmy_getBlockByHash', [params.blockHash, includeTransactions])
    } else {
      throw Error(`Invalid parameters: ${params}`)
    }
  }

  async getBlockNumber(): Promise<number> {
    const hexBlockNumber = await this.send('hmy_blockNumber', [])
    if (!hexBlockNumber) {
      throw Error('Error while getting the block number')
    }
    return parseInt(hexBlockNumber, 16)
  }

  static getBaseUrl(network?: Network | null): string {
    switch (network ? network.name : 'invalid') {
      case 'harmony':
        return HARMONY_MAINNET_URL
      case 'harmonytestnet':
        return HARMONY_TESTNET_URL
    }

    throw Error(`unsupported network, ${network}`)
  }

  getNextId(): number {
    this._nextId += 1
    return this._nextId
  }
}

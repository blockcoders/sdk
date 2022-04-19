import { Block, BlockWithTransactions } from '@ethersproject/abstract-provider'
import { BlockTag, JsonRpcProvider, Network, Networkish, TransactionResponse } from '@ethersproject/providers'
import { getNetwork } from './network'

const HARMONY_MAINNET_URL = 'https://api.harmony.one'
const HARMONY_TESTNET_URL = 'https://api.s0.b.hmny.io'

export enum HarmonyProviderMethods {
  getBlockNumber = 'getBlockNumber',
  getBlock = 'getBlock',
  getTransaction = 'getTransaction',
}

export function isHexString(value: any, length?: number): boolean {
  if (typeof value !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false
  }
  if (length && value.length !== 2 + 2 * length) {
    return false
  }
  return true
}

export class HarmonyProvider extends JsonRpcProvider {
  constructor(_network?: Networkish) {
    const network = getNetwork(_network)
    const baseUrl = HarmonyProvider.getBaseUrl(network)

    super(baseUrl, network)
    this._nextId = 1
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

  async getBlock(blockHashOrBlockTag: BlockTag): Promise<Block> {
    if (isHexString(blockHashOrBlockTag, 32)) {
      return this.send('hmy_getBlockByHash', [blockHashOrBlockTag, false])
    }
    return this.send('hmy_getBlockByNumber', [blockHashOrBlockTag, false])
  }

  async getBlockWithTransactions(blockHashOrBlockTag: BlockTag): Promise<BlockWithTransactions> {
    if (isHexString(blockHashOrBlockTag, 32)) {
      return this.send('hmy_getBlockByHash', [blockHashOrBlockTag, true])
    }
    return this.send('hmy_getBlockByNumber', [blockHashOrBlockTag, true])
  }

  async getBlockNumber(): Promise<number> {
    const hexBlockNumber = await this.send('hmy_blockNumber', [])
    if (!hexBlockNumber) {
      throw Error('Error while getting the block number')
    }
    return parseInt(hexBlockNumber, 16)
  }

  async getTransaction(hash: string): Promise<TransactionResponse> {
    return this.send('hmy_getTransactionByHash', [hash])
  }

  async perform(method: string, params: Record<string, any>): Promise<any> {
    switch (method) {
      case HarmonyProviderMethods.getBlock:
        const { includeTransactions = false, blockTag, blockHash } = params || {}
        const blockHashOrTag = blockHash || blockTag
        return includeTransactions ? this.getBlockWithTransactions(blockHashOrTag) : this.getBlock(blockHashOrTag)
      case HarmonyProviderMethods.getBlockNumber:
        return this.getBlockNumber()
      case HarmonyProviderMethods.getTransaction:
        return this.getTransaction(params.transactionHash)
      default:
        return super.perform(method, params)
    }
  }
}

import { fail } from 'assert'
import { expect } from 'chai'
import { HMY_TESTNET_NETWORK } from './network'
import { HarmonyProvider, HarmonyProviderMethods } from './provider'

const BLOCK_NUMBER_HEX = '0x47db8e'
const BLOCK_NUMBER = parseInt(BLOCK_NUMBER_HEX, 16)
const BLOCK_HASH = '0xd5258b03ae6b7d1ad8e932bf1aed6257241101e98be7ac6dab74013f267596de'
const TX_HASH = '0x371ec289c5973c16d58cf600f8f2ce040fe8b429a6007976040d55a1759b8993'

describe('Harmony Provider Tests', () => {
  let provider: HarmonyProvider

  before(() => {
    provider = new HarmonyProvider(HMY_TESTNET_NETWORK)
  })

  it('has to exists', () => {
    expect(provider).to.not.be.undefined
  })

  describe('Get block number', () => {
    it('gets the block number', async () => {
      const response = await provider.getBlockNumber()
      expect(response).to.be.a('number')
    })
  })

  describe('Get block by hash or number(int or hex)', () => {
    it('fails if there are no valid params', async () => {
      try {
        await provider.getBlock('')
        fail('Should fail while trying to getBlockByNumber with invalid parameters')
      } catch (error) {
        expect(error).to.not.be.undefined
      }
    })

    it("get the last block using the 'latest' value", async () => {
      const response = await provider.getBlock('latest')
      expect(response).to.not.be.null
      expect(response).to.haveOwnProperty('number')
      expect(response).to.haveOwnProperty('hash')
      expect(response).to.haveOwnProperty('parentHash')
      expect(response).to.haveOwnProperty('nonce')
      expect(response).to.haveOwnProperty('mixHash')
      expect(response).to.haveOwnProperty('logsBloom')
      expect(response).to.haveOwnProperty('stateRoot')
      expect(response).to.haveOwnProperty('miner')
      expect(response).to.haveOwnProperty('difficulty')
      expect(response).to.haveOwnProperty('extraData')
      expect(response).to.haveOwnProperty('size')
      expect(response).to.haveOwnProperty('gasLimit')
      expect(response).to.haveOwnProperty('gasUsed')
      expect(response).to.haveOwnProperty('vrf')
      expect(response).to.haveOwnProperty('vrfProof')
      expect(response).to.haveOwnProperty('timestamp')
      expect(response).to.haveOwnProperty('transactionsRoot')
      expect(response).to.haveOwnProperty('receiptsRoot')
      expect(response).to.haveOwnProperty('uncles')
      expect(response).to.haveOwnProperty('transactions')
      expect(response).to.haveOwnProperty('transactionsInEthHash')
      expect(response).to.haveOwnProperty('stakingTransactions')
    })

    it('fails when the blockTag property is invalid', async () => {
      try {
        await provider.getBlock('invalid')
        fail('Should fail while trying to getBlock with an invalid value')
      } catch (error) {
        expect(error).to.not.be.undefined
      }
    })

    it('gets the block by hex number', async () => {
      const response = await provider.getBlock(BLOCK_NUMBER_HEX)
      expect(response).to.not.be.null
      expect(response.number).to.equal(BLOCK_NUMBER_HEX)
      expect(response.transactions[0]).to.equal(TX_HASH)
    })

    it('gets the block by number', async () => {
      const response = await provider.getBlock(BLOCK_NUMBER)
      expect(response).to.not.be.null
      expect(response.number).to.equal(BLOCK_NUMBER_HEX)
      expect(response.transactions[0]).to.equal(TX_HASH)
    })

    it('gets the block by hash', async () => {
      const response = await provider.getBlock(BLOCK_HASH)
      expect(response).to.not.be.null
      expect(response.number).to.equal(BLOCK_NUMBER_HEX)
      expect(response.transactions[0]).to.equal(TX_HASH)
    })

    it('gets the block with txs by hex number', async () => {
      const response = await provider.getBlockWithTransactions(BLOCK_NUMBER_HEX)
      expect(response).to.not.be.null
      expect(response.number).to.equal(BLOCK_NUMBER_HEX)
      expect(response.transactions[0]).to.haveOwnProperty('hash')
      expect(response.transactions[0].hash).to.equal(TX_HASH)
    })

    it('gets the block with txs by number', async () => {
      const response = await provider.getBlockWithTransactions(BLOCK_NUMBER)
      expect(response).to.not.be.null
      expect(response.number).to.equal(BLOCK_NUMBER_HEX)
      expect(response.transactions[0]).to.haveOwnProperty('hash')
      expect(response.transactions[0].hash).to.equal(TX_HASH)
    })

    it('gets the block with txs by hash', async () => {
      const response = await await provider.getBlockWithTransactions(BLOCK_HASH)
      expect(response).to.not.be.null
      expect(response.hash).to.equal(BLOCK_HASH)
      expect(response.transactions[0]).to.haveOwnProperty('hash')
      expect(response.transactions[0].hash).to.equal(TX_HASH)
    })
  })

  describe('Get transaction', () => {
    it('gets the transaction by hash', async () => {
      const response = await provider.getTransaction(TX_HASH)
      expect(response).to.not.be.undefined
      expect(response).to.haveOwnProperty('hash')
      expect(response.hash).to.equal(TX_HASH)
    })

    it('fails when the txHash property is invalid', async () => {
      try {
        await provider.getTransaction('invalid')
        fail('Should fail while trying to get the transaction with an invalid hash')
      } catch (error) {
        expect(error).to.not.be.undefined
      }
    })
  })

  describe('Get block number, block and transaction from perform', () => {
    it('gets the transaction by hash', async () => {
      const params = { transactionHash: TX_HASH }
      const response = await provider.perform(HarmonyProviderMethods.getTransaction, params)
      expect(response).to.not.be.undefined
      expect(response).to.haveOwnProperty('hash')
      expect(response.hash).to.equal(TX_HASH)
    })

    it('gets the block by hash', async () => {
      const params = { blockHash: BLOCK_HASH, includeTransactions: true }
      const response = await provider.perform(HarmonyProviderMethods.getBlock, params)
      expect(response).to.not.be.undefined
      expect(response).to.haveOwnProperty('hash')
      expect(response).to.haveOwnProperty('transactions')
      expect(response.hash).to.equal(BLOCK_HASH)
    })

    it('gets the block by number', async () => {
      const params = { blockTag: BLOCK_NUMBER, includeTransactions: false }
      const response = await provider.perform(HarmonyProviderMethods.getBlock, params)
      expect(response).to.not.be.undefined
      expect(response).to.haveOwnProperty('hash')
      expect(response).to.haveOwnProperty('transactions')
      expect(response.number).to.equal(BLOCK_NUMBER_HEX)
    })

    it('gets the block number', async () => {
      const response = await provider.perform(HarmonyProviderMethods.getBlockNumber, [])
      expect(response).to.be.a('number')
    })
  })
})

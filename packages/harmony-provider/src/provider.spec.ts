import { fail } from "assert"
import { HarmonyProvider } from "./provider"
import { HMY_TESTNET_NETWORK } from "./network"


const BLOCK_NUMBER = 'latest'
const BLOCK_HASH = '0xd5258b03ae6b7d1ad8e932bf1aed6257241101e98be7ac6dab74013f267596de'
const TX_HASH = '0x371ec289c5973c16d58cf600f8f2ce040fe8b429a6007976040d55a1759b8993'

describe("Harmony Provider Tests", () => {
  let provider: HarmonyProvider
  before(() => {
    provider = new HarmonyProvider(HMY_TESTNET_NETWORK)
  })

  it("has to exists", () => {
    if (!provider) {
      fail("Provider must not be undefined")
    }
  })

  it("gets the block number", async () => {
    const response = await provider.perform("getBlockNumber", [])
    console.log("TEST",response)
  })

  it("gets the block with txs by number", async () => {
    const params = {
      blockTag: BLOCK_NUMBER,
      includeTransactions: true
    }
    const response = await provider.perform("getBlock", params)
    console.log(response)
  })

  it("gets the block without txs by number", async () => {
    const params = {
      blockTag: BLOCK_NUMBER,
      includeTransactions: false
    }
    const response = await provider.perform("getBlock", params)
    console.log(response)
  })

  it("gets the block with txs by hash", async () => {
    const params = {
      blockHash: BLOCK_HASH,
      includeTransactions: true
    }
    const response = await provider.perform("getBlock", params)
    console.log(response)
  })

  it("gets the block without txs by hash", async () => {
    const params = {
      blockHash: BLOCK_HASH,
      includeTransactions: false
    }
    const response = await provider.perform("getBlock", params)
    console.log(response)
  })

  it("gets the transaction by hash", async () => {
    const params = {
      transactionHash: TX_HASH
    }
    const response = await provider.perform("getTransaction", params)
    console.log(response)
  })
})
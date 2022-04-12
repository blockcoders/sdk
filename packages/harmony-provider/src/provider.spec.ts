import { fail } from "assert"
import { HarmonyProvider } from "./provider"
import { HMY_TESTNET_NETWORK } from "./network"


const BLOCK_NUMBER = 'latest'
const BLOCK_HASH = '0xcad69f28d810ef5b36acbf8b630246dcba09d53272054626430071602ceb8dca'
const TX_HASH = '0xd49180590f4e6f831a5ba80dc970e22b3932f824b5e93c404745b8f091ee9168'

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
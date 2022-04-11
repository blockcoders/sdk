import { JsonRpcProvider } from "@ethersproject/providers"
import { fail } from "assert"
import { HarmonyProvider } from "./provider"
import { HMY_TESTNET_NETWORK } from "./network"


describe("Harmony Provider Tests", () => {
  let provider: JsonRpcProvider
  before(() => {
    provider = new HarmonyProvider(HMY_TESTNET_NETWORK)
  })

  it("has to exists", () => {
    if (!provider) {
      fail("Provider must not be undefined")
    }
  })

  it("gets the block by block number", async () => {
    const response = await provider.perform("getBlockNumber", ["latest", true])
    console.log("TEST",response)
  })
})
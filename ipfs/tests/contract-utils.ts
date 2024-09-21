import { newMockEvent } from "matchstick-as"
import { ethereum } from "@graphprotocol/graph-ts"
import { newCID } from "../generated/Contract/Contract"

export function createnewCIDEvent(_cid: string): newCID {
  let newCidEvent = changetype<newCID>(newMockEvent())

  newCidEvent.parameters = new Array()

  newCidEvent.parameters.push(
    new ethereum.EventParam("_cid", ethereum.Value.fromString(_cid))
  )

  return newCidEvent
}

import { newCID as newCIDEvent } from "../generated/Contract/Contract"
import { newCID } from "../generated/schema"

export function handlenewCID(event: newCIDEvent): void {
  let entity = new newCID(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._cid = event.params._cid

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function func1(): {
  
}
import { newCID as NewCIDEvent } from "../generated/Contract/Contract";
import { NewCID, UserInterest, GlobalInterest } from "../generated/schema";
import {
	DataSourceContext,
	DataSourceTemplate,
	json,
	Bytes,
	JSONValue,
} from "@graphprotocol/graph-ts";

const POST_ID_KEY = "postID";

export function handlenewCID(event: NewCIDEvent): void {
	let entity = new NewCID(
		event.transaction.hash.concatI32(event.logIndex.toI32())
	);
	entity._cid = event.params._cid;
	entity.blockNumber = event.block.number;
	entity.blockTimestamp = event.block.timestamp;
	entity.transactionHash = event.transaction.hash;

	entity.save();

	let context = new DataSourceContext();
	context.setBytes(POST_ID_KEY, entity.id);
	context.setString("userId", event.transaction.from.toHexString());
	context.setString("timestamp", event.block.timestamp.toString());

	let hash = entity._cid;
	DataSourceTemplate.createWithContext("IpfsContent", [hash], context);
}

export function handlePostContent(content: Bytes): void {
	let data = json.fromBytes(content).toObject();
	if (data === null) {
		return;
	}

	let userId = data.get("userId");
	let timestamp = data.get("timestamp");
	let interests = data.get("interests");

	if (
		userId === null ||
		timestamp === null ||
		interests === null
	) {
		return;
	}

  //user interest
	let userIdString = userId.toString();
	let timestampString = timestamp.toString();
	let interestsArray = interests.toArray();

	let userInterest = UserInterest.load(userIdString);
	if (userInterest == null) {
		userInterest = new UserInterest(userIdString);
		userInterest.interests = [];
	}
	userInterest.lastUpdateTimestamp = timestampString;
	userInterest.interests = interestsArray.map<string>((interest: JSONValue) =>
		interest.toString()
	);
	userInterest.save();

  //global interest
	for (let i = 0; i < interestsArray.length; i++) {
		let interest = interestsArray[i].toString();
		let globalInterest = GlobalInterest.load(interest);
		if (globalInterest == null) {
			globalInterest = new GlobalInterest(interest);
			globalInterest.count = 0;
			globalInterest.users = [];
		}
		if (!globalInterest.users.includes(userIdString)) {
			globalInterest.users.push(userIdString);
			globalInterest.count += 1;
		}
		globalInterest.save();
	}
}
import { readConfig } from "../config";
import { getUser } from "../lib/db/queries/users";
import { getFeedByUrl } from "../lib/db/queries/feeds";
import {
  createFeedFollow,
  getFeedFollowsForUser,
} from "../lib/db/queries/feed-follows";

export async function handlerFollow(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`usage: ${cmdName} <url>`);
  }

  const url = args[0];

  const config = readConfig();
  const user = await getUser(config.currentUserName);
  if (!user) {
    throw new Error(`User ${config.currentUserName} not found`);
  }

  const feed = await getFeedByUrl(url);
  if (!feed) {
    throw new Error(`Feed with URL "${url}" not found`);
  }

  const result = await createFeedFollow(user.id, feed.id);
  console.log(`${result.userName} is now following "${result.feedName}"`);
}

export async function handlerFollowing(cmdName: string, ...args: string[]) {
  const config = readConfig();
  const user = await getUser(config.currentUserName);
  if (!user) {
    throw new Error(`User ${config.currentUserName} not found`);
  }

  const follows = await getFeedFollowsForUser(user.id);
  if (follows.length === 0) {
    console.log("Not following any feeds.");
    return;
  }

  for (const follow of follows) {
    console.log(`* ${follow.feedName}`);
  }
}


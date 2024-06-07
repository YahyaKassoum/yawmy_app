'use server';

import { currentUser } from '@clerk/nextjs/server';
import { StreamClient } from '@stream-io/node-sdk';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  const user = await currentUser(); 
  if (!user) throw new Error('User is not authenticated');
  if (!apiKey) throw new Error('Stream API key secret is missing');
  if (!apiSecret) throw new Error('Stream API secret is missing');

  const streamClient = new StreamClient(apiKey, apiSecret);

  const expirationTime = Math.floor(Date.now() / 1000) + 3600;
  const issuedAt = Math.floor(Date.now() / 1000) - 60;
 
  const token = streamClient.createToken(user.id, expirationTime, issuedAt);


  return token ;
};
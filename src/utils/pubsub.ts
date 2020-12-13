import { RedisPubSub } from 'graphql-redis-subscriptions';

export const createPubSub = () => new RedisPubSub();
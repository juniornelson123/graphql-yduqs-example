import { IResolvers } from '@graphql-tools/utils';
import Message from '../models/Message';

const resolvers: IResolvers = {
    Query: {
        messages: async () => {
            return await Message.find()
        }
    },
    Mutation: {
        postMessage: async (_, { user, content }, {pubsub}) => {
            const message = new Message({user: user, content: content})
            await message.save()
            pubsub.publish("MESSAGE_ADDED", { messageAdded: message })

            return message
        }
    },
    Subscription: {
        messageAdded: {
            subscribe: (_, __, { pubsub }) => {
                if (!pubsub) {
                    throw new Error('PubSub is not initialized');
                }

                return pubsub.asyncIterator('MESSAGE_ADDED')
            }
        }
    }
};

export default resolvers;

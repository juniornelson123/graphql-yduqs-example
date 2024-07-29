import { IResolvers } from '@graphql-tools/utils';
import Message from '../models/Message';
import User from '../models/User';

const resolvers: IResolvers = {
    Query: {
        messages: async () => await Message.find(),
        users: async () => await User.find(),
    },
    Mutation: {
        postMessage: async (_, { user, content }, { pubsub }) => {
            const message = new Message({ user, content });
            pubsub.publish('MESSAGE_ADDED', { messageAdded: message });
            await message.save();
            return message.id;
        },
        addUser: async (_, { username }) => {
            const verifyUser = await User.findOne({ username: username })
            if(verifyUser){
                return verifyUser
            }
            const user = new User({ username });
            await user.save();
            return user;
        },
    },
    Subscription: {
        messageAdded: {
            subscribe: (_, __, { pubsub }) => {
                if (!pubsub) {
                    throw new Error('PubSub is not initialized');
                }

                return pubsub.asyncIterator('MESSAGE_ADDED')
            }
        },
    },
};

export default resolvers;

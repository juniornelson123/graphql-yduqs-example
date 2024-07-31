import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import http from 'http';
import mongoose, { ConnectOptions } from 'mongoose';
import typeDefs from './schema';
import { execute, subscribe } from 'graphql';
import resolvers from './resolvers';
import { PubSub } from 'graphql-subscriptions';
import { SubscriptionServer } from 'subscriptions-transport-ws';

const app = express() as any;

const pubsub = new PubSub();

mongoose.connect("mongodb+srv://junior123nelson:glylWqACgyBBlUrN@cluster0.3ju5ces.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
    schema,
    context: () => ({ pubsub }),
});

server.start().then(() => {
    server.applyMiddleware({ app });

    const httpServer = http.createServer(app);
    new SubscriptionServer(
        {
            execute,
            subscribe,
            schema,
            onConnect: () => ({ pubsub }),
        },
        {
            server: httpServer,
            path: server.graphqlPath,
        }
    );

    httpServer.listen(4000, () =>
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
    );
});
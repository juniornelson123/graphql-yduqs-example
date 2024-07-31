import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type Message {
        id: ID!
        user: String!
        content: String!
    }

    type Query {
        messages: [Message!]
    }

    type Mutation {
        postMessage(user: String!, content: String!): Message!
    }

    type Subscription {
        messageAdded: Message!
    }
`;

export default typeDefs;

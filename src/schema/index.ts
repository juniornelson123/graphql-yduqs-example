import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type Message {
        id: ID!
        content: String!
        user: String!
    }

    type User {
        id: ID!
        username: String!
    }

    type Query {
        messages: [Message!]
        users: [User!]
    }

    type Mutation {
        postMessage(user: String!, content: String!): ID!
        addUser(username: String!): User
    }
    type Subscription {
        messageAdded: Message
    }
`;

export default typeDefs;

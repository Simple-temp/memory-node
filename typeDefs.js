import { gql } from 'apollo-server-express';

const typeDefs = gql`

    type Query {
        getmemory : [GetMemory!]!
    }

    type GetMemory {
        _id : ID!
        name : String!
        file : String! 
    }

    scalar Upload

    type Mutation {
        createMemory (file: Upload, name: String) : GetMemory
    }



`

export default typeDefs
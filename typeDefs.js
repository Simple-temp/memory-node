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

    type Mutation {
        createMemory ( input : InputData! ) : GetMemory!
    }

    scalar Upload

    input InputData{
        name : String!
        file : String!
    }

`

export default typeDefs
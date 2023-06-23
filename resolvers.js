import Memory from "./MemoryModel/MemoryModel.js";

const resolvers = {

    Query : {
        getmemory : async () => Memory.find({}),
    },

    Mutation : {
        createMemory : async (_,{input}) => {
            console.log(input)
        }
    }
    
}

export default resolvers
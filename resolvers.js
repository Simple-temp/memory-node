import Memory from "./MemoryModel/MemoryModel.js";
import { createWriteStream } from 'fs';
import { GraphQLUpload } from 'graphql-upload';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const resolvers = {
    Upload: GraphQLUpload,
    Query: {
        getmemory: async () => Memory.find({}),
    },

    Mutation: {
        createMemory: async (_, { file, name }) => {

            const { createReadStream, filename } = await file;

            const stream = createReadStream();
            const path = join(__dirname, 'uploads', `${Date.now()}-${filename}`);
            const NewPath = `${Date.now()}-${filename}`

            const uploadPromise = new Promise((resolve, reject) => {
                const writeStream = createWriteStream(path);
                stream.on('error', (error) => reject(error));
                writeStream.on('finish', () => resolve());
                writeStream.on('error', (error) => reject(error));
                stream.pipe(writeStream);
            });

            await uploadPromise;

            const fileUrl = `http://localhost:4000/uploads/${NewPath}`;

            const newItem = new Memory({ name, file: fileUrl });

            console.log(newItem)

            await newItem.save();

            return newItem;

        }
    }

}

export default resolvers

























































































































            // console.log(file, name)

            // const { createReadStream, mimetype, filename, encoding } = await file;

            // const stream = createReadStream();

            // const path = `uploads/${Date.now()}-${filename}`;

            // const Newfile = `${Date.now()}-${filename}`

            // await new Promise((resolve, reject) =>
            //     stream
            //         .pipe(createWriteStream(path))
            //         .on('finish', resolve)
            //         .on('error', reject)
            // );

            // const fileObj = await Memory.create({ name, file: Newfile });

            // await fileObj.save();

            // return fileObj;
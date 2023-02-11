import mongoose from "mongoose";
let db = mongoose.connection;
import mongoClient from "mongodb";
const { ObjectId } = mongoClient;

const initDatabase = (database = "entities") => {
	db.close();
	mongoose.set("strictQuery", true);
	mongoose
		.connect(
			`${process.env.MONGO_URL}${database}?retryWrites=true&w=majority`,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		)
		.then((response) => {
			console.log(`Connected to MongoDb: ${database}`);
		})
		.catch((err) => {
			console.log("Mongodb is not connected: ", err);
		});
};

// const connectToDatabase = async (database = "entities") => {
// 	try {
// 		db.close();
// 		mongoose.set("strictQuery", true);
// 		await mongoose.connect(
// 			`${process.env.MONGO_URL}${database}?retryWrites=true&w=majority`,
// 			{
// 				useNewUrlParser: true,
// 				useUnifiedTopology: true,
// 			}
// 		);
// 		console.log(`Connected to MongoDb: ${database}`);
// 	} catch (error) {
// 		console.log("Mongodb is not connected: ", error);
// 	}
// };

const connectToDatabase = async (database = "entities") => {
	const conn = await mongoose
		.createConnection(`${process.env.MONGO_URL}${database}`)
		.asPromise();

	db = conn.useDb(database);
};

export { db, ObjectId, connectToDatabase, initDatabase };

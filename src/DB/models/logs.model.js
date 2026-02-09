import { db } from "../connection.js";
const logCollection = db.collection("logs");
export default logCollection;
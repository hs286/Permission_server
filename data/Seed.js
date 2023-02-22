import fake from "../model/SeedModel.js";
import mongoose from "mongoose";
import Product from '../model/SeedModel.js'
import dotenv from 'dotenv';


dotenv.config();
const userName=process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;


async function seedData() {
    // Connection URL
    const uri = `mongodb+srv://${userName}:${password}@nodedb.8olmda4.mongodb.net/?retryWrites=true&w=majority`;
    const seed_count = 2;
    mongoose.set("strictQuery", false);
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to db")
    }).catch((err) => {
        console.log("error", err)
    })

    let timeSeriesData = [];
    // create 5000 fake data
    for (let i = 0; i < seed_count; i++) {
        const name = fake.name;
        timeSeriesData.push({ name });
    }
    
    const seedDB = async () => {
        await Product.insertMany(timeSeriesData)
    }

    seedDB().then(() => {
        mongoose.connection.close()
        console.log("seed success")
    })
}

seedData()
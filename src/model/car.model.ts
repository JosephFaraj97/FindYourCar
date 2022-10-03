import mongoose from "mongoose";

export const carSchema = new mongoose.Schema({
    category: {type: String, index: true},
    tag: {type: Array, index: true},
    image: Array,
    description: String,
    name: String,
    lastUserId: String,
    status: String,
    longitude: String,
    latitude: String,
    id: { type: String, unique: true },
    createdDate: String,
});


export const categorySchema = new mongoose.Schema({
    id: String,
    name: { type: String, unique: true}
});

export const tagSchema = new mongoose.Schema({
    id: String,
    name: { type: String, unique: true}
});

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: {
        type: Array,
        required: true
    }
});

export const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

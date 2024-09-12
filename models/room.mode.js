import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomCode: {
        type: String,
        unique: true,
        required: true,
    }
});

const Room = mongoose.model("Room", roomSchema);
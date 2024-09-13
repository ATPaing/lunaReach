import Room from '../models/room.model.js';

export const createRoomController = async (req, res) => {

    const { name, roomCode } = req.body;

    const existingRoom = await Room.findOne({
        roomCode
    });

    console.log(existingRoom);

    if(existingRoom) {
        return res.status(409).json({ message: "Room code already exists" });
    } else {
        const room = new Room({
            name,
            roomCode
        });
        try {
            const savedRoom = await room.save();

            res.cookie('host', 'true', {
                httpOnly: true,
                sameSite: 'Strict',
            });

            res.cookie('roomCode', roomCode, {
                httpOnly: true,
                sameSite: 'Strict',
            })

            res.status(201).json(savedRoom);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

};
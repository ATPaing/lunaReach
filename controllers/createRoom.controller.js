import Room from '../models/room.model.js';

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
            console.log(savedRoom)
            res.cookie('host', 'true', {
                httpOnly: true,
                sameSite: 'Strict',
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            });

            res.cookie('roomCode', roomCode, {
                httpOnly: true,
                sameSite: 'Strict',
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            })
            console.log('redirection to /room/built?rc=', roomCode)
            return res.status(200).json(savedRoom);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

};

export const hostCreatedRoomController = async (req, res) => {
    const roomCode = req.query.rc;
    console.log(roomCode)
    const room = await Room.findOne({ roomCode });
    if (room) {
        console.log('gg')
        res.sendFile(path.join(__dirname, "../public/pages/createRoom.html"));
    } else {
        return res.status(404).send(`
                <html>
                    <head><title>Room Not Found</title></head>
                    <body>
                        <script>
                            alert('The room does not exist.');
                            window.location.href = '/';
                        </script>
                    </body>
                </html>
            `);
    }
};
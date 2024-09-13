import Room from '../../models/room.mode.js';




export async function checkRoomCode(roomCode) {
    try {
        const room = await Room.findOne({ classCode })
        
        if (room) {
            console.log('Class code already exists');
            return false;
        }
        console.log('Class code does not exist');
        return true;
    } catch (err) {
        console.error(err);
    }
}

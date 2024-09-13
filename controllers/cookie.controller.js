

export const checkCookieController = (req, res) => {
    const { host, roomCode } = req.cookies;
    if(host && roomCode) {
        res.status(200).json({ message: "Cookie found", host, roomCode });
    } else {
        res.status(404).json({ message: "No cookie found" });
    }
};
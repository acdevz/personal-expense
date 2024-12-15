export const healthCheck = async (req, res) => {
    try {
        res.status(200).json({ message: "ok" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
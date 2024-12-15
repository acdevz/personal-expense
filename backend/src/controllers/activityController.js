const {Activity} = require('../models');

const createActivity = async (req, res) => {
    try {
        const { type, message, userId, transactionId, date } = req.body;

        if (!type || !message || !userId) {
            return res.status(400).json({ message: 'Required fields are missing.' });
        }

        const activity = await Activity.create({
            type,
            message,
            userId,
            transactionId,
            date: date || new Date(),
        });

        return res.status(201).json({ message: 'Activity created successfully', activity });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getActivitiesByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const activities = await Activity.findAll({
            where: { userId },
            include: [
                { model: Transaction, as: 'transaction' },
            ],
            order: [['createdAt', 'DESC']],
        });

        return res.status(200).json({
            message: `Activities for user ${userId} retrieved successfully`,
            activities,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const markActivityAsRead = async (req, res) => {
    try {
        const { id } = req.params;

        const activity = await Activity.findByPk(id);
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found.' });
        }

        activity.isRead = true;
        await activity.save();

        return res.status(200).json({ message: 'Activity marked as read.', activity });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createActivity,
    getActivitiesByUser,
    markActivityAsRead,
};

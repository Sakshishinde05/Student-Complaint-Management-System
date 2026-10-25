const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const { protect, admin } = require('../middleware/auth');

// Get all complaints (Admin: all, Student: own)
router.get('/', protect, async (req, res) => {
    try {
        let complaints;
        if (req.user.role === 'admin') {
            complaints = await Complaint.find().populate('student', 'name email studentId');
        } else {
            complaints = await Complaint.find({ student: req.user._id });
        }
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a complaint (Student only)
router.post('/', protect, async (req, res) => {
    const { title, description, category, priority } = req.body;

    if (!title || !description || !category || !priority) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    try {
        const complaint = new Complaint({
            title,
            description,
            category,
            priority,
            student: req.user._id,
        });

        const createdComplaint = await complaint.save();
        res.status(201).json(createdComplaint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update complaint status (Admin only)
router.put('/:id/status', protect, admin, async (req, res) => {
    const { status, adminRemark } = req.body;

    try {
        const complaint = await Complaint.findById(req.params.id);

        if (complaint) {
            complaint.status = status || complaint.status;
            complaint.adminRemark = adminRemark || complaint.adminRemark;

            const updatedComplaint = await complaint.save();
            res.json(updatedComplaint);
        } else {
            res.status(404).json({ message: 'Complaint not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

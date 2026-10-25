const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
        type: String,
        required: true,
        enum: ['Hostel', 'Academics', 'Transport', 'Fees', 'Other']
    },
    priority: {
        type: String,
        required: true,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low'
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'In Progress', 'Resolved']
    },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    adminRemark: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);

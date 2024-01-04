const mongoose = require('mongoose');
const { Schema } = mongoose;

const channelSchema = new Schema({
    community_id: {
        type: Number,
        required: true,
    },
    category_code: {
        type: Number,
        required: true,
    },
    channel_name: {
        type: String,
        required: true,
    },
    user_limit: {
        type: Number,
        required: true,
    },
    channel_img_path: {
        type: String,
    },
    channel_desc: {
        type: String,
    },
    channel_state_code: {
        type: Number,
    },
    reg_date: {
        type: Date,
        default: Date.now,
    },
    reg_member_id: {
        type: Number,
    },
    edit_date: {
        type: Date,
    },
    edit_member_id: {
        type: Number,
    },
});

module.exports = mongoose.model('Channel', channelSchema);

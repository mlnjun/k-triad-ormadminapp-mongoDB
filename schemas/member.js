const mongoose = require('mongoose');
const { Schema } = mongoose;

const memberSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    member_password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    profile_img_path: {
        type: String,
    },
    telephone: {
        type: String,
    },
    entry_type_code: {
        type: Number,
    },
    use_state_code: {
        type: Number,
    },
    birth_date: {
        type: String,
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

module.exports = mongoose.model('Member', memberSchema);

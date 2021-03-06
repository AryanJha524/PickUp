const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firebaseUID: {
        type: String,
        required: true
    },
    userType: { // LEADER, CAPTAIN, or PLAYER   
        type: String,
        required: true
    }
});

module.exports = User = mongoose.model("User", UserSchema);
const mongoose = require("mongoose");
async function getConnection() {
    await mongoose.connect('mongodb://localhost/assignment');
}

module.exports = getConnection;
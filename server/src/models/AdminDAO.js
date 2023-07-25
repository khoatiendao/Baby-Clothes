const mongooseutils = require('../utils/MongooseUtil');
const Models = require('./Models');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const AdminDAO = {
    async insertAdmin(admin) {
        admin._id = new mongoose.Types.ObjectId();
        const result = await Models.Admin.create(admin);
        return result;
    },
    async selectByUsernameAndPassword(username, password) {
        const admin = await Models.Admin.findOne({username: username});
        if(admin) {
            const match = bcrypt.compare(password, admin.password);
            if(match) {
                return admin;
            }
        }
        return null;
    },
    async selectByEmail(email) {
        const query = {email: email};
        const adminEmail = await Models.Admin.findOne(query);
        return adminEmail;
    },
    async active(username, code, active) {
        const query = { username: username, code: code };
        const newvalues = { active: active };
        const result = await Models.Admin.findOneAndUpdate(query, newvalues, { new: true });
        return result;
    },
    async update(admin) {
        const newvalues = { username: admin.username, password: admin.password };
        const result = await Models.Admin.findByIdAndUpdate(admin._id, newvalues, { new: true });
        return result;
    }
};
module.exports = AdminDAO;
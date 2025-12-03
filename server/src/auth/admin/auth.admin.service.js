import { Admin } from "./admin.model";

class adminService {
    async createAdmin(data) {           
        const result = await Admin.create(data);
        return result;
    }

    async login(data) {
        const {email, password} = data;

        const findEmail = await Admin.findOne({email: email});

        if(!findEmail) 
            return {
                status: 404,
                success: false,
                message: 'Email not found'
            }

        const matchPassword = bcrypt.compare(password, findEmail.password);

        if(matchPassword) return findEmail;

        return null;
    }

    async selectByEmail(email) {
        const query = {email: email};
        const adminEmail = await Admin.findOne(query);
        return adminEmail;
    }    

    async update(data) { 
        const result = await Admin.findByIdAndUpdate(data._id, data, { new: true });
        return result;
    }
};

export const AdminService = new adminService();
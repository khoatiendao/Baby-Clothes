import { User } from "../model/user.model.js";

class userService {
    async createUser(data, session) {
        const result = await User.create([data], {session});
        return result;
    }

    async deleteUser(_id) {
        const result = await User.findByIdAndDelete(_id).exec();
        return result;
    }
}

export const UserService = new userService();
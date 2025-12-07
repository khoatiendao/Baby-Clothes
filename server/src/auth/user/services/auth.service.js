import { Auth } from "../model/auth.model.js";

class authService {
    async create(userId, session) {
        const authUser = await Auth.create([userId], {session});
        return authUser;
    }

    async updateAuth(userId, data) {
        const updateAuthUser = await Auth.findOneAndUpdate({userId: userId}, data, {new: true});
        return updateAuthUser;
    }
}

export const AuthService = new authService();
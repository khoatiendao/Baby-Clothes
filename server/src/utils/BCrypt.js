import bcrypt from 'bcrypt'

const saltRounds = 14;

export const passwordUtil = {
    async hash(password) {
        return await bcrypt.hash(password, saltRounds);        
    },

    async compare(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
}
const Bcrypt = require("bcrypt")

const BCryptUtils = {
    hashPassword(password) {
        const saltRounds = 14;
        Bcrypt.hash(password, saltRounds, function(err, hash) {
            // if(err) {
            //     return res.json({ success: false, message: 'Can not Bcrypt password' })
            // } else {
            //     this.password = hash;
            // }
            password = hash;
        });
        return password;
        // const saltRounds = 14;
        // return new Promise((resolve, reject) => {
        //     Bcrypt.genSalt(saltRounds, (err, salt) => {
        //         if (err) {
        //             return reject(err);
        //         }
        //         Bcrypt.hash(password, salt, (err, hash) => {
        //             if (err) {
        //                 return reject(err);
        //             }
        //             resolve(hash);
        //         });
        //     });
        // });
    },
    comparePassword(password,hashPassword) {
        return Bcrypt.compare(password, hashPassword);
    }
}

module.exports = BCryptUtils;
const Random = {
    genStringNumber() {
        let string = '';
        const characters = 'AB1CD2EF3GH4IJ5KL6MN7OP8QR9ST10UVWXYZ123456789';
        const charactersLength = characters.length;
        for(let i = 0; i < 5; i++) {
            string += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return string;
    }
}
module.exports = Random;
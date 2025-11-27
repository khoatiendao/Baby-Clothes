import dotenv from 'dotenv'
dotenv.config();

export const genCodeActive = () => {
  let string = '';
  const characters = process.env.CODE_SECERT;
  const charactersLength = characters.length;
  for (let i = 0; i < 5; i++) {
    string += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return string;
};

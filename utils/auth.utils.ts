import bcrypt from "bcrypt";

export default async function comparePasswords(plainText:string, hashed:string) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainText, hashed, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
import fs from 'fs';
import readline from "readline-sync";
import bcrypt from "bcrypt";

const saltRounds = 10;
const filePath = './password.txt';


const userInput = readline.question('Enter password: ', { hideEchoBack: true });

try {

    const fileExists = fs.existsSync(filePath);
    const storedHash = fileExists ? fs.readFileSync(filePath, 'utf8').trim() : "";

    if (!storedHash) {
        
        const hash = bcrypt.hashSync(userInput, saltRounds);
        fs.writeFileSync(filePath, hash);
        console.log(' Password is saved');
    } else {
       
        const isMatch = bcrypt.compareSync(userInput, storedHash);
        
        if (isMatch) {
            console.log(' True password');
        } else {
            console.log('❌ Wrong password!');
        }
    }
} catch (error) {
    console.error(" Problem:", error.message);
}

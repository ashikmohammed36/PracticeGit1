import cryptoJs from 'crypto-js';

export default class CommonUtils {
    private secretKey: string;
    /**
     * Initializing secret key
     */
    constructor() {
        // this.secretKey = process.env.SECRET_KEY ? process.env.SECRET_KEY : ""; using ternary  operator
        if (process.env.SECRET_KEY) {
            this.secretKey = process.env.SECRET_KEY;
        } else {
            throw new Error("Please Provide Secret Key while starting execution.");
        }
    }
    /**
     * Provided encrypted data from string
     * @param data 
     * @returns 
     */
    public encryptData(data: string) {
        const encryptedData = cryptoJs.AES.encrypt(data, this.secretKey).toString();
        console.log(encryptedData);
        return encryptedData;
    }
    /**
     * Provided decrypted data from string
     * @param encData
     * @returns 
     */
    public decryptData(encData: string) {
        const decryptedData = cryptoJs.AES.decrypt(encData, this.secretKey).toString(cryptoJs.enc.Utf8);
        return decryptedData;
    }

}
import admin from 'firebase-admin';

var instance: FirestoreUtils = null;

class FirestoreUtils {
    firestore;

    constructor () {
        let adminConfig64 = process.env.GOOGLE_ADMIN;
        console.log(adminConfig64);
        let adminConfig = JSON.parse(Buffer.from(adminConfig64, 'base64').toString('ascii'));
        console.log(adminConfig);
        admin.initializeApp({
            credential: admin.credential.cert(adminConfig)
        });
        this.firestore = admin.firestore();
    }

    static GetInstance () {
        if (instance == null) {
            instance = new FirestoreUtils();
        }
        return instance;
    }

    async getTestValue () {
        let testDoc = this.firestore.doc('test/doc');
        return await (await testDoc.get()).data();
    }

    async setTestValue (val: number) {
        let testDoc = this.firestore.doc('test/doc');
        await testDoc.set({
            flag: val
        });
    }
}

export default FirestoreUtils;
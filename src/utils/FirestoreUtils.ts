import admin from 'firebase-admin';
import {default as ff} from '@google-cloud/firestore';

class FirestoreUtils {
    private static instance: FirestoreUtils;
    private firestore: ff.Firestore;


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
        if (FirestoreUtils.instance === null || FirestoreUtils.instance === undefined) {
            FirestoreUtils.instance = new FirestoreUtils();
        }
        return FirestoreUtils.instance;
    }

    private isDoc (path:string): boolean {
        return path.split('/').length % 2 === 0;
    }

    async get (path: string): Promise<ff.DocumentData> {
        try {
            if (this.isDoc(path)) {
                let doc = this.firestore.doc(path);
                let data = await doc.get();
                return data?.data() ?? null;
            }
        } catch (ex) {
            console.error(`Error reading doc: ${path}`, ex.message);
        }
        return null;
    }

    async set (path: string, data: Object): Promise<boolean> {
        try {
            if (this.isDoc(path)) {
                let doc = this.firestore.doc(path);
                await doc.set(data, {merge: true});
                return true;
            }
        } catch (ex) {
            console.error(`Error writing doc: ${path}, data: ${data}`, ex.message);
        }
        return false;
    }

    async update (path: string, data: Object): Promise<boolean> {
        try {
            if (this.isDoc(path)) {
                let doc = this.firestore.doc(path);
                await doc.update(data);
                return true;
            }
        } catch (ex) {
            console.error(`Error updating doc: ${path}, data: ${data}`, ex.message);
        }
        return false;
    }

    async del (path: string) {
        try {
            if (this.isDoc(path)) {
                let doc = this.firestore.doc(path);
                await doc.delete();
                return true;
            }
        } catch (ex) {
            console.error(`Error deleting doc: ${path}`, ex.message);
        }
        return false;
    }
}

export default FirestoreUtils;
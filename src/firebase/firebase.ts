// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {
    getFirestore,
    doc,
    collection,
    addDoc,
    getDoc,
    onSnapshot,
    updateDoc,
    increment as inc,
    query,
    orderBy as ordBy,
    limit as lim
} from "firebase/firestore";
import firestore from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "shake-phone.firebaseapp.com",
    projectId: "shake-phone",
    storageBucket: "shake-phone.appspot.com",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db: firestore.Firestore = getFirestore();

export async function addData(db_name: string, data: Partial<unknown>, onSuccess: (id: string) => void): Promise<void> {
    try {
        const docRef = await addDoc(collection(db, db_name), data);
        onSuccess(docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// eslint-disable-next-line
export async function getData(db_name: string, id: string): Promise<any> {
    const ref = doc(db, db_name, id);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        return null
    }
}

// eslint-disable-next-line
export function onData(db_name: string, id: string, watcher: (data: any) => void): firestore.Unsubscribe {
    return onSnapshot(doc(db, db_name, id), doc => watcher(doc.data()));
}

export const increment = inc;
export const orderBy = ordBy;
export const limit = lim;

export async function incrementData(db_name: string, id: string, diff: Partial<unknown>): Promise<void> {
    const ref = doc(db, db_name, id);
    await updateDoc(ref, diff);
}

export function onQueryData(db_name: string, constraints: firestore.QueryConstraint[], listener: (type: string, data: firestore.DocumentData) => void): void {
    const q = query(collection(db, db_name), ...constraints)
    onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach(change => listener(change.type, change.doc.data()));
    });
}
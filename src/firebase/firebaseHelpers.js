import { ref, set, get, update } from 'firebase/database';
import { db } from './firebase';

const serializeLayoutData = (layoutData) => {
    return layoutData.map(item => ({
        type: item.type,
        label: item.label,
        id: item.id,
    }));
};

// Save layout data to Firebase Realtime Database with a user-defined layout name
export const saveLayoutToDB = async (layoutName, layoutData) => {
    try {
        const serializedLayout = serializeLayoutData(layoutData);
        const dbRef = ref(db, `layouts/${layoutName}`); // Use layout name as the path key
        await set(dbRef, serializedLayout);
        console.log("Layout saved to Realtime Database");
    } catch (error) {
        console.error("Error saving layout:", error);
    }
};

// Load layout data from Firebase Realtime Database by layout name
export const loadLayoutFromDB = async (layoutName) => {
    try {
        const dbRef = ref(db, `layouts/${layoutName}`); // Use layout name to specify the path
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            console.log("Layout loaded from Realtime Database:", snapshot.val());
            return snapshot.val();
        } else {
            console.log("No layout found with that name in Realtime Database");
            return null;
        }
    } catch (error) {
        console.error("Error loading layout:", error);
        return null;
    }
};

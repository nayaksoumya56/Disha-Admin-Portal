import { initializeApp } from "firebase/app";
import { getDatabase, ref as getDatabaseRef, get, set } from "firebase/database";
import { getStorage, ref as getStorageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { environment } from "./environment";

export const firebaseApp = initializeApp(environment.firebase)
export const firebaseDatabase = getDatabase(firebaseApp)
export const firebaseStorage = getStorage(firebaseApp)
export const firebaseAuth = getAuth(firebaseApp);

//Authentication functions
export const signUp = async (userData) => {
	try {
		const { email, password, name, role } = userData
		let userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password)
		await setData(
			`Admin`, {
			[userCredential.user.uid]: {
				email,
				name,
				role
			}
		})
		return {
			userCredential,
		}

	} catch (error) {
		console.error("Firebase Error =>", error);
		return {
			error,
			userCredential: undefined,
		}
	}
}
export const signIn = async ({ email, password }) => {
	try {
		let userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password)
		return {
			userCredential,
		}

	} catch (error) {
		console.error("Firebase Error =>", error);
		return {
			error,
			userCredential: undefined,
		}
	}
}

// Database functions
export const getData = async (url) => {
	try {
		let dbRef = getDatabaseRef(firebaseDatabase, url)
		let snapshot = await get(dbRef)
		if (snapshot.exists()) {
			return {
				snapshot,
				data: snapshot.val(),
			}
		} else {
			console.log("GetData Failed. No data available");
			return {
				snapshot,
				data: undefined
			}
		}
	}
	catch (error) {
		console.error("Firebase Error =>", error);
		return {
			error,
			snapshot: undefined,
			data: undefined,
		}
	}
}
export const setData = (url, data) => {
	try {
		let dbRef = getDatabaseRef(firebaseDatabase, url)
		set(dbRef, data)
	}
	catch (error) {
		console.error("Firebase Error =>", error);
	}
}

export const createTable = (tableLocation, data) => {
	try {
		let dbRef = getDatabaseRef(firebaseDatabase, tableLocation)
		if (data) {
			set(dbRef, data)
		} else {
			console.log("CreateTable Failed. No data to add.")
		}
	}
	catch (error) {
		console.error("Firebase Error =>", error);
	}
}
export const dropTable = (tableLocation) => {
	try {
		let dbRef = getDatabaseRef(firebaseDatabase, tableLocation)
		set(dbRef, null)
	}
	catch (error) {
		console.error("Firebase Error =>", error);
	}
}

// Storage Functions

export const uploadFile = async (folderPath, file) => {
	try {
		let filePath = `${folderPath}/${file.name}`;
		let storageRef = getStorageRef(firebaseStorage, filePath);
		let snapshot = await uploadBytes(storageRef, file)
		let downloadUrl = await getDownloadURL(storageRef, filePath);
		return {
			snapshot,
			downloadUrl
		}
	} catch (error) {
		console.error("Firebase Error =>", error);
	}
}

export const downloadFile = async (url) => {
	// I need to find out how to open "save as" dialog.
	// For now lets just open a new window.
	window.open(url)
}
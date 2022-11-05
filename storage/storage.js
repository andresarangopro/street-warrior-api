import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

import config from './config.js';


const app = initializeApp(config.firebaseConfig);
const storage = getStorage(app,"gs://streetwarrior-c5141.appspot.com");

export default storage;
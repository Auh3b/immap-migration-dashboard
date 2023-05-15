import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyB9VMGt3w5jeSNsKMLcPcMIRjSUsvnlHb4',
  authDomain: 'immap-migration.firebaseapp.com',
  projectId: 'immap-migration',
  storageBucket: 'immap-migration.appspot.com',
  messagingSenderId: '395969911598',
  appId: '1:395969911598:web:b8b780ce70d6a2d796f8bf',
  measurementId: 'G-E24N82S544',
};

const app = initializeApp(firebaseConfig);
export const fireStorage = getStorage(app);

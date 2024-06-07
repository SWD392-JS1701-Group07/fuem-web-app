import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyBJt2krwDlRytM_dhxGUdd_WrKHQegVhmQ',
    authDomain: 'fuemtest.firebaseapp.com',
    projectId: 'fuemtest',
    storageBucket: 'fuemtest.appspot.com',
    messagingSenderId: '650313711581',
    appId: '1:650313711581:web:0871a944dff7151d19c034',
    measurementId: 'G-7SL5DHMGNM'
  }
initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
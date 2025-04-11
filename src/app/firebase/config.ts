import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAqSgH62WuG-8zwhFjDZoGvbAcOpL4Rcu4',
  authDomain: 'feraset-case.firebaseapp.com',
  projectId: 'feraset-case',
  storageBucket: 'feraset-case.firebasestorage.app',
  messagingSenderId: '1051816786750',
  appId: '1:1051816786750:web:1ce5149022f1f34acbca6f'
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "notes-1cb8d", appId: "1:117977161853:web:32b709345786859f65d114", storageBucket: "notes-1cb8d.firebasestorage.app", apiKey: "AIzaSyAtkc_ajUMJiCOvbA6vlzCt7Yr2nVIx-VE", authDomain: "notes-1cb8d.firebaseapp.com", messagingSenderId: "117977161853" })), provideFirestore(() => getFirestore())
  ]
};


// projectNumber: "117977161853", version: "2"
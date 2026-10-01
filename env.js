/**
 * env.js - Application Environment & Security Configuration
 * 
 * Provides centralized, secure access to environment variables.
 * In production or hosting platforms (Vercel, Netlify, Cloudflare),
 * variables can be populated via build-time replacement, server-side injection (window.__ENV__),
 * or fall back safely to configured values.
 */

const runtimeEnv = (typeof window !== 'undefined' && window.__ENV__) ? window.__ENV__ : {};

export const env = {
  FIREBASE_API_KEY: runtimeEnv.FIREBASE_API_KEY || "AIzaSyBw8HBTT9pFJv6-rEEjibSvwHPpNWJaHB0",
  FIREBASE_AUTH_DOMAIN: runtimeEnv.FIREBASE_AUTH_DOMAIN || "mn-portfiolio.firebaseapp.com",
  FIREBASE_PROJECT_ID: runtimeEnv.FIREBASE_PROJECT_ID || "mn-portfiolio",
  FIREBASE_STORAGE_BUCKET: runtimeEnv.FIREBASE_STORAGE_BUCKET || "mn-portfiolio.firebasestorage.app",
  FIREBASE_MESSAGING_SENDER_ID: runtimeEnv.FIREBASE_MESSAGING_SENDER_ID || "80517558958",
  FIREBASE_APP_ID: runtimeEnv.FIREBASE_APP_ID || "1:80517558958:web:7f7372eaf2caa0b7eef33f",
  FIREBASE_MEASUREMENT_ID: runtimeEnv.FIREBASE_MEASUREMENT_ID || "G-SGDRFV8517"
};

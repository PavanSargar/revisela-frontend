/**
 * Application Routes
 *
 * This file contains all routes used throughout the application.
 * Using these constants ensures consistency and makes route changes easier.
 */

export const ROUTES = {
  // Auth routes
  AUTH: {
    LOGIN: '/auth',
    SIGNUP: '/auth?signup=true',
    FORGOT_PASSWORD: '/auth?forget-password=true',
  },

  // Dashboard routes
  DASHBOARD: {
    HOME: '/dashboard',
    LIBRARY: '/dashboard/library',
    SHARED: '/dashboard/shared',
    BOOKMARKS: '/dashboard/bookmarks',
    RECENT: '/dashboard/recent',
    TRASH: '/dashboard/trash',
    ACCOUNT_SETTINGS: '/dashboard/account-settings',
    CLASSES: {
      ROOT: '/dashboard/classes',
      CREATE: '/dashboard/classes/create',
      JOIN: '/dashboard/classes/join',
    },
    QUIZ_SETS: {
      CREATE: '/dashboard/create-set',
    },
  },

  // Home
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_OF_SERVICE: '/terms-of-service',
};

export default ROUTES;

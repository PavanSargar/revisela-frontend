/**
 * API Endpoints
 *
 * This file contains all the API endpoints used in the application.
 * Endpoints are organized by feature domain for better maintainability.
 */

// Base API URL that can be environment-specific
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

// Type definitions for endpoint configurations
export type EndpointConfig = {
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
};

// Auth endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: {
    url: `${API_BASE_URL}/auth/login`,
    method: "POST",
  } as EndpointConfig,

  SIGNUP: {
    url: `${API_BASE_URL}/auth/register`,
    method: "POST",
  } as EndpointConfig,

  LOGOUT: {
    url: `${API_BASE_URL}/auth/logout`,
    method: "POST",
  } as EndpointConfig,

  RESET_PASSWORD: {
    url: `${API_BASE_URL}/auth/reset-password`,
    method: "POST",
  } as EndpointConfig,

  FORGOT_PASSWORD: {
    url: `${API_BASE_URL}/auth/forgot-password`,
    method: "POST",
  } as EndpointConfig,

  VERIFY_OTP: {
    url: `${API_BASE_URL}/auth/verify-otp`,
    method: "POST",
  } as EndpointConfig,

  REFRESH_TOKEN: {
    url: `${API_BASE_URL}/auth/refresh-token`,
    method: "POST",
  } as EndpointConfig,
};

// User endpoints
export const USER_ENDPOINTS = {
  GET_PROFILE: {
    url: `${API_BASE_URL}/users/profile/me`,
    method: "GET",
  } as EndpointConfig,

  UPDATE_PROFILE: (userId: string) =>
    ({
      url: `${API_BASE_URL}/users/${userId}`,
      method: "PATCH",
    } as EndpointConfig),

  GET_USER: (userId: string) =>
    ({
      url: `${API_BASE_URL}/users/${userId}`,
      method: "GET",
    } as EndpointConfig),

  DELETE_ACCOUNT: (userId: string) =>
    ({
      url: `${API_BASE_URL}/users/${userId}`,
      method: "DELETE",
    } as EndpointConfig),

  GET_ALL_USERS: {
    url: `${API_BASE_URL}/users`,
    method: "GET",
  } as EndpointConfig,

  CREATE_USER: {
    url: `${API_BASE_URL}/users`,
    method: "POST",
  } as EndpointConfig,

  GET_USER_BY_EMAIL: (email: string) =>
    ({
      url: `${API_BASE_URL}/users/email/${email}`,
      method: "GET",
    } as EndpointConfig),

  UPDATE_USER: (userId: string) =>
    ({
      url: `${API_BASE_URL}/users/${userId}`,
      method: "PATCH",
    } as EndpointConfig),

  DELETE_USER: (userId: string) =>
    ({
      url: `${API_BASE_URL}/users/${userId}`,
      method: "DELETE",
    } as EndpointConfig),
};

// Folder endpoints
export const FOLDER_ENDPOINTS = {
  GET_FOLDERS: {
    url: `${API_BASE_URL}/folders`,
    method: "GET",
  } as EndpointConfig,

  GET_FOLDER: (folderId: string) =>
    ({
      url: `${API_BASE_URL}/folders/${folderId}`,
      method: "GET",
    } as EndpointConfig),

  CREATE_FOLDER: {
    url: `${API_BASE_URL}/folders`,
    method: "POST",
  } as EndpointConfig,

  UPDATE_FOLDER: (folderId: string) =>
    ({
      url: `${API_BASE_URL}/folders/${folderId}`,
      method: "PUT",
    } as EndpointConfig),

  DELETE_FOLDER: (folderId: string) =>
    ({
      url: `${API_BASE_URL}/folders/${folderId}`,
      method: "DELETE",
    } as EndpointConfig),

  MOVE_FOLDER: (folderId: string) =>
    ({
      url: `${API_BASE_URL}/folders/${folderId}/move`,
      method: "POST",
    } as EndpointConfig),

  DUPLICATE_FOLDER: (folderId: string) =>
    ({
      url: `${API_BASE_URL}/folders/${folderId}/duplicate`,
      method: "POST",
    } as EndpointConfig),

  GET_FOLDERS_TRASH: {
    url: `${API_BASE_URL}/folders/trash`,
    method: "GET",
  } as EndpointConfig,

  RESTORE_FOLDER: (folderId: string) =>
    ({
      url: `${API_BASE_URL}/folders/trash/${folderId}/restore`,
      method: "PATCH",
    } as EndpointConfig),

  PERMANENTLY_DELETE_FOLDER: (folderId: string) =>
    ({
      url: `${API_BASE_URL}/folders/trash/${folderId}`,
      method: "DELETE",
    } as EndpointConfig),
};

// Quiz set endpoints - renamed to QUIZ_ENDPOINTS to match Postman collection
export const QUIZ_ENDPOINTS = {
  // GET all quizzes (public ones)
  GET_QUIZZES: {
    url: `${API_BASE_URL}/quizzes`,
    method: "GET",
  } as EndpointConfig,

  // GET user's created quizzes
  GET_MY_QUIZZES: {
    url: `${API_BASE_URL}/quizzes/my-quizzes`,
    method: "GET",
  } as EndpointConfig,

  // Search quizzes
  SEARCH_QUIZZES: {
    url: `${API_BASE_URL}/quizzes/search`,
    method: "GET",
  } as EndpointConfig,

  // Get specific quiz
  GET_QUIZ: (quizId: string) =>
    ({
      url: `${API_BASE_URL}/quizzes/${quizId}`,
      method: "GET",
    } as EndpointConfig),

  // Create new quiz
  CREATE_QUIZ: {
    url: `${API_BASE_URL}/quizzes`,
    method: "POST",
  } as EndpointConfig,

  // Update a quiz
  UPDATE_QUIZ: (quizId: string) =>
    ({
      url: `${API_BASE_URL}/quizzes/${quizId}`,
      method: "PATCH",
    } as EndpointConfig),

  // Delete a quiz
  DELETE_QUIZ: (quizId: string) =>
    ({
      url: `${API_BASE_URL}/quizzes/${quizId}`,
      method: "DELETE",
    } as EndpointConfig),

  GET_QUIZZES_BY_TAG: (tag: string) =>
    ({
      url: `${API_BASE_URL}/quizzes/tags/${tag}`,
      method: "GET",
    } as EndpointConfig),

  GET_FOLDER_QUIZZES: (folderId: string) =>
    ({
      url: `${API_BASE_URL}/folders/${folderId}/quizzes`,
      method: "GET",
    } as EndpointConfig),

  GET_QUIZZES_TRASH: {
    url: `${API_BASE_URL}/quizzes/trash`,
    method: "GET",
  } as EndpointConfig,

  RESTORE_QUIZ: (quizId: string) =>
    ({
      url: `${API_BASE_URL}/quizzes/trash/${quizId}/restore`,
      method: "PATCH",
    } as EndpointConfig),

  PERMANENTLY_DELETE_QUIZ: (quizId: string) =>
    ({
      url: `${API_BASE_URL}/quizzes/trash/${quizId}`,
      method: "DELETE",
    } as EndpointConfig),
};

// Keep the original QUIZ_SET_ENDPOINTS for backward compatibility if needed
export const QUIZ_SET_ENDPOINTS = {
  GET_QUIZ_SETS: {
    url: `${API_BASE_URL}/quiz-sets`,
    method: "GET",
  } as EndpointConfig,

  GET_QUIZ_SET: (quizSetId: string) =>
    ({
      url: `${API_BASE_URL}/quiz-sets/${quizSetId}`,
      method: "GET",
    } as EndpointConfig),

  CREATE_QUIZ_SET: {
    url: `${API_BASE_URL}/quiz-sets`,
    method: "POST",
  } as EndpointConfig,

  UPDATE_QUIZ_SET: (quizSetId: string) =>
    ({
      url: `${API_BASE_URL}/quiz-sets/${quizSetId}`,
      method: "PUT",
    } as EndpointConfig),

  DELETE_QUIZ_SET: (quizSetId: string) =>
    ({
      url: `${API_BASE_URL}/quiz-sets/${quizSetId}`,
      method: "DELETE",
    } as EndpointConfig),
};

// Class endpoints
export const CLASS_ENDPOINTS = {
  GET_CLASSES: {
    url: `${API_BASE_URL}/classes`,
    method: "GET",
  } as EndpointConfig,

  GET_MY_CLASSES: {
    url: `${API_BASE_URL}/classes/my-classes`,
    method: "GET",
  } as EndpointConfig,

  CREATE_CLASS: {
    url: `${API_BASE_URL}/classes`,
    method: "POST",
  } as EndpointConfig,

  GET_CLASS: (classId: string) =>
    ({
      url: `${API_BASE_URL}/classes/${classId}`,
      method: "GET",
    } as EndpointConfig),

  UPDATE_CLASS: (classId: string) =>
    ({
      url: `${API_BASE_URL}/classes/${classId}`,
      method: "PATCH",
    } as EndpointConfig),

  DELETE_CLASS: (classId: string) =>
    ({
      url: `${API_BASE_URL}/classes/${classId}`,
      method: "DELETE",
    } as EndpointConfig),

  ADD_MEMBER: (classId: string) =>
    ({
      url: `${API_BASE_URL}/classes/${classId}/members`,
      method: "POST",
    } as EndpointConfig),

  REMOVE_MEMBER: (classId: string, memberId: string) =>
    ({
      url: `${API_BASE_URL}/classes/${classId}/members/${memberId}`,
      method: "DELETE",
    } as EndpointConfig),

  GET_MEMBERS: (classId: string) =>
    ({
      url: `${API_BASE_URL}/classes/${classId}/members`,
      method: "GET",
    } as EndpointConfig),

  ACCEPT_INVITATION: (classId: string) =>
    ({
      url: `${API_BASE_URL}/classes/${classId}/accept-invitation`,
      method: "POST",
    } as EndpointConfig),

  GET_PENDING_INVITATIONS: {
    url: `${API_BASE_URL}/classes/invitations/pending`,
    method: "GET",
  } as EndpointConfig,

  ADD_QUIZ_TO_CLASS: (classId: string, quizId: string) =>
    ({
      url: `${API_BASE_URL}/classes/${classId}/quizzes/${quizId}`,
      method: "POST",
    } as EndpointConfig),

  GET_CLASS_QUIZZES: (classId: string) =>
    ({
      url: `${API_BASE_URL}/classes/${classId}/quizzes`,
      method: "GET",
    } as EndpointConfig),
};

// Email endpoints
export const EMAIL_ENDPOINTS = {
  SEND_INVITATION: {
    url: `${API_BASE_URL}/emails/send-invitation`,
    method: "POST",
  } as EndpointConfig,

  SEND_NOTIFICATION: {
    url: `${API_BASE_URL}/emails/send-notification`,
    method: "POST",
  } as EndpointConfig,

  TEST_EMAIL: {
    url: `${API_BASE_URL}/emails/test`,
    method: "POST",
  } as EndpointConfig,
};

// Upload endpoints
export const UPLOAD_ENDPOINTS = {
  UPLOAD_IMAGE: {
    url: `${API_BASE_URL}/uploads/image`,
    method: "POST",
  } as EndpointConfig,

  UPLOAD_DOCUMENT: {
    url: `${API_BASE_URL}/uploads/document`,
    method: "POST",
  } as EndpointConfig,

  UPLOAD_PROFILE_IMAGE: {
    url: `${API_BASE_URL}/users/profile/image`,
    method: "POST",
  } as EndpointConfig,

  UPLOAD_PROFILE_IMAGE_ALT: {
    url: `${API_BASE_URL}/uploads/profile`,
    method: "POST",
  } as EndpointConfig,

  UPLOAD_QUIZ_QUESTION_IMAGE: {
    url: `${API_BASE_URL}/uploads/quiz-question`,
    method: "POST",
  } as EndpointConfig,

  GET_PRESIGNED_URL: (key: string) =>
    ({
      url: `${API_BASE_URL}/uploads/${key}`,
      method: "GET",
    } as EndpointConfig),

  DELETE_FILE: (key: string) =>
    ({
      url: `${API_BASE_URL}/uploads/${key}`,
      method: "DELETE",
    } as EndpointConfig),
};

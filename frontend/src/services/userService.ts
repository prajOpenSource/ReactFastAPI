import type {
  User,
  CreateUserRequest,
  UpdateUserRequest
} from "../models/User";

import { API_BASE_URL } from "../config/apiConfig";


const USERS_API_URL = `${API_BASE_URL}/api/users`;


/*
 * GET - Get all users
 */
export async function getUsers(): Promise<User[]> {

  const response = await fetch(USERS_API_URL);

  if (!response.ok) {

    const message = await response.text();

    throw new Error(
      `Failed to fetch users (${response.status}): ${message}`
    );
  }

  return response.json();
}


/*
 * GET - Get user by ID
 */
export async function getUserById(
  id: number
): Promise<User> {

  const response = await fetch(
    `${USERS_API_URL}/${id}`
  );

  if (!response.ok) {

    if (response.status === 404) {
      throw new Error("User not found");
    }

    const message = await response.text();

    throw new Error(
      `Failed to fetch user (${response.status}): ${message}`
    );
  }

  return response.json();
}


/*
 * POST - Create user
 */
export async function createUser(
  user: CreateUserRequest
): Promise<User> {

  const response = await fetch(
    USERS_API_URL,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(user)
    }
  );


  if (!response.ok) {

    const message = await response.text();

    if (response.status === 409) {
      throw new Error("Email already registered");
    }

    if (response.status === 422) {
      throw new Error("Invalid user data");
    }

    throw new Error(
      `Failed to create user (${response.status}): ${message}`
    );
  }


  return response.json();
}


/*
 * PUT - Update user
 */
export async function updateUser(
  id: number,
  user: UpdateUserRequest
): Promise<User> {

  const response = await fetch(
    `${USERS_API_URL}/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(user)
    }
  );


  if (!response.ok) {

    const message = await response.text();

    if (response.status === 404) {
      throw new Error("User not found");
    }

    if (response.status === 409) {
      throw new Error("Email already registered");
    }

    if (response.status === 422) {
      throw new Error("Invalid user data");
    }

    throw new Error(
      `Failed to update user (${response.status}): ${message}`
    );
  }


  return response.json();
}


/*
 * DELETE - Delete user
 */
export async function deleteUser(
  id: number
): Promise<void> {

  const response = await fetch(
    `${USERS_API_URL}/${id}`,
    {
      method: "DELETE"
    }
  );


  if (!response.ok) {

    const message = await response.text();

    if (response.status === 404) {
      throw new Error("User not found");
    }

    throw new Error(
      `Failed to delete user (${response.status}): ${message}`
    );
  }
}
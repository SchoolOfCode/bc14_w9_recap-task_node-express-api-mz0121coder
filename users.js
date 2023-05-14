import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

const fileName = "users.json";

export async function getUsers() {
  // should return an array of all users
  const usersJSON = await fs.readFile(fileName);
  const users = JSON.parse(usersJSON);
  return users;
}

export async function getUserByID(id) {
  // should return the particular user we are looking for
  const usersJSON = await fs.readFile(fileName);
  const users = JSON.parse(usersJSON);
  const userFound = users.filter((user) => {
    return user.id === id;
  });
  return userFound;
}

export async function createUser(newUser) {}

export async function updateUserByID(id, updatedUser) {}

export async function deleteUserByID(id) {}

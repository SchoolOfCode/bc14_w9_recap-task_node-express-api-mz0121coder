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

export async function createUser(newUser) {
  const usersJSON = await fs.readFile(fileName);
  const users = JSON.parse(usersJSON);
  const user = {
    id: uuidv4(),
    first_name: newUser.first_name,
    last_name: newUser.last_name,
    email: newUser.email,
    catchphrase: newUser.catchphrase,
  };
  users.push(user);
  const stringifyUsers = JSON.stringify(users);
  await fs.writeFile(fileName, stringifyUsers, "utf-8");
  return user;
}

export async function updateUserByID(id, updatedUser) {
  const usersJSON = await fs.readFile(fileName);
  const users = JSON.parse(usersJSON);
}

export async function deleteUserByID(id) {
  const usersJSON = await fs.readFile(fileName);
  const users = JSON.parse(usersJSON);
}

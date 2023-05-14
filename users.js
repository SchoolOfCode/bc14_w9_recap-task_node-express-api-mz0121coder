import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

const fileName = "users.json";

export async function getUsers() {
  const usersJSON = await fs.readFile(fileName);
  const users = JSON.parse(usersJSON);
  return users;
}

export async function getUserByID(id) {
  const usersJSON = await fs.readFile(fileName);
  const users = JSON.parse(usersJSON);
  return users.filter((user) => user.id === id);
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
  await fs.writeFile(fileName, JSON.stringify(users), "utf-8");
  return user;
}

export async function updateUserByID(id, updatedUser) {
  const usersJSON = await fs.readFile(fileName);
  const users = JSON.parse(usersJSON);
  let user = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      (users[i].first_name = updatedUser.first_name),
        (users[i].last_name = updatedUser.last_name),
        (users[i].email = updatedUser.email),
        (users[i].catchphrase = updatedUser.catchphrase);
      user = users[i];
      break;
    }
  }
  await fs.writeFile(fileName, JSON.stringify(users), "utf-8");
  return user;
}

export async function deleteUserByID(id) {
  const usersJSON = await fs.readFile(fileName);
  const users = JSON.parse(usersJSON);
  let indexToDelete = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      indexToDelete = i;
      break;
    }
  }
  if (indexToDelete !== null) {
    const deletedUser = users.splice(indexToDelete, 1);
    await fs.writeFile(fileName, JSON.stringify(users), "utf-8");
    return deletedUser[0];
  }
  return null;
}

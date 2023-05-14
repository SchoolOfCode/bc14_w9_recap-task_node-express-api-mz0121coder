import express from "express";

import {
  getUsers,
  getUserByID,
  createUser,
  updateUserByID,
  deleteUserByID,
} from "./users.js";

const app = express();
const port = 3000;
app.use(express.json());

// get all users
app.get("/api/users", async (req, res) => {
  const users = await getUsers();
  let success = false;
  if (users.length > 0) {
    success = true;
    console.log(`getUsers: successful`);
  }
  res.send({ success, payload: users });
});

// get user by id
app.get("/api/users/:id", async (req, res) => {
  const users = await getUsers();
  const user = await getUserByID(req.params.id);
  let success = false;
  if (Object.keys(user).length > 0) {
    success = true;
    console.log(`getUserByID: successful`);
  }
  res.send({ success, payload: user, users });
});

// create new user
app.post("/api/users", async (req, res) => {
  const users = await getUsers();
  const user = await createUser(req.body);
  let success = false;
  if (Object.keys(user).length > 0) {
    success = true;
    console.log(`createUser: successful`);
  }
  res.send({ success, payload: user, users });
});

// update user by id
app.patch("/api/users/:id", async (req, res) => {
  const users = await getUsers();
  const updatedUser = await updateUserByID(req.params.id, req.body);
  let success = false;
  if (Object.keys(updatedUser).length > 0) {
    success = true;
    console.log(`updateUserByID: successful`);
  }
  res.send({ success, payload: updatedUser, users });
});

// delete user
app.delete("/api/users/:id", async (req, res) => {
  const users = await getUsers();
  const deletedUser = await deleteUserByID(req.params.id);
  let success = false;
  if (Object.keys(deletedUser).length > 0) {
    success = true;
    console.log(`deleteUserByID: successful`);
  }
  res.send({ success, payload: deletedUser, users });
});

app.use("/", (req, res) => {
  res.json({
    status: true,
    payload: "This route works!",
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

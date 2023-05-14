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
  const user = await getUserByID(req.params.id);
  let success = false;
  if (Object.keys(user).length > 0) {
    success = true;
    console.log(`getUserById: successful`);
  }
  res.send({ success, payload: user });
});

// create new user
// app.post('/api/users',async(req,res)=>{
//   const user=await
// })
app.use(express.json());

app.use("/", (req, res) => {
  res.json({
    status: true,
    payload: "This route works!",
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

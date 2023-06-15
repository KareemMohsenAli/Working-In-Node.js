const express = require("express");
const app = express();
const port = 6000;

const users = [
  { id: 1, email: "kareem@gmail.com", password: 1111111 },
  { id: 1, email: "kareem@gmail.com", password: 1111111 },
  { id: 2, email: "salosa@gmail.com", password: 1111111 },
  { id: 3, email: "junoir@gmail.com", password: 1111111 },
  { id: 4, email: "azzoz@gmail.com", password: 1111111 },
];
const posts = [
  { id: 1, content: "let me play football" },
  { id: 2, content: "let me hang out!" },
  { id: 2, content: "greaat app!!" },
  { id: 3, content: "watching a new movies" },
  { id: 4, content: "i'm your nightmare" },
];
const postsDataBase = [];
const userDataBase = [];
////////////////////////////////////////////////////////////just for test
// app.post("/users", (req, res) => {
//   const { email, password } = req.body;
//   const check = users.find((user) => {
//     return user.email === email;
//   });
//   if (check) {
//     return res.json({ message: "email already in use" });
//   } else {
//     users.push({ email: email, password: password, id: Math.random() });
//     return res.json({ message: "user is added" });
//   }
// });
// app.get("/", (req, res, next) => {
//   return res.json("kareem");
// });
////////////////////////////////////////////////////////////just for test
////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use(express.json());
///////////////////////////////////////////////////////////////////////////////////////////////get all users
app.get("/getusers", (req, res, next) => {
  return res.json({ users });
});
///////////////////////////////////////////////////////////////////////////////////////////////add a user
app.post("/adduser", (req, res, next) => {
  const { email, password } = req.body;
  const checkEmailExist = users.find((user) => user.email === email);
  if (checkEmailExist) {
    return res.json({ message: "email is already exist" });
  } else {
    userDataBase.push({ email: email, password: password, id: Math.random() });
    console.log(userDataBase);
    return res.json({ message: "done" });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////get all users stoted by name
app.get("/getsortedusers", (req, res, next) => {
  const sortedUsers = users.sort((a, b) => a.email.localeCompare(b.email));
  res.json({ users: sortedUsers });
});
/////////////////////////////////////////////update a user by sending email in body and id in the url(mandatory to send the id)
app.patch("/users/update/:id", (req, res) => {
  const { email } = req.body;
  const id = req.params.id;
  console.log(id);
  const findIndex = users.findIndex((user) => {
    return user.id == id;
  });
  if (findIndex != -1) {
    users[findIndex].email = email;
    return res.json({
      message: "data is updated",
      updatedData: users[findIndex],
    });
    // console.log(users);
  } else {
    return res.json({ message: "ID is not found" });
  }
  // console.log(email);
});
///////////////////////////////////////////////////////////////////////////////////////////////delete specific user by id
app.delete("/users/delete/:id", (req, res) => {
  // const { id } = req.body;
  const id = req.params.id;
  const findIndex = users.find((user) => {
    return user.id == id;
  });
  if (findIndex) {
    const deleteUser = users.splice(findIndex, 1)[0];
    console.log({ deleteUser });
    return res.json({ message: `user is deleted `, deleteUser });
  } else {
    return res.json({ message: `user is not found` });
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////search in specifi user uing id
app.get("/users/search/:id", (req, res) => {
  const id = req.params.id;
  const findUsers = users.filter((user) => {
    return user.id == id;
  });
  if (findUsers.length > 0) {
    return res.json({ findUsers });
  } else {
    return res.json({ message: `user is not found` });
  }
});
//////////////////////////////////////////////////////////////////Posts/////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////get all posts
app.get("/getposts", (req, res, next) => {
  return res.json({ posts });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////add a post
app.post("/addpost", (req, res, next) => {
  const { content } = req.body;
  postsDataBase.push({ content: content, id: Math.random() });
  console.log(postsDataBase);
  return res.json({ message: "post is added successfully" });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////get all posts reversed
app.get("/getsortedposts", (req, res, next) => {
  const sortedposts = posts.slice().reverse();
  res.json({ posts: sortedposts });
});
/////////////////////////////////////////////update a post by sending post in body and id in the url(mandatory to send the id)
app.patch("/post/update/:id", (req, res) => {
  const { content } = req.body;
  const id = req.params.id;
  console.log(id);
  const findIndex = posts.findIndex((post) => {
    return post.id == id;
  });
  if (findIndex != -1) {
    posts[findIndex].content = content;
    return res.json({
      message: "post is updated",
      updatedData: posts[findIndex],
    });
    // console.log(posts);
  } else {
    return res.json({ message: "ID is not found" });
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////delete specific post by id
app.delete("/post/delete/:id", (req, res) => {
  // const { id } = req.body;
  const id = req.params.id;
  const findIndex = posts.find((post) => {
    return post.id == id;
  });
  if (findIndex) {
    const deletepost = posts.splice(findIndex, 1)[0];
    console.log({ deletepost });
    return res.json({ message: `post is deleted `, deletepost });
  } else {
    return res.json({ message: `post is not found` });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////search in specifi post using id
app.get("/post/search/:id", (req, res) => {
  const id = req.params.id;
  const findPost = posts.filter((post) => {
    return post.id == id;
  });
  if (findPost.length > 0) {
    return res.json({ findPost });
  } else {
    return res.json({ message: `post is not found` });
  }
});
app.get("*", (req, res, next) => {
  return res.json("page not found");
});
app.listen(port, () => {
  console.log(`server listening on ${port}`);
});

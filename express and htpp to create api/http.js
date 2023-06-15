const http = require("http");
http
  .createServer((req, res, next) => {
    const AddUserDataBase = [];
    const postsDataBase = [];
    const allusers = [
      { name: "kareem", age: 22, id: 1 },
      { name: "mohsen", age: 25, id: 2 },
      { name: "ali", age: 28, id: 3 },
      { name: "gad", age: 30, id: 4 },
      { name: "saed", age: 35, id: 5 },
      { name: "kareem", age: 35, id: 1 },
    ];
    const posts = [
      { content: "i like watching tv", id: 1 },
      { content: "i like playing football", id: 2 },
      { content: "i like listen to music ", id: 3 },
      { content: "i like listen to music ", id: 4 },
      { content: "i like reading books ", id: 5 },
    ];

    const { url, method } = req;
    //////////////////////////////////////////////////////////////////////////////////////////Get all users from allusers array
    if (method == "GET" && url == "/GetAllUsers") {
      const convertResponse = JSON.stringify(allusers);
      res.write(convertResponse);
      res.end();
      ////////////////////////////////////////////////////////////////////////post a user and push it in AddUserDataBase array
    } else if (method == "POST" && url == "/AddUser") {
      let userdata;
      req.on("data", (data) => {
        userdata = data;
      });
      req.on("end", () => {
        const convertUserData = JSON.parse(userdata);
        const { name, age } = convertUserData;

        console.log(convertUserData);
        AddUserDataBase.push({ name, age, id: Math.random() });
        const response = {
          message: "user has been added",
          token: "kasd113jasd11",
        };
        res.write(JSON.stringify(response));
        res.end();
        console.log(AddUserDataBase);
      });
      /////////////////////////////////////////////////////////////Get all users from allusers array and sorted by alphabetically
    } else if (method == "GET" && url == "/getalluserssorted") {
      const sortedUsers = allusers.sort((a, b) => a.name.localeCompare(b.name));
      res.write(JSON.stringify(sortedUsers));
      res.end();

      ///////////////////////////////////////////////////////////////////////////////////////////delete user by sending user id
    } else if (method == "DELETE" && url == "/deleteuser") {
      let data = "";
      req.on("data", (chunk) => {
        data = chunk;
      });
      req.on("end", () => {
        const convertedUserData = JSON.parse(data);
        const userIndex = allusers.findIndex(
          (user) => user.id === convertedUserData.id
        );
        if (userIndex !== -1) {
          const dataDeleted = JSON.stringify(
            allusers.splice(userIndex, 1)[0].name
          );
          // const converted=JSON.stringify(dataDeleted)
          res.end(`${dataDeleted} is deleted successfully!`);
          console.log(allusers, dataDeleted);
        } else {
          res.end("User not found");
          console.log(allusers);
        }
      });
      ////////////////////////////update by sending object contains id  that will be updated and also send new name and new age
    } else if (method == "PUT" && url == "/updateuser") {
      let data = "";
      req.on("data", (chunk) => {
        data = chunk;
      });
      req.on("end", () => {
        const convertedUserData = JSON.parse(data);
        const userId = convertedUserData.id;
        const updatedname = convertedUserData.name;
        const updatedage = convertedUserData.age;
        const userIndex = allusers.findIndex((user) => user.id === userId);

        if (userIndex !== -1) {
          allusers[userIndex].name = updatedname;
          allusers[userIndex].age = updatedage;
          res.end("User is updated successfully!");
          console.log(allusers);
        } else {
          res.end("User not found");
        }
      });
      /////////////////////////////////////////////////////////////////////////////////////search by sending object contains id
    } else if (method == "POST" && url == "/searchbyname") {
      let data = "";
      req.on("data", (chunk) => {
        data = chunk;
      });
      req.on("end", () => {
        const searchData = JSON.parse(data);
        const id = searchData.id;

        // Filter users based on the provided id
        const filteredUsers = allusers.filter((user) => user.id == id);
        console.log(filteredUsers);

        if (filteredUsers.length > 0) {
          const users = JSON.stringify(filteredUsers);
          res.end(`Search Results: ${users}`);
        } else {
          res.end("No users founded with that id");
        }
      });
      /////////////////////////////////////////working in posts same functionality of user/////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////////////////Get all posts from posts array
    } else if (method == "GET" && url == "/GetAllPosts") {
      const convertedPostsData = JSON.stringify(posts);
      res.write(convertedPostsData);
      res.end();
      /////////////////////////////////////////////////////////////////////////////////////////////add new post into new array
    } else if (method == "POST" && url == "/AddPost") {
      let post;
      req.on("data", (data) => {
        post = data;
      });
      req.on("end", () => {
        const convertData = JSON.parse(post);
        const { content } = convertData;
        postsDataBase.push({ content, id: Math.random() });
        res.end("Post is successfully Added");
        console.log(postsDataBase);
      });
      /////////////////////////////////////////////////////////////////////////////////////////////display all post in reverse
    } else if (method == "GET" && url == "/reversedPosts") {
      const reversedPosts = posts.reverse();
      const convertedPostsData = JSON.stringify(reversedPosts);
      res.write(convertedPostsData);
      res.end();
      ///////////////////////////////////////////////////////////////////////////////////////////////////////delete post by id
    } else if (method == "DELETE" && url == "/deletePost") {
      let id;
      req.on("data", (data) => {
        id = data;
      });
      req.on("end", () => {
        const convertedPostsData = JSON.parse(id);
        const postIndex = posts.findIndex(
          (post) => post.id === convertedPostsData.id
        );
        if (postIndex !== -1) {
          const deletedPost = JSON.stringify(
            posts.splice(postIndex, 1)[0].content
          );
          res.end(`post => ${deletedPost} is deleted successfully!! `);
          console.log(posts);
        } else {
          res.end("Post not found");
          console.log(allusers);
        }
      });
      ///////////////////////////////////////update post by sending an object that contains content and id that will be deleted
    } else if (method == "POST" && url == "/updatePost") {
      let data;
      req.on("data", (chunk) => {
        data = chunk;
      });
      req.on("end", () => {
        const convertedPost = JSON.parse(data);
        const updatedContent = convertedPost.content;
        const postId = convertedPost.id;
        const postIndex = posts.findIndex((post) => post.id == postId);
        if (postIndex !== -1) {
          posts[postIndex].content = updatedContent;
          res.end("Post is updated successfully!");
          console.log(posts);
        } else {
          res.end("Post not found");
        }
      });
      /////////////////////////////////////////////////////////////////////////////////////////////////search for specific posts
    } else if (method == "POST" && url == "/searchposts") {
      let data = "";
      req.on("data", (chunk) => {
        data = chunk;
      });
      req.on("end", () => {
        const searchData = JSON.parse(data);
        const id = searchData.id;

        // Filter users based on the provided id
        const filteredUsers = allusers.filter((user) => user.id == id);
        console.log(filteredUsers);

        if (filteredUsers.length > 0) {
          const users = JSON.stringify(filteredUsers);
          res.end(`Search Results: ${users}`);
        } else {
          res.end("No users founded with that id");
        }
      });
    }else{
      res.end("404 not found");
    }
  })
  .listen(5000, () => {
    console.log("listening on port");
  });

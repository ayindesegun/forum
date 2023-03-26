const express = require("express");
const cors = require("cors");
const PORT = 5000;
const app = express();

//middleware
app.use(cors());
app.use(express.json());

const users = [];
const generateID = () => Math.random().toString(36).substring(2, 10);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to my backend system",
  });
});

app.post("/api/register", async (req, res) => {
  const { email, password, username } = req.body;
  const id = generateID();
  const result = users.filter(
    (user) => user.email === email && user.password === password
  );
  //👇🏻 if true
  if (result.length === 0) {
    const newUser = { id, email, password, username };
    //👇🏻 adds the user to the database (array)
    users.push(newUser);
    //👇🏻 returns a success message
    return res.json({
      message: "Account created successfully!",
    });
  }
  //👇🏻 if there is an existing user
  res.json({
    error_message: "User already exists",
  });

  console.log({ id, email, password, username });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  //👇🏻 checks if the user exists
  let result = users.filter(
    (user) => user.email === email && user.password === password
  );
  //👇🏻 if the user doesn't exist
  if (result.length !== 1) {
    return res.json({
      error_message: "Incorrect credentials",
    });
  }
  //👇🏻 Returns the id if successfuly logged in
  res.json({
    message: "Login successfully",
    id: result[0].id,
  });
});

//👇🏻 holds all the posts created
const threadList = [];

app.post("/api/create/thread", async (req, res) => {
  const { thread, userId } = req.body;
  const threadId = generateID();

  //👇🏻 add post details to the array
  threadList.unshift({
    id: threadId,
    title: thread,
    userId,
    replies: [],
    likes: [],
  });

  //👇🏻 Returns a response containing the posts
  res.json({
    message: "Thread created successfully!",
    threads: threadList,
  });
});
app.get("/api/all/threads", (req, res) => {
  res.json({
    threads: threadList,
  });
});

app.post("/api/thread/like", (req, res) => {
  //👇🏻 accepts the post id and the user id
  const { threadId, userId } = req.body;
  //👇🏻 gets the reacted post
  const result = threadList.filter((thread) => thread.id === threadId);
  //👇🏻 gets the likes property
  const threadLikes = result[0].likes;
  //👇🏻 authenticates the reaction
  const authenticateReaction = threadLikes.filter((user) => user === userId);
  //👇🏻 adds the users to the likes array
  if (authenticateReaction.length === 0) {
    threadLikes.push(userId);
    return res.json({
      message: "You've reacted to the post!",
    });
  }
  //👇🏻 Returns an error user has reacted to the post earlier
  res.json({
    error_message: "You can only react once!",
  });
});

app.post("/api/thread/replies", (req, res) => {
  //👇🏻 The post ID
  const { id } = req.body;
  //👇🏻 searches for the post
  const result = threadList.filter((thread) => thread.id === id);
  //👇🏻 return the title and replies
  res.json({
    replies: result[0].replies,
    title: result[0].title,
  });
});

app.post("/api/create/reply", async (req, res) => {
    //👇🏻 accepts the post id, user id, and reply
    const { id, userId, reply } = req.body;
    //👇🏻 search for the exact post that was replied to
    const result = threadList.filter((thread) => thread.id === id);
    //👇🏻 search for the user via its id
    const user = users.filter((user) => user.id === userId);
    //👇🏻 saves the user name and reply
    result[0].replies.unshift({
        userId: user[0].id,
        name: user[0].username,
        text: reply,
    });

    res.json({
        message: "Response added successfully!",
    });
});

app.listen(PORT, () => console.log(`App is alive and Jiggy on PORT ${PORT}`));

const express = require("express");
const { userdata } = require("./mongo");
const cors = require("cors");
const { generateFile, createInput } = require("./generateFile");
const { executeCpp } = require("./executeCpp");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS for all routes

app.get("/", (req, res) => {
  res.send("Welcome to the homepage");
});

app.post("/run", async (req, res) => {
  const { language = "cpp", code, input } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, error: "Empty code!" });
  }

  try {
    const filePath = await generateFile(language, code);
    const inPath = await createInput(input);
    console.log(filePath);
    console.log(inPath);
    const output = await executeCpp(filePath, inPath);

    res.json({ output });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userdata.findOne({ email: email });

    if (user) {
      if (user.password === password) {
        res.json({ status: "success", email: user.email });
      } else {
        res.json({ status: "incorrect_password" });
      }
    } else {
      res.json({ status: "user_not_found" });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: "fail", message: "An error occurred while processing your request." });
  }
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const data = {
    email: email,
    password: password,
  };

  try {
    const check = await userdata.findOne({ email: email });

    if (check) {
      res.json({ status: "exist" });
    } else {
      await userdata.create(data);
      res.json({ status: "success" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail" });
  }
});

const port = 8001;
app.listen(port, () => {
  console.log(`Server connected on port ${port}`);
});

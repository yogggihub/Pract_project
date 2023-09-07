const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const server = jsonServer.create();
const userdb = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());
const SECRET_KEY = "72676376";
const expiresIn = "1h";

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function isLoginAuthenticated({ email, password }) {
  return (
    userdb.users.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  );
}
function loginUserId({ email }) {
  return userdb.users.find((item) => item.email === email);
}

function isRegisterAuthenticated({ email }) {
  return userdb.users.findIndex((user) => user?.email === email) !== -1;
}
// For Register User EndPoint
server.post("/api/auth/register", (req, res) => {
  // Received details from AXIO.POSt
  const {
    userRole,
    firstName,
    lastName,
    gender,
    birthDay,
    mobile,
    email,
    address,
    city,
    state,
    country,
    password,
  } = req.body;
  if (isRegisterAuthenticated({ email })) {
    const status = 401;
    const message = "Email already exist";
    res.status(status).json({ status, message });
    return;
  }

  fs.readFile("./db.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }
    data = JSON.parse(data.toString());
    let last_item_id = data.users[data.users.length - 1].id;
    data.users.push({
      id: last_item_id + 1,
      email: email,
      password: password,
      userRole: userRole,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      birthDay: birthDay,
      mobile: mobile,
      email: email,
      address: address,
      city: city,
      state: state,
      country: country,
      password: password,
    });
    let writeData = fs.writeFile(
      "./db.json",
      JSON.stringify(data),
      (err, result) => {
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({ status, message });
          return;
        }
      }
    );
  });
  res.status(200).json();
});
// For Login User EndPoint
server.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!isLoginAuthenticated({ email, password })) {
    const status = 401;
    const message = "Incorrect Email or Password";
    res.status(status).json({ status, message });
    return;
  }
  const access_token = createToken({ email, password });
  const { id, userRole } = loginUserId({ email });
  res.status(200).json({ access_token, id, userRole });
});
// For get All Users EndPoint
server.get("/api/auth/get", (req, res) => {
  const { email, password } = req.body;
  let { users } = userdb;
  res.status(200).json({ users });
});

// For get Login Users EndPoint
server.get("/api/auth/get/:id", (req, res) => {
  const { email, password } = req.body;
  const { id } = req.params;
  let userdata = userdb.users.filter((user) => user.id == id);
  const users = userdata;
  res.status(200).json({ users });
});

// For delete selected User EndPoint
server.delete("/api/auth/delete/:id", (req, res) => {
  // get data from body
  const { email, password } = req.body;
  // get id from URL
  const { id } = req.params;
  fs.readFile("./db.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }
    data = JSON.parse(data.toString());
    let index = data.users.findIndex((item) => item.id === id);
    data.users.splice(index, 1);
    let writeData = fs.writeFile(
      "./db.json",
      JSON.stringify(data),
      (err, result) => {
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({ status, message });
          return;
        }
      }
    );
  });
  res.status(200).json({ id });
});
// update date
server.put("/api/auth/put/:id", (req, res) => {
  // Received details from AXIO.PUT
  const { id } = req.params;
  const {
    userRole,
    firstName,
    lastName,
    gender,
    birthDay,
    mobile,
    email,
    address,
    city,
    state,
    country,
    password,
  } = req.body;
  const index = userdb.users.findIndex((user) => user?.id == id);
  let writeData;
  fs.readFile("./db.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }
    data = JSON.parse(data.toString());
    data.users[index] = {
      ...data.users[index],
      ...{
        email: email,
        password: password,
        userRole: userRole,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        birthDay: birthDay,
        mobile: mobile,
        email: email,
        address: address,
        city: city,
        state: state,
        country: country,
        password: password,
      },
    };
    writeData = fs.writeFile(
      "./db.json",
      JSON.stringify(data),
      (err, result) => {
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({ status, message });
          return;
        }
      }
    );
  });
  let rawdata = fs.readFileSync("./db.json");
  const user = JSON.parse(rawdata).users.filter((user) => user.id == id);
  res.status(200).json({ user: user });
});
server.listen(5000, () => {
  console.log("Running fake api json server");
});

const users = {};
const respondJSON = (req, res, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  res.writeHead(status, headers);
  res.write(JSON.stringify(object));
  res.end();
};

const respondJSONMeta = (req, res, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  res.writeHead(status, headers);
  res.end();
};

const getUsers = (req, res) => {
  const json = { users };
  return respondJSON(req, res, 200, json);
};

const getUsersMeta = (req, res) => respondJSONMeta(req, res, 200);

const updateUsers = (req, res) => {
  const newUser = {
    createdAt: Date.now(),
  };
  users[newUser.createdAt] = newUser;
  return respondJSON(req, res, 201, newUser);
};

const updateUsersMeta = (req, res) => respondJSONMeta(req, res, 200);

const notFound = (req, res) => {
  const json = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };
  return respondJSON(req, res, 404, json);
};
const notFoundMeta = (req, res) => respondJSONMeta(req, res, 404);

const addUser = (req, res, body) => {
  const json = {
    message: 'Name and age are both required',
  };

  // check for name and age params
  if (!body.name || !body.age) {
    json.id = 'missingParams';
    return respondJSON(req, res, 400, json);
  }

  let responseCode = 201; // created

  if (users[body.name]) {
    responseCode = 204; // updated
    json.message = '';
  } else {
    users[body.name] = {};
    json.message = 'Created Successfully';
  }

  users[body.name].name = body.name;
  users[body.name].age = body.age;

  if (responseCode === 201) {
    return respondJSON(req, res, responseCode, json);
  }
  return respondJSONMeta(req, res, responseCode);
};
const addUserMeta = (req, res) => respondJSON(req, res, 200);

module.exports = {
  getUsers,
  getUsersMeta,
  updateUsers,
  updateUsersMeta,
  notFound,
  notFoundMeta,
  addUser,
  addUserMeta,
};

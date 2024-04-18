const asyncHandler = require("express-async-handler");
const { StreamChat } = require("stream-chat");

require("dotenv").config();

// Validation Schemas
const {
  userSignupSchema,
  userLoginSchema,
} = require("../validationSchema/user");


console.log('process.env.STREAM_API_KEY', process.env.STREAM_API_KEY);
const streamChat = StreamChat.getInstance(
  process.env.STREAM_API_KEY,
  process.env.STREAM_PRIVATE_API_KEY
);

const TOKEN_USER_ID_MAP = new Map();

// @desc		Register new user
// @route		/api/users
// @access		Public
const registerUser = asyncHandler(async (req, res) => {
  const { error, value } = await userSignupSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(422).json({ error: error.details });
  }
  const { id, name, image } = value;


  const existingUsers = await streamChat.queryUsers({ id });

  if (existingUsers.users.length > 0) {
    res.status(400);
    throw new Error("User ID Taken");
  }

  await streamChat.upsertUser({ id, name, image });
});

// @desc		Login existing user
// @route		/api/users/login
// @access		Public
const loginUser = asyncHandler(async (req, res) => {
  const { error, value } = userLoginSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(422).json({ error: error.details });
  }

  const { id } = value;

  const {
    users: [user],
  } = await streamChat.queryUsers({ id })
  if (user == null) return res.status(401).send()

  const token = streamChat.createToken(id)
  TOKEN_USER_ID_MAP.set(token, user.id)

  res.status(200).json({
    token,
    user: { name: user.name, id: user.id, image: user.image },
    message: "User login successfully",
  });
  

});

module.exports = { registerUser, loginUser };

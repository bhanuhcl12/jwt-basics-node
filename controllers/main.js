const { BadRequestError} = require("../errors");
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError('Please provide username and password')
  }

  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })

  res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
  const random = Math.floor(Math.random() * 100)
  res.status(200).json({ msg: `Hello, ${req.user.username}`, secret: `This is your secret number: ${random}` })
  
}

module.exports = {
  login,
  dashboard
}
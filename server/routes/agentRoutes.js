const express = require('express');
const router = express.Router();
const Agent = require('../models/Agent');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');

// get all
router.get('/', auth, async (req, res) => {
  const agents = await Agent.find();
  res.json(agents);
});

// add
router.post('/', auth, async (req, res) => {
  const { name, email, mobile, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const agent = new Agent({ name, email, mobile, password: hash });
  await agent.save();
  res.json({ msg: "Agent added" });
});

module.exports = router;

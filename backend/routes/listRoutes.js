const express = require('express');
const router = express.Router();
const multer = require('multer');
const csv = require('csv-parser');
const xlsx = require('xlsx');
const auth = require('../middleware/auth');
const Lead = require('../models/Lead');
const Agent = require('../models/Agent');
const fs = require('fs');

// upload config
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', auth, upload.single('file'), async (req, res) => {
  const file = req.file;

  let data = [];

  // Parse CSV or Excel
  if (file.originalname.endsWith('.csv')) {
    const buffer = file.buffer.toString('utf8');
    buffer.split('\n').slice(1).forEach(line => {
      const [firstName, phone, notes] = line.split(',');
      if (firstName) data.push({ firstName, phone, notes });
    });
  } else if (file.originalname.match(/\.(xlsx|xls)$/)) {
    const workbook = xlsx.read(file.buffer);
    const sheet = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
    data = sheet.map(row => ({
      firstName: row.FirstName,
      phone: row.Phone,
      notes: row.Notes
    }));
  } else {
    return res.status(400).json({ msg: "Invalid file type" });
  }

  // ...existing code...
  if (!data.length) return res.status(400).json({ msg: "No valid rows" });

  const agents = await Agent.find({ adminId: req.user.id });

  
  const agentCount = agents.length;
const chunk = Math.floor(data.length / agentCount);
const remainder = data.length % agentCount;

for (let i = 0; i < agentCount; i++) {
  const start = i * chunk + Math.min(i, remainder);
  const end = start + chunk + (i < remainder ? 1 : 0);

  const batch = data.slice(start, end).map(row => ({
    ...row,
    agentId: agents[i]._id,
    adminId: req.user.id
  }));

  if (batch.length) {
    await Lead.insertMany(batch);
  }
}
  res.json({ msg: "Leads uploaded successfully" });
})
// ...existing code...

// view leads by agent
router.get('/', auth, async (req, res) => {
  const leads = await Lead.find().populate('agentId', 'name email');
  res.json(leads);
});

module.exports = router;

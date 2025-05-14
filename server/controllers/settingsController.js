const Setting = require('../models/Setting');

exports.getAll = async (req, res) => {
  const settings = await Setting.findAll();
  const obj = {};
  settings.forEach(s => {
    try {
      obj[s.key] = JSON.parse(s.value);
    } catch {
      obj[s.key] = s.value;
    }
  });
  res.json(obj);
};

exports.update = async (req, res) => {
  const entries = Object.entries(req.body);
  for (const [key, val] of entries) {
    await Setting.upsert({
      key,
      value: typeof val === 'object' ? JSON.stringify(val) : String(val)
    });
  }
  res.json({ success: true });
};

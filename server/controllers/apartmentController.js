const Apartment = require('../models/Apartment');

// GET all apartments
exports.getAll = async (req, res) => {
  const apartments = await Apartment.findAll({
    order: [['id', 'DESC']]
  });
  res.json(apartments);
};

// GET one apartment
exports.getOne = async (req, res) => {
  const apartment = await Apartment.findById(req.params.id);
  if (!apartment) return res.status(404).json({ error: 'Not found' });
  res.json(apartment);
};

// POST new apartment
exports.create = async (req, res) => {
  const data = req.body;
  const apt = new Apartment(data);
  await apt.save();
  res.status(201).json(apt);
};

// PUT /api/apartments/:id
exports.update = async (req, res) => {
  await Apartment.update(req.body, { where: { id: req.params.id } });
  res.json({ success: true });
};

// DELETE /api/apartments/:id
exports.remove = async (req, res) => {
  await Apartment.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
};


const Apartment = require('../models/Apartment');
const Invoice = require('../models/Invoice');

exports.listByApartment = async (req, res) => {
  const { apartmentId } = req.params;
  const invoices = await Invoice.findAll({
    where: { apartment_id: apartmentId },
    order: [['invoice_date', 'DESC']],
    include: [{ model: Apartment, as: 'apartment'}, 'meterReading']
  });
  res.json(invoices);
};

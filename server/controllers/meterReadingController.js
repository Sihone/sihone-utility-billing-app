const MeterReading = require('../models/MeterReading');
const Invoice = require('../models/Invoice');
const Setting = require('../models/Setting');

exports.create = async (req, res) => {
  const { apartment_id, reading_date, meter_index } = req.body;

  const newReading = await MeterReading.create({ apartment_id, reading_date, meter_index });

  // Find previous reading before this one
  const previousReading = await MeterReading.findOne({
    where: {
      apartment_id,
      reading_date: { [Op.lt]: reading_date },
      meter_index: { [Op.lt]: meter_index }
    },
    order: [['id', 'DESC']]
  });

  if (previousReading) {
    const startIndex = previousReading.meter_index;
    const endIndex = newReading.meter_index;
    const consumption = endIndex - startIndex;

    const fixedFee = parseInt(await getSettingValue('fixed_fee'));
    const ratePerM3 = parseInt(await getSettingValue('rate_per_m3'));
    const amount = fixedFee + (ratePerM3 * consumption);

    await Invoice.create({
      apartment_id,
      meter_reading_id: newReading.id,
      start_index: startIndex,
      end_index: endIndex,
      consumption,
      amount,
      invoice_date: reading_date,
      fixed_fee_used: fixedFee,
      rate_per_m3_used: ratePerM3,
      registration_fee: 0,
    });

  } else {
    const regFee = parseInt(await getSettingValue('registration_fee'));

    await Invoice.create({
      apartment_id,
      meter_reading_id: newReading.id,
      start_index: meter_index,
      end_index: meter_index,
      consumption: 0,
      amount: 0,
      invoice_date: reading_date,
      fixed_fee_used: 0,
      rate_per_m3_used: 0,
      registration_fee: regFee,
    });
  }

  res.status(201).json(newReading);
};

exports.listByApartment = async (req, res) => {
  const { apartmentId } = req.params;
  const readings = await MeterReading.findAll({
    where: { apartment_id: apartmentId },
    order: [['reading_date', 'DESC']],
  });
  res.json(readings);
};

exports.remove = async (req, res) => {
  const readingId = req.params.id;
  await MeterReading.destroy({ where: { id: readingId } });
  res.json({ success: true });
};


async function getSettingValue(key) {
  const setting = await Setting.findByPk(key);
  if (!setting) throw new Error(`Missing setting: ${key}`);
  try {
    return JSON.parse(setting.value);
  } catch {
    return setting.value;
  }
}

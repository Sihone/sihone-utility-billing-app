export default function getInvoicePreview(invoice, allInvoices = [], settings = {}) {
  if (!invoice) return '';
  const today = new Date().toLocaleDateString();
  const waterCharge = invoice.consumption * invoice.rate_per_m3_used;

  const paymentDetailsHtml = Object.entries(settings.payment_options || {}).map(
    ([key, value]) => `<strong>${key}:</strong> ${value}<br/>`
  ).join('');

  const fixed_fee = invoice.fixed_fee_used
    ? `<tr><td>Fixed Fee</td><td>1</td><td style="text-align:right;">${invoice.fixed_fee_used.toLocaleString()} FCFA</td><td style="text-align:right;">${invoice.fixed_fee_used.toLocaleString()} FCFA</td></tr>`
    : '';

  const consumption = invoice.consumption
    ? `<tr><td>Water Consumption</td><td>${invoice.consumption} m³</td><td style="text-align:right;">${invoice.rate_per_m3_used}</td><td style="text-align:right;">${waterCharge}</td></tr>`
    : '';

  const registration_fee = invoice.registration_fee
    ? `<tr><td>Registration Fee</td><td>1</td><td style="text-align:right;">${invoice.registration_fee.toLocaleString()} FCFA</td><td style="text-align:right;">${invoice.registration_fee.toLocaleString()} FCFA</td></tr>`
    : '';

  let totalPaid = 0;
  let payments = '';
  invoice.apartment?.payments?.forEach(payment => {
    totalPaid += payment.amount;
    payments += `<tr><td>${payment.payment_date}</td><td style="text-align:right;">${payment.amount.toLocaleString()} FCFA</td></tr>`;
  });

  const previousBillBalance = allInvoices.reduce((acc, inv) => {
    if (inv.apartment.id === invoice.apartment.id && inv.id < invoice.id) {
      return acc + (inv.registration_fee || 0) + (inv.amount || 0);
    }
    return acc;
  }, 0);

  const totalAmount = waterCharge + invoice.fixed_fee_used + invoice.registration_fee;
  const totalDue = totalAmount + previousBillBalance - totalPaid;

  const html = `
    <html>
    <head>
      <title>Invoice</title>
      <style>
        body { font-family: Arial; padding: 30px; }
        .header { text-align: center; }
        .charges, .payment-info, .footer { margin-top: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid #ccc; padding: 8px; }
        th { background: #f0f0f0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Utility Management Services</h1>
        <p>INVOICE</p>
      </div>

      <div class="details">
        <strong>Invoice Date:</strong> ${today}<br/>
        <strong>Apartment:</strong> ${invoice.apartment.name}<br/>
      </div>

      <div class="charges">
        <h3>Meter Readings</h3>
        <table>
          <tr><th>Start</th><th>End</th><th>Consumption (m³)</th></tr>
          <tr><td>${invoice.start_index}</td><td>${invoice.end_index}</td><td>${invoice.consumption}</td></tr>
        </table>

        <h3>Charges</h3>
        <table>
          <tr><th>Description</th><th>Unit</th><th>Rate</th><th>Amount</th></tr>
          ${consumption}
          ${fixed_fee}
          ${registration_fee}
          <tr><td colspan="3">Total Charges</td><td style="text-align:right;">${totalAmount.toLocaleString()} FCFA</td></tr>
          <tr><td colspan="3">Previous Bill Balance</td><td style="text-align:right;">${previousBillBalance.toLocaleString()} FCFA</td></tr>
        </table>
      </div>

      <div class="payment-info">
        <h3>Payments</h3>
        <table>${payments}<tr><th>Total Paid:</th><th style="text-align:right;">${totalPaid.toLocaleString()} FCFA</th></tr></table>
        <h3>Balance</h3>
        <table><tr><th>Total Due:</th><th style="text-align:right;">${totalDue.toLocaleString()} FCFA</th></tr></table>
        <h3>Payment Instructions</h3>
        <p>${paymentDetailsHtml}</p>
      </div>

      <div class="footer">Thank you for trusting our services. Contact: 696509794</div>
      <script>window.print();<\/script>
    </body>
    </html>
  `;

  return html;
}

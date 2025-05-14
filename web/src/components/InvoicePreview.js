// client/src/components/InvoicePreview.js
import React from 'react';

export default function InvoicePreview({ html }) {
  return (
    <div
      id="invoice-preview"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

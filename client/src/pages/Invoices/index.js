import React, { useEffect, useState } from 'react';
import {
  Box, Typography, MenuItem, TextField,
  Dialog, DialogContent, DialogTitle, DialogActions, Button
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { IconButton } from '@mui/material';
import getInvoicePreview from '../../utils/getInvoicePreview';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InvoicePreview from '../../components/InvoicePreview';

export default function InvoicesPage() {
  const [apartments, setApartments] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [invoices, setInvoices] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [settings, setSettings] = useState({
    fixed_fee: '',
    rate_per_m3: '',
    registration_fee: '',
    payment_options: {}
  });

  useEffect(() => {
    axios.get('/api/settings').then(res => {
      setSettings(prev => ({ ...prev, ...res.data }));
    });
  }, []);


  useEffect(() => {
    axios.get('/api/apartments').then(res => setApartments(res.data));
  }, []);

  useEffect(() => {
    if (selectedId) {
      axios.get(`/api/invoices/${selectedId}`).then(res => setInvoices(res.data));
    }
  }, [selectedId]);

  const columns = [
    { field: 'invoice_date', headerName: 'Date', flex: 1 },
    { field: 'start_index', headerName: 'Start', flex: 1 },
    { field: 'end_index', headerName: 'End', flex: 1 },
    { field: 'consumption', headerName: 'Consumption (m³)', flex: 1 },
    { field: 'fixed_fee_used', headerName: 'Fixed Fee', flex: 1 },
    { field: 'rate_per_m3_used', headerName: 'Rate/m³', flex: 1 },
    { field: 'registration_fee', headerName: 'Reg Fee', flex: 1 },
    { field: 'amount', headerName: 'Total Amount', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <IconButton color="primary" onClick={() => {
          setSelectedInvoice(params.row);
          setPreviewOpen(true);
        }}>
          <VisibilityIcon />
        </IconButton>
      )
    }
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Invoices</Typography>

      <TextField
        select fullWidth label="Select Apartment"
        value={selectedId}
        onChange={e => setSelectedId(e.target.value)}
        sx={{ mb: 2 }}
      >
        {apartments.map(ap => (
          <MenuItem key={ap.id} value={ap.id}>{ap.name}</MenuItem>
        ))}
      </TextField>

      {selectedId && (
        <Box sx={{ height: 500 }}>
          <DataGrid rows={invoices} columns={columns} getRowId={row => row.id} />
        </Box>
      )}
      
      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        fullScreen
      >

        <DialogContent>
          <div id="invoice-preview">
            <InvoicePreview html={getInvoicePreview(selectedInvoice, invoices, settings)} />
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)}>Close</Button>
          <Button
            variant="contained"
            onClick={() => {
              const printContent = document.getElementById('invoice-preview');
              const printWindow = window.open('', '', 'width=900,height=650');
              printWindow.document.write(`<html><head><title>Invoice</title></head><body>${printContent.innerHTML}</body></html>`);
              printWindow.document.close();
              printWindow.focus();
              printWindow.print();
            }}
          >
            Print
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

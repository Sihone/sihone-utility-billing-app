import React, { useEffect, useState } from 'react';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, IconButton, Typography, DialogContentText
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

export default function ApartmentsPage() {
  const [apartments, setApartments] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [current, setCurrent] = useState(null); // current editing or deleting
  const [form, setForm] = useState({ name: '', location: '', tenant_name: '', tenant_phone: '', tenant_email: '' });
  const [apartmentLoading, setApartmentLoading] = useState(false);

  const loadApartments = async () => {
    setApartmentLoading(true);
    const res = await axios.get('/api/apartments');
    setApartments(res.data);
    setApartmentLoading(false);
  };

  useEffect(() => { loadApartments(); }, []);

  const handleOpenForm = (apt = null) => {
    setCurrent(apt);
    setForm(apt || { name: '', location: '', tenant_name: '', tenant_phone: '', tenant_email: '' });
    setOpenForm(true);
  };

  const handleSubmit = async () => {
    if (current) {
      await axios.put(`/api/apartments/${current.id}`, form);
    } else {
      await axios.post('/api/apartments', form);
    }
    setOpenForm(false);
    loadApartments();
  };

  const handleDelete = async () => {
    await axios.delete(`/api/apartments/${current.id}`);
    setOpenConfirm(false);
    loadApartments();
  };

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'location', headerName: 'Location', flex: 1 },
    { field: 'tenant_name', headerName: 'Tenant', flex: 1 },
    { field: 'tenant_phone', headerName: 'Phone', flex: 1 },
    {
      field: 'actions', headerName: 'Actions', flex: 1, sortable: false, renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleOpenForm(params.row)}>
            <Edit />
          </IconButton>
          <IconButton color="error" onClick={() => { setCurrent(params.row); setOpenConfirm(true); }}>
            <Delete />
          </IconButton>
        </>
      )
    }
  ];

  return (
    <Box>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom>Apartments</Typography>
        <Button variant="contained" onClick={() => handleOpenForm()} sx={{ mb: 2 }}>Add Apartment</Button>
      </div>
      <Box sx={{ height: 600 }}>
        <DataGrid loading={apartmentLoading} rows={apartments} columns={columns} getRowId={(row) => row.id} />
      </Box>

      {/* Add/Edit Modal */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>{current ? 'Edit Apartment' : 'Add Apartment'}</DialogTitle>
        <DialogContent>
          {Object.keys(form).map((k) => (
            <TextField
              key={k}
              margin="dense"
              label={k.replace('_', ' ').toUpperCase()}
              name={k}
              value={form[k]}
              onChange={(e) => setForm({ ...form, [k]: e.target.value })}
              fullWidth
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Delete Apartment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete <b>{current?.name}</b>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

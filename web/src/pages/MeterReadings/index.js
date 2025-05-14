import React, { useEffect, useState } from 'react';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, MenuItem, Typography, IconButton, DialogContentText
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Delete } from '@mui/icons-material';
import axios from 'axios';

export default function ReadingsPage() {
  const [apartments, setApartments] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [readings, setReadings] = useState([]);

  const [formOpen, setFormOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [newReading, setNewReading] = useState({ reading_date: '', meter_index: '' });
  const [selectedReading, setSelectedReading] = useState(null);

  const loadApartments = async () => {
    const res = await axios.get('/api/apartments');
    setApartments(res.data);
  };

  const loadReadings = async () => {
    if (!selectedId) return;
    const res = await axios.get(`/api/readings/${selectedId}`);
    setReadings(res.data);
  };

  useEffect(() => { loadApartments(); }, []);
  useEffect(() => { loadReadings(); }, [selectedId]);

  const handleSubmit = async () => {
    await axios.post('/api/readings', {
      apartment_id: selectedId,
      ...newReading
    });
    setFormOpen(false);
    setNewReading({ reading_date: '', meter_index: '' });
    loadReadings();
  };

  const handleDelete = async () => {
    await axios.delete(`/api/readings/${selectedReading.id}`);
    setConfirmOpen(false);
    loadReadings();
  };

  const columns = [
    { field: 'reading_date', headerName: 'Date', flex: 1 },
    { field: 'meter_index', headerName: 'Index', flex: 1 },
    {
      field: 'actions', headerName: 'Actions', flex: 1, renderCell: (params) => (
        <IconButton color="error" onClick={() => {
          setSelectedReading(params.row);
          setConfirmOpen(true);
        }}>
          <Delete />
        </IconButton>
      )
    }
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Meter Readings</Typography>

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
        <>
          <Button variant="contained" sx={{ mb: 2 }} onClick={() => setFormOpen(true)}>
            Add Reading
          </Button>

          <Box sx={{ height: 450 }}>
            <DataGrid rows={readings} columns={columns} getRowId={r => r.id} />
          </Box>
        </>
      )}

      {/* Add Reading Modal */}
      <Dialog open={formOpen} onClose={() => setFormOpen(false)}>
        <DialogTitle>New Meter Reading</DialogTitle>
        <DialogContent>
          <TextField
            label="Reading Date" type="date"
            name="reading_date"
            fullWidth margin="dense"
            value={newReading.reading_date}
            onChange={e => setNewReading({ ...newReading, reading_date: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Meter Index"
            name="meter_index"
            fullWidth margin="dense"
            type="number"
            value={newReading.meter_index}
            onChange={e => setNewReading({ ...newReading, meter_index: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Delete Reading</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Delete reading from <b>{selectedReading?.reading_date}</b>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

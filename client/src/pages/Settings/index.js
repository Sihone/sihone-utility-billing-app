import React, { useEffect, useState } from 'react';
import {
  Box, Button, TextField, Typography, Grid, Snackbar, IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    fixed_fee: '',
    rate_per_m3: '',
    registration_fee: '',
    payment_options: {}
  });

  const [snackOpen, setSnackOpen] = useState(false);

  useEffect(() => {
    axios.get('/api/settings').then(res => {
      setSettings(prev => ({ ...prev, ...res.data }));
    });
  }, []);

  const handleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      payment_options: { ...prev.payment_options, [key]: value }
    }));
  };

  const handleAddPaymentOption = () => {
    setSettings(prev => ({
      ...prev,
      payment_options: { ...prev.payment_options, '': '' }
    }));
  };

  const handleRemovePaymentOption = (keyToRemove) => {
    const updated = { ...settings.payment_options };
    delete updated[keyToRemove];
    setSettings(prev => ({
      ...prev,
      payment_options: updated
    }));
  };

  const handleSubmit = async () => {
    await axios.put('/api/settings', settings);
    setSnackOpen(true);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>System Settings</Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        {['fixed_fee', 'rate_per_m3', 'registration_fee'].map(field => (
          <Grid item xs={12} md={4} key={field}>
            <TextField
              fullWidth
              label={field.replace('_', ' ').toUpperCase()}
              value={settings[field]}
              onChange={e => handleChange(field, e.target.value)}
            />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6">Payment Options</Typography>

      {Object.entries(settings.payment_options || {}).map(([key, value], index) => (
        <Grid container spacing={1} key={index} sx={{ mb: 1 }}>
          <Grid item xs={5}>
            <TextField
              label="Label"
              fullWidth
              value={key}
              onChange={e => {
                const updated = { ...settings.payment_options };
                const newKey = e.target.value;
                updated[newKey] = updated[key];
                delete updated[key];
                setSettings(prev => ({ ...prev, payment_options: updated }));
              }}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              label="Value"
              fullWidth
              value={value}
              onChange={e => handlePaymentChange(key, e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton onClick={() => handleRemovePaymentOption(key)}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      <Button startIcon={<AddIcon />} onClick={handleAddPaymentOption} sx={{ mb: 2 }}>
        Add Payment Option
      </Button>

      <Box>
        <Button variant="contained" onClick={handleSubmit}>Save Settings</Button>
      </Box>

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        message="Settings saved successfully"
      />
    </Box>
  );
}

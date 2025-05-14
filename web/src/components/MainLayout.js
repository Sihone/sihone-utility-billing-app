import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { Outlet, NavLink } from 'react-router-dom';

const navLinkStyle = ({ isActive }) => ({
  color: isActive ? '#ffd700' : 'white',
  marginLeft: 20,
  textDecoration: 'none',
  fontWeight: isActive ? 'bold' : 'normal',
  borderBottom: isActive ? '2px solid #ffd700' : 'none',
  paddingBottom: 2
});

export default function MainLayout() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Utility Billing
          </Typography>
          <Box>
            <NavLink to="/apartments" style={navLinkStyle}>Apartments</NavLink>
            <NavLink to="/readings" style={navLinkStyle}>Readings</NavLink>
            <NavLink to="/invoices" style={navLinkStyle}>Invoices</NavLink>
            <NavLink to="/settings" style={navLinkStyle}>Settings</NavLink>
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  );
}

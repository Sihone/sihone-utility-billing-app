import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import ApartmentsPage from './pages/Apartments';
import ReadingsPage from './pages/MeterReadings';
import InvoicesPage from './pages/Invoices';
import SettingsPage from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="apartments" element={<ApartmentsPage />} />
          <Route path="readings" element={<ReadingsPage />} />
          <Route path="invoices" element={<InvoicesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

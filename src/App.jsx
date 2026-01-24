import React from 'react';
import './styles/index.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import Settings from './pages/Settings.jsx';
import Profile from './pages/Profile.jsx';
import ResumeBuilder from './products/resumebuilder/ResumeBuilder.jsx';
import AtsChecker from './products/atschecker/AtsChecker.jsx';
import CoverLetter from './products/coverletter/CoverLetter.jsx';
import PayRollSystem from './products/payrollsystem/PayRollSystem.jsx';
import HelpDeskSystem from './products/helpdesksystem/HelpDeskSystem.jsx';
import AuditSystem from './products/auditsystem/AuditSystem.jsx';
import AptitudeMentor from './products/aptitudementor/AptitudeMentor.jsx';
import MockAssesment from './products/mockassesment/MockAssesment.jsx';
import MarketingSystem from './products/marketingsystem/MarketingSystem.jsx';
import VendorSystem from './products/vendorsystem/VendorSystem.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/resumebuilder/*" element={<ResumeBuilder />} />
      <Route path="/atschecker/*" element={<AtsChecker />} />
      <Route path="/coverletter/*" element={<CoverLetter />} />
      <Route path="/payrollsystem/*" element={<PayRollSystem />} />
      <Route path="/helpdesksystem/*" element={<HelpDeskSystem />} />
      <Route path="/auditsystem/*" element={<AuditSystem />} />
      <Route path="/aptitudementor/*" element={<AptitudeMentor />} />
      <Route path="/mockassesment/*" element={<MockAssesment />} />
      <Route path="/marketing/*" element={<MarketingSystem />} />
      <Route path="/vendorsystem/*" element={<VendorSystem />} />
    </Routes>
  );
}
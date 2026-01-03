// products/resumebuilder/ResumeBuilder.jsx
import React, { useEffect } from 'react';
import { authMe } from '../../lib/api.js';
import { Routes, Route } from 'react-router-dom';
import { ResumeProvider } from '../../contexts/ResumeContext';
import Resume from '../../pages/Resume';
import Write from '../../pages/Write';

const HowToDownload = () => (
  <div className="p-6">
    <h1 className="text-2xl font-semibold">How to download</h1>
    <p>Print this page using your browser's print dialog and save as PDF.</p>
  </div>
);

const Print = () => (
  <div className="p-0 m-0">
    <Resume />
  </div>
);

export default function ResumeBuilder() {
  useEffect(() => {
    (async () => {
      const me = await authMe();
      if (!me || me.role !== 'STUDENT') {
        window.location.href = '/login';
      }
    })();
  }, []);
  return (
    <ResumeProvider>
      <Routes>
        <Route path="/" element={<Write />} />
        <Route path="/how-to-download" element={<HowToDownload />} />
        <Route path="/print" element={<Print />} />
      </Routes>
    </ResumeProvider>
  );
}

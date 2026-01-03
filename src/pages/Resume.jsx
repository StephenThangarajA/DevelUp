import { useContext, useState } from 'react';
import { ResumeContext } from '../contexts/ResumeContext';
import { Button } from '../components/ui/button';
import ResumeContents from './ResumeContents';
import { downloadResumeAsPDF } from '../lib/pdfUtils';

const Resume = () => {
  const { handleSave } = useContext(ResumeContext);
  const [showSaved, setShowSaved] = useState(false);

  const handleSaveClick = () => {
    handleSave();
    setShowSaved(true);
    setTimeout(() => {
      setShowSaved(false);
    }, 2000);
  };

  const downloadPDF = (event) => {
    downloadResumeAsPDF(event);
  };

  return (
    <div className="md:w-1/2 w-full min-h-screen overflow-y-scroll border shadow-lg bg-zinc-100 px-5 pb-10">
      <div className="flex justify-end gap-4 pl-10 py-5 relative">
        <Button onClick={handleSaveClick} variant="outline">
          Save
        </Button>
        <Button onClick={downloadPDF}>Download</Button>
        {showSaved && (
          <span className="absolute right-0 top-16 bg-gray-700 text-white text-sm px-3 py-1 rounded shadow">
            Saved!
          </span>
        )}
      </div>
      <div>
        <ResumeContents />
      </div>
    </div>
  );
};

export default Resume;
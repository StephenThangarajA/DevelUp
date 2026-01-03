import { pdf } from '@react-pdf/renderer';
import { students } from './api.js';

export const downloadResumeAsPDF = async (event) => {
    try {
        // Show loading state
        const originalText = event?.target?.textContent || 'Download';
        if (event?.target) {
            event.target.textContent = 'Generating PDF...';
            event.target.disabled = true;
        }

        let resumeData = null;
        try {
            const res = await students.resume.get();
            if (res && res.data) resumeData = res.data;
        } catch {}
        if (!resumeData) {
            resumeData = {
                personalInfo: {},
                education: [],
                experience: [],
                projects: [],
                technicalSkills: { languages: '', technologies_framework: '', devTools: '' },
                extra: '',
                toggle: { educationToggle: true, experienceToggle: true, skillsToggle: true, projectsToggle: true, extraToggle: true }
            };
        }

        // If no data from DB, try to get from rendered preview
        if (!resumeData.personalInfo.name) {
            // Extract data from the DOM as fallback
            resumeData.personalInfo = {
                name: document.querySelector('.text-3xl')?.textContent || 'Your Name',
                title: document.querySelector('.text-base.font-normal.uppercase')?.textContent || 'Professional Title',
                phone: document.querySelector('.text-sm')?.textContent?.match(/📞\s*(\S+)/)?.[1] || '',
                email: document.querySelector('.text-sm a[href^="mailto:"]')?.textContent || '',
                linkedin: document.querySelector('.text-sm a[href*="linkedin"]') ? 'LinkedIn' : '',
                github: document.querySelector('.text-sm a[href*="github"]') ? 'GitHub' : '',
                portfolio: document.querySelector('.text-sm a[href*="portfolio"]') ? 'Portfolio' : ''
            };
        }

        // Dynamically import the PDF template to avoid JSX syntax issues
        const ResumePDFTemplate = (await import('../components/pdf/ResumePDFTemplate.jsx')).default;
        
        // Generate PDF using @react-pdf/renderer
        const blob = await pdf(ResumePDFTemplate({ resumeData })).toBlob();
        
        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        
        // Generate filename from name or use default
        const name = resumeData.personalInfo?.name || 'resume';
        link.download = `${name.toLowerCase().replace(/\s+/g, '-')}-resume.pdf`;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up
        URL.revokeObjectURL(url);

        // Restore button state
        if (event?.target) {
            event.target.textContent = originalText;
            event.target.disabled = false;
        }

    } catch (error) {
        console.error('Error generating PDF:', error);
        alert(`Error generating PDF: ${error.message}. Please try again.`);

        // Restore button state on error
        if (event?.target) {
            event.target.textContent = 'Download';
            event.target.disabled = false;
        }
    }
};

import { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { students } from '../lib/api.js';
export const ResumeContext = createContext(null);

export const ResumeProvider = ({ children }) => {
  const [toggle, setToggle] = useState({
    educationToggle: true,
    experienceToggle: true,
    skillsToggle: true,
    projectsToggle: true,
    extraToggle: true,
  });
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    title: '',
    phone: '',
    email: '',
    linkedin: '',
    github: '',
    portfolio: '',
  });
  const [education, setEducation] = useState([
    {
      id: uuidv4(),
      college: '',
      duration: '',
      degree: '',
      grade: '',
      location: '',
    },
  ]);
  const [experience, setExperience] = useState([
    {
      id: uuidv4(),
      role: '',
      duration: '',
      company: '',
      location: '',
      summary: '',
    },
  ]);
  const [projects, setProjects] = useState([
    {
      id: uuidv4(),
      projectTitle: '',
      live: '',
      code: '',
      tech: '',
      summary: '',
      duration: '',
    },
  ]);
  const [technicalSkills, setTechnicalSkills] = useState({
    languages: '',
    technologies_framework: '',
    devTools: '',
  });
  const [extra, setExtra] = useState('');

  const handleSave = async () => {
    const data = {
      personalInfo,
      education,
      experience,
      projects,
      technicalSkills,
      extra,
      toggle,
    };
    try {
      await students.resume.save(data);
    } catch {}
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await students.resume.get();
        if (res && res.data) {
          const d = res.data;
          setPersonalInfo(d.personalInfo || {});
          setEducation(d.education || []);
          setExperience(d.experience || []);
          setProjects(d.projects || []);
          setTechnicalSkills(d.technicalSkills || {});
          setExtra(d.extra || '');
          setToggle(d.toggle || toggle);
        }
      } catch {}
    };
    load();
  }, []);

  return (
    <ResumeContext.Provider
      value={{
        personalInfo,
        setPersonalInfo,
        education,
        setEducation,
        experience,
        setExperience,
        projects,
        setProjects,
        technicalSkills,
        setTechnicalSkills,
        extra,
        setExtra,
        toggle,
        setToggle,
        handleSave,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

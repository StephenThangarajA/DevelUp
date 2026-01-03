import { useState } from 'react';

import ResumeSections from '../components/ResumeSections';
import PersonalDetailsForm from '../components/resume-ui/PersonalDetails';
import EducationForm from '../components/resume-ui/Education';
import ProjectForm from '../components/resume-ui/Project';
import ExperienceForm from '../components/resume-ui/Experience';
import SkillForm from '../components/resume-ui/Skills';
import ExtraForm from '../components/resume-ui/Extra';

const Forms = () => {
  const [tab, setTab] = useState('Personal Details');

  return (
    <div className='min-h-screen md:w-1/2 w-full h-full overflow-y-scroll bg-zinc-50 pb-8'>
      <ResumeSections tab={tab} setTab={setTab} />
      {tab === 'Personal Details' && <PersonalDetailsForm />}
      {tab === 'Education' && <EducationForm />}
      {tab === 'Experience' && <ExperienceForm />}
      {tab === 'Projects' && <ProjectForm />}
      {tab === 'Skills' && <SkillForm />}
      {tab === 'Extra Activities' && <ExtraForm />}
    </div>
  );
};

export default Forms;
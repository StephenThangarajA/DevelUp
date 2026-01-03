import PersonalDetails from '../components/preview-ui/PersonalDetails';
import Education from '../components/preview-ui/Education';
import Project from '../components/preview-ui/Project';
import Experience from '../components/preview-ui/Experience';
import Skills from '../components/preview-ui/Skills';
import Extra from '../components/preview-ui/Extra';

const ResumeContents = () => {
  return (
    <div id="resume-content" className='bg-white px-[40px] py-[30px] min-h-full font-noto text-black'>
      <PersonalDetails />
      <Education />
      <Experience />
      <Project />
      <Skills />
      <Extra />
    </div>
  );
};

export default ResumeContents;
import { useContext } from 'react'
import { ResumeContext } from '../../contexts/ResumeContext'
import Title from '../resume-ui/Title'

const Skills = () => {
	const { technicalSkills, toggle } = useContext(ResumeContext)
	if (toggle && toggle.skillsToggle === false) return null
	const { languages, technologies_framework, devTools } = technicalSkills
	return (
		<div className='mt-3'>
			<Title title='Technical Skills' />
			<ul className='list-disc pl-5 text-sm leading-6'>
				{languages && <li>Languages: {languages}</li>}
				{technologies_framework && <li>Technologies/Frameworks: {technologies_framework}</li>}
				{devTools && <li>Developer Tools: {devTools}</li>}
			</ul>
		</div>
	)
}

export default Skills



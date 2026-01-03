import { useContext } from 'react'
import { ResumeContext } from '../../contexts/ResumeContext'
import Title from '../resume-ui/Title'

const Education = () => {
	const { education, toggle } = useContext(ResumeContext)
	if (toggle && toggle.educationToggle === false) return null
	return (
		<div className='mt-3'>
			<Title title='Education' />
			{education.map((edu) => (
				<div key={edu.id} className='text-sm leading-6'>
					<div className='flex justify-between'>
						<p className='font-medium'>{edu.college}</p>
						<p>{edu.duration}</p>
					</div>
					<p>{edu.degree}</p>
					<div className='flex justify-between'>
						<p>{edu.location}</p>
						<p>{edu.grade}</p>
					</div>
				</div>
			))}
		</div>
	)
}

export default Education



import { useContext } from 'react'
import { ResumeContext } from '../../contexts/ResumeContext'
import Title from '../resume-ui/Title'

const Project = () => {
	const { projects, toggle } = useContext(ResumeContext)
	if (toggle && toggle.projectsToggle === false) return null
	return (
		<div className='mt-3'>
			<Title title='Projects' />
			{projects.map((p) => (
				<div key={p.id} className='text-sm leading-6'>
					<div className='flex justify-between'>
						<p className='font-medium'>{p.projectTitle}</p>
						<p>{p.duration}</p>
					</div>
					<p>{p.tech}</p>
					<div className='prose prose-sm max-w-none' dangerouslySetInnerHTML={{ __html: p.summary }} />
				</div>
			))}
		</div>
	)
}

export default Project



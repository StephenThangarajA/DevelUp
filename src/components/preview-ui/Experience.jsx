import { useContext } from 'react'
import { ResumeContext } from '../../contexts/ResumeContext'
import Title from '../resume-ui/Title'

const Experience = () => {
	const { experience, toggle } = useContext(ResumeContext)
	if (toggle && toggle.experienceToggle === false) return null
	return (
		<div className='mt-3'>
			<Title title='Experience' />
			{experience.map((ex) => (
				<div key={ex.id} className='text-sm leading-6'>
					<div className='flex justify-between'>
						{(() => {
							const titleLine = [ex.role, ex.company].filter(Boolean).join(' - ')
							return <p className='font-medium'>{titleLine}</p>
						})()}
						<p>{ex.duration}</p>
					</div>
					<div className='flex justify-between'>
						<p>{ex.location}</p>
					</div>
					<div dangerouslySetInnerHTML={{ __html: ex.summary }} />
				</div>
			))}
		</div>
	)
}

export default Experience



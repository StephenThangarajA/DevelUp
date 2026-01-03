import { useContext } from 'react'
import { ResumeContext } from '../../contexts/ResumeContext'
import Title from '../resume-ui/Title'

const Extra = () => {
	const { extra, toggle } = useContext(ResumeContext)
	if (toggle && toggle.extraToggle === false) return null
	if (!extra) return null
	const plain = extra.replace(/<[^>]+>/g, '')
	return (
		<div className='mt-3'>
			<Title title='Extra' />
			<p className='text-sm leading-6 whitespace-pre-line'>{plain}</p>
		</div>
	)
}

export default Extra
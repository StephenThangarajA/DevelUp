import Forms from '../components/Forms'
import Resume from './Resume'

const Write = () => {
  return (
    <>
      {/* Heading */}
      <div className="bg-gray-900 text-white py-5 pl-5">
        <h1 className="text-2xl font-bold">Resume Builder</h1>
      </div>
      <div className="md:h-screen flex flex-col md:flex-row bg-gray-900"><br />
        <Forms />
        <Resume />
      </div>
    </>
  )
}

export default Write
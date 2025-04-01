import { Link } from 'react-router-dom'

export const Welcome = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center flex-col'>
      <h1 className="text-6xl font-bold m-4">Welcome</h1>
      <Link className="hover:text-blue-500"to="/lesson">👉 Go to lesson list </Link>
    </div>
  )
}

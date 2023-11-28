import { signOut } from 'firebase/auth';
import { auth } from './config';

function Home() {
  const logoutUser = () => {
    
    signOut(auth)
      .then(() => {
       
        localStorage.clear();
        window.location.href = '/';
      })
      .catch((error) => {
        
        console.error('Error signing out:', error);
      });
  };

  return (
    <div className='h-screen overflow-y-hidden flex flex-col justify-center items-center'>
      <p className='text-3xl font-bold pb-6'>Home</p>
      <button className='border-[1px] border-gray-400 px-6 py-2' onClick={logoutUser}>Logout</button>
    </div>
  );
}

export default Home;

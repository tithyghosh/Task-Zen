import TaskzenLogo from '../assets/to-do-list.png'
const Header = () => {
  return (
    <nav className="py-6 md:py-8 fixed top-0 w-full !bg-[#191D26] z-50 px-6 md:px-8">
      <div className='container mx-auto flex items-center justify-between gap-x-6'>
         <a href="/">
         <img src={TaskzenLogo} alt="TZ" className='h-[45px]'/>
         </a>
         <a href="#" className='text-2xl text-amber-50'>TaskZen</a>
         
      </div>
    </nav>
  )
}

export default Header

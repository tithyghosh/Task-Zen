import TaskzenLogo from '../assets/to-do-list.png'
const Header = () => {
  return (
    <nav className="py-6 md:py-8 lg:px-20 fixed top-0 w-full bg-[#191D26]! z-50">
      <div className='container flex items-center justify-between gap-x-6 '>
         <a href="/">
         <img src={TaskzenLogo} alt="TZ" className ='h-11.25'/>
         </a>
         <a href="#" className ='text-2xl text-amber-50 italic' style ={{fontFamily: 'cursive'}}>TaskZen</a>
         
      </div>
    </nav>
  )
}

export default Header

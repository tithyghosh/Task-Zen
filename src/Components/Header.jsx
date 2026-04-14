import TaskzenLogo from '../assets/to-do-list.png'
const Header = () => {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 w-full bg-[#191D26] px-4 py-4 sm:px-6 md:py-6 lg:px-12">
      <div className="container mx-auto flex items-center justify-between gap-x-4">
         <a href="/">
           <img src={TaskzenLogo} alt="TZ" className="h-9 sm:h-10 md:h-11" />
         </a>
         <a href="#" className="text-lg text-sky-100 italic sm:text-xl md:text-2xl" style={{ fontFamily: 'cursive' }}>
          Task
          <span className="text-cyan-500 ml-1 font-bold">Zen</span>
         </a>
      </div>
    </nav>
  );
}

export default Header

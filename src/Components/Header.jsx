import TaskzenLogo from '../assets/to-do-list.png'

const Header = () => {
  return (
    <nav id="main-nav" className="fixed inset-x-0 top-0 z-50 w-full bg-[#191D26] px-4 py-4 transition-opacity duration-300 sm:px-6 md:py-6 lg:px-12">
      <div className="container mx-auto flex items-center justify-between gap-x-4">
         <a href="/">
           <img src={TaskzenLogo} alt="TZ" className="h-9 sm:h-10 md:h-11" />
         </a>
         <h1
           className="select-none text-lg font-semibold italic leading-none text-white sm:text-xl md:text-2xl"
           style={{ fontFamily: '"Trebuchet MS", "Segoe UI", sans-serif' }}
         >
          <span className="text-sky-100">Task</span>
          <span className="ml-1 text-cyan-400">Zen</span>
     </h1>
      </div>
    </nav>
  );
}

export default Header

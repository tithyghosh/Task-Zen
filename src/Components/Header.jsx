import TaskzenLogo from '../assets/to-do-list.png'

const Header = () => {
  return (
    <nav id="main-nav" className="fixed inset-x-0 top-0 z-50 w-full border-b border-white/[0.06] bg-[#0b1017]/80 px-4 py-4 backdrop-blur-md transition-opacity duration-300 sm:px-6 md:py-6 lg:px-12">
      {/* dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(56,189,248,0.18) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, black 20%, transparent 100%)',
        }}
      />
      <div className="container relative z-10 mx-auto flex items-center justify-between gap-x-4">
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

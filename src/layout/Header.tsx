import { Link } from "@heroui/react";
import { useState } from "react";

interface HeaderProps {}

export function Header(props: HeaderProps) {
  const [open_sidebar, setOpenSidebar] = useState<boolean>(false);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <Link 
          href={'/'}
          className="flex items-center gap-1 p-4">
          <img 
            className="w-10 h-10 object-contain"
            src={'/logo.png'} />
          <div className="serif text-3xl text-white">
            NAIV
          </div>
        </Link>
        <div className="flex items-center gap-5 px-4">
          <div className="lg:hidden">
            <img 
              onClick={() => setOpenSidebar(true)}
              className="w-8 h-8 object-contain"
              src={'/burger.svg'} />
          </div>
          <div 
            onClick={() => setOpenSidebar(false)}
            className={`
              ${open_sidebar ? 'z-[999]' : 'pointer-events-none z-[-1] lg:pointer-events-auto lg:z-[999]'}
              w-screen bg-[#0005] h-screen right-0 top-0 absolute flex flex-col items-end 
              lg:bg-transparent lg:w-auto lg:h-auto lg:relative lg:flex-row lg:items-center
            `}>
            <div 
              onClick={e => e.stopPropagation()}
              className={`
                ${open_sidebar ? 'translate-x-0' : 'translate-x-[100%] lg:relative lg:translate-x-0'}
                fixed transition transition-transform w-[75%] h-full bg-zinc-800 flex flex-col px-4 items-end gap-5
                lg:transition-none lg:w-auto lg:h-auto lg:bg-transparent lg:flex-row lg:items-center lg:px-0
              `}>
              <div className="lg:hidden py-4">
                <img 
                  className="w-10 h-10 object-contain"
                  src={'/logo.png'} />
              </div>
              <Link 
                href={'/get-started'}
                className="text-rose-400">
                Get Started
              </Link>
              <Link 
                href={'/documentation'}
                className="text-rose-400">
                Docs
              </Link>
              <Link 
                href={'/milestone'}
                className="text-rose-400">
                Milestone
              </Link>
              <Link 
                href={'/zero'}
                className="text-rose-400">
                Zero Services
              </Link>
              <Link 
                href={'https:///sendmail.naiv.dev'}
                className="text-rose-400">
                SendMail
              </Link>
            </div>
          </div>
          <Link 
            href={'https://github.com/NAIV-Dev'}
            className="text-rose-400">
            <img 
              className="w-6 h-6 object-contain"
              src={'/github.svg'} />
          </Link>
        </div>
      </div>
      <div className="w-full px-4">
        <div className="w-full h-px bg-[#FFF1]" />
      </div>
    </div>
  );
}

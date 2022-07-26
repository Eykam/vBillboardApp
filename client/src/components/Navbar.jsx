import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';

const NavbarItem = ({title, classProps}) =>{
    return (
        <li className={`mx-4 cursor-pointer ${title,classProps}`}>
            {title}
        </li>
    );
}
const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);

    return (
        <nav className="w-full flex md:justify-center justify-between items-center p-4">

            <div className="text-white md:flex-[0.5] flex-initial justify-right items-center ml-12"> Icon </div>
                <ul className="text-white md:flex hidden list-none flex-1 justify-end items-center mr-12">
                    {["Documentation", "About" , "Contact"].map((item,index) => (
                        <NavbarItem key={item + index} title={item} />
                    ))}
                    <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">Login</li>
                </ul>
            <div className="flex-relative">
                {toggleMenu
                    ? <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)}/>
                    : <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)}/>
                }

                {toggleMenu && (
                    <ul
                        className="z-10 fixed top-0 right-0 p-3 w-screen h-[50] shadow-2xl md:hidden list-none
                                    flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white">
                        <li className='text-xl'>
                            <AiOutlineClose onClick={() => setToggleMenu(false)}/>
                        </li>
                            {["Documentation", "About" , "Contact"].map((item,index) => (
                                <NavbarItem key={item + index} title={item} classProps="my-2 text-lg"/>
                            ))}
                    </ul>

                )}

            </div>
        </nav>
    );
}

export default Navbar;
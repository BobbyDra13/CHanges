import { React, useEffect, useState } from 'react';
import { BsArrowLeftShort, BsSearch } from 'react-icons/bs';
import { BiSolidDashboard, BiSolidVideos } from 'react-icons/bi';
import { FaTags } from 'react-icons/fa6';
import { IoIosPerson } from 'react-icons/io';
import { RiTeamFill } from 'react-icons/ri';
import { MdTune } from 'react-icons/md';
import { Tooltip } from '@mui/material';
import storeLogo from '../../../assets/images/shop.png';
import logo from '../../../assets/images/neophyte_logo_white.png';
import { useMediaQuery, useTheme } from '@mui/material';
import { HiBarsArrowDown } from 'react-icons/hi2';
import { IoClose } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import { Outlet, useNavigate, useLocation } from 'react-router';
import MapComponentAnalysis from './map';

function NewStorePage() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenuItem, setActiveMenuItem] = useState('Overview');
  const [openMobileNavbar, setOpenMobileNavbar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.down('lg'));

  const Menus = [
    {
      title: 'Overview',
      icon: <BiSolidDashboard />,
      disabled: false
      // path: '/main/stores/storeinsight/overview'
    },
    {
      title: 'Videos',
      icon: <BiSolidVideos />,
      disabled: true
      // path: '/main/stores/storeinsight/video'
    },
    { title: 'Brands', icon: <FaTags />, disabled: true },
    { title: 'Customers', icon: <IoIosPerson />, disabled: true },
    { title: 'Team', icon: <RiTeamFill />, disabled: true },
    { title: 'Preferences', icon: <MdTune />, disabled: true }
  ];

  const storeDetails = JSON.parse(localStorage.getItem('analysisStoreDetails'));
  console.log('skl', storeDetails);

  useEffect(() => {
    // Get the current path from the location object
    const currentPath = location.pathname;

    // Find the menu item corresponding to the current path
    const menuItem = Menus.find((menu) => menu.path === currentPath);

    // Update the activeMenuItem if a corresponding menu item is found
    if (menuItem) {
      setActiveMenuItem(menuItem.title);
    }
    // eslint-disable-next-line
  }, [location]);
  const handleMenuItemClick = (menu) => {
    if (menu.disabled === true) {
      return;
    } else {
      setActiveMenuItem(menu.title);
      navigate(menu.path);
    }
  };
  const handleMobileNavbarOpenClick = () => {
    setOpenMobileNavbar((prev) => !prev);
  };

  const filteredMenus = Menus.filter((menu) => menu.title.toLowerCase().includes(searchQuery.toLowerCase()));

  // useEffect(()=>{
  //   {activeMenuItem === 'Overview' ?navigate("/main/stores/storeinsight/overview") : activeMenuItem === 'Videos' ? navigate("/main/stores/storeinsight/video") : navigate("/main/stores/storeinsight/overview")}
  // },[activeMenuItem])

  useEffect(() => {
    console.log(activeMenuItem);
  }, [activeMenuItem]);

  return (
    <div
      className="flex"
      style={{
        flexDirection: isLargeScreen ? 'column' : 'row',
        margin: isLargeScreen ? '0' : '-40px'
      }}
    >
      {!isLargeScreen ? (
        <div className={` h-[calc(100vh-64px)]  relative   ${open ? 'w-96' : 'w-24'}`}>
          <div className={` h-[calc(100vh-64px)]  fixed   ${open ? 'w-72' : 'w-24'}`}>
            <BsArrowLeftShort
              className={`bg-white text-cyan-950 ${
                open ? '-right-3 top-8' : '-right-3 top-8'
              } text-2xl rounded-full absolute  border border-gray-500 cursor-pointer border-dashed duration-1000 z-10  ${
                !open && 'rotate-180'
              }`}
              onClick={() => setOpen(!open)}
            />
            <aside
              className={`bg-[#111921] h-[calc(100vh-64px)] overflow-x-hidden overflow-y-auto scrollbar  p-5 pt-7 fixed duration-300 ${
                open ? 'w-72 flex flex-col justify-between' : 'w-24'
              }`}
            >
              <div>
                <Tooltip arrow title={!open ? `${storeDetails.storeName}` : ''}>
                  <div className="flex items-center">
                    <img
                      src={storeLogo}
                      alt="store icon"
                      className={`w-10 h-10 p-1 inline-block float-left mr-[6px] ml-[6px] ${!open && 'cursor-pointer'}`}
                    />
                    {open && (
                      <h1 className={`text-gray-200 origin-right font-medium -mt-1 text-lg  3xl:text-xl`}>{storeDetails.storeName}</h1>
                    )}
                  </div>
                  {open && <MapComponentAnalysis />}
                </Tooltip>

                <div
                  onClick={() => {
                    if (!open) {
                      setOpen(!open);
                    }
                  }}
                  className={`flex relative group items-center cursor-pointer rounded-md bg-[rgba(255,255,255,0.18)] mt-4 py-2 ${
                    !open ? 'px-2.5' : 'px-4'
                  }`}
                >
                  <BsSearch className={`text-white text-lg block  ml-2 cursor-pointer ${open && 'mr-4 ml-0'}`} />
                  <input
                    type={'search'}
                    placeholder="Search"
                    className={`text-base bg-transparent w-full text-white focus:outline-none ${!open && 'hidden'}`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {!open && (
                    <div
                      className={`absolute left-full rounded-md px-3 py-1 ml-10 bg-cyan-200 text-cyan-700 shadow-md -translate-x-3 transition-all invisible opacity-20 group-hover:opacity-100 group-hover:visible group-hover:translate-x-0`}
                    >
                      Search
                    </div>
                  )}
                </div>

                <ul className={`pt-2   ${!open && 'flex flex-col items-center '}`}>
                  {filteredMenus.map((menu, index) => (
                    <>
                      <li
                        onClick={() => handleMenuItemClick(menu)}
                        key={index}
                        className={`text-xl flex items-center gap-x-4 p-2 py-2 my-2 hover:bg-[rgba(255,255,255,0.18)] rounded-md relative group ${
                          menu.disabled === true ? 'cursor-not-allowed text-gray-500' : 'cursor-pointer text-white'
                        }`}
                      >
                        <span className={`text-2xl block float-left ${activeMenuItem === menu.title ? 'text-cyan-400' : ''}`}>
                          {menu.icon && menu.icon}
                        </span>
                        <span
                          className={`text-base font-medium flex-1 duration-300 ${activeMenuItem === menu.title ? 'text-cyan-300' : ''} ${
                            !open && 'hidden'
                          }`}
                        >
                          {menu.title}
                        </span>
                        {!open && (
                          <div
                            className={`absolute left-full rounded-md px-3 py-1 ml-10 bg-cyan-200 text-cyan-700 text-sm shadow-md -translate-x-3 transition-all invisible opacity-20 group-hover:opacity-100 group-hover:visible group-hover:translate-x-0`}
                          >
                            {menu.title}
                          </div>
                        )}
                      </li>
                    </>
                  ))}
                </ul>
              </div>
              {open && (
                <div className={`flex relative mt-7 flex-col pl-2.5 gap-0.5 bottom-1 transition-all ${!open && 'w-0'}`}>
                  <span className="text-white text-sm">Powered by</span>
                  <img src={logo} alt="neophyte logo" className="h-5 w-[170px]" />
                  <span className="text-white text-sm">Copyright © Neophyte 2024</span>
                </div>
              )}
            </aside>
          </div>
        </div>
      ) : (
        <div className="   w-full flex justify-end">
          <motion.div whileHover={{ scale: 1.2 }}>
            <HiBarsArrowDown className="text-2xl hover:cursor-pointer" onClick={handleMobileNavbarOpenClick} />
          </motion.div>
          <AnimatePresence>
            {openMobileNavbar && (
              <motion.ul
                className="fixed z-[999] w-full h-full pt-5 bg-[#083344] right-0 top-14 flex flex-col gap-16 items-center overflow-y-auto scrollbar"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
              >
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={{
                    animate: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                    exit: { transition: { staggerChildren: 0.1 } }
                  }}
                >
                  {Menus.map((index, i) => (
                    <motion.li
                      key={i}
                      variants={{
                        initial: { opacity: 0, y: 20 },
                        animate: { opacity: 1, y: 0 },
                        exit: { opacity: 0, y: -20 }
                      }}
                      onClick={() => {
                        handleMenuItemClick(index);
                        handleMobileNavbarOpenClick();
                      }}
                      className={`text-xl flex items-center gap-x-4 p-2 py-2 my-2 hover:bg-[rgba(255,255,255,0.18)] rounded-md relative group ${
                        index.disabled === true ? 'cursor-not-allowed text-gray-500' : 'cursor-pointer text-white'
                      }`}
                    >
                      <span className={`text-2xl block float-left ${activeMenuItem === index.title ? 'text-cyan-400' : ''}`}>
                        {index.icon && index.icon}
                      </span>
                      <span className={`text-2xl font-medium flex-1 duration-300 ${activeMenuItem === index.title ? 'text-cyan-300' : ''}`}>
                        {index.title}
                      </span>
                    </motion.li>
                  ))}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="pb-10  mb-10 "
                >
                  <IoClose className="text-3xl hover:cursor-pointer    text-slate-200" onClick={handleMobileNavbarOpenClick} />
                </motion.div>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      )}
      <div
        className="mt-7 mx-5 w-full"
        style={{
          margin: isLargeScreen ? '0.5rem 0 0 0' : '1.9rem 1.25rem 0 1.25rem'
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default NewStorePage;

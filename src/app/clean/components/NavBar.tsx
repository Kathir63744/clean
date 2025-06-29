"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronRight, Home, Info, Phone, Settings } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { clsx as cn } from 'clsx';
import Slider from "./Slider";

interface CarouselMenuBarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentSection: string;
  isMobile?: boolean;
}

const CarouselMenuBar = ({ isOpen, setIsOpen, currentSection, isMobile = false }: CarouselMenuBarProps) => {
  const quickLinks = [
    { name: "Bike Taxi", section: "bike-taxi-section", color: "bg-teal-500" },
    { name: "Cleaning", section: "cleaning-section", color: "bg-amber-500" },
    { name: "Grooming", section: "grooming-section", color: "bg-indigo-500" },
    { name: "Products", section: "products-section", color: "bg-cyan-500" },
  ];

  const getButtonStyle = () => {
    switch (currentSection) {
      case "bike":
        return "text-teal-200 hover:text-teal-100";
      case "cleaning":
        return "text-amber-200 hover:text-amber-100";
      case "grooming":
        return "text-indigo-200 hover:text-indigo-100";
      case "products":
        return "text-cyan-200 hover:text-cyan-100";
      default:
        return "text-white hover:text-gray-200";
    }
  };

  return (
    <div className={isMobile ? "w-full" : ""}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-center gap-1 p-2 rounded-lg transition-all",
          getButtonStyle(),
          isMobile ? "w-full" : ""
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="font-medium">Quick Nav</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "absolute right-0 mt-2 py-2 bg-white/10 backdrop-blur-md rounded-lg shadow-lg overflow-hidden z-50",
              isMobile ? "relative w-full" : "w-48"
            )}
          >
            <div className="space-y-1 p-1">
              {quickLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  onClick={() => {
                    const element = document.getElementById(link.section);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                      setIsOpen(false);
                    }
                  }}
                  className={cn(
                    "flex items-center w-full px-4 py-2 text-sm text-white rounded-md hover:bg-white/10 transition-colors",
                    currentSection === link.name.toLowerCase() ? "bg-white/20" : ""
                  )}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  whileHover={{ x: 5 }}
                >
                  <div className={`w-2 h-2 rounded-full ${link.color} mr-2`} />
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const NavBar = () => {
  const [scrollSection, setScrollSection] = useState<string>("default");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const pathname = usePathname();
  
  const getPageTheme = () => {
    if (pathname.includes('/grooming')) return 'grooming';
    if (pathname.includes('/cleaning')) return 'cleaning';
    if (pathname.includes('/bike')) return 'bike';
    return 'default';
  };

  const pageTheme = getPageTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const bikeSection = document.getElementById("bike-taxi-section");
      const cleaningSection = document.getElementById("cleaning-section");
      const groomingSection = document.getElementById("grooming-section");
      const productsSection = document.getElementById("products-section");

      if (bikeSection && 
          scrollPosition >= bikeSection.offsetTop - 100 && 
          scrollPosition < (cleaningSection?.offsetTop || 9999) - 100) {
        setScrollSection("bike");
      } else if (cleaningSection && 
          scrollPosition >= cleaningSection.offsetTop - 100 && 
          scrollPosition < (groomingSection?.offsetTop || 9999) - 100) {
        setScrollSection("cleaning");
      } else if (groomingSection && 
                scrollPosition >= groomingSection.offsetTop - 100 && 
                scrollPosition < (productsSection?.offsetTop || 9999) - 100) {
        setScrollSection("grooming");
      } else if (productsSection && 
                scrollPosition >= productsSection.offsetTop - 100) {
        setScrollSection("products");
      } else {
        setScrollSection("default");
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const getNavbarStyle = () => {
    if (pageTheme !== 'default') {
      switch (pageTheme) {
        case "bike":
          return "bg-gradient-to-r from-gray-900/90 to-teal-900/90 text-white";
        case "cleaning":
          return "bg-gradient-to-r from-amber-700/90 to-yellow-500/90 text-white";
        case "grooming":
          return "bg-gradient-to-r from-blue-900/90 to-indigo-900/90 text-white";
        default:
          return "bg-gradient-to-r from-indigo-950/90 to-gray-900/90 text-white";
      }
    }
    
    switch (scrollSection) {
      case "bike":
        return "bg-gradient-to-r from-gray-900/90 to-teal-900/90 text-white";
      case "cleaning":
        return "bg-gradient-to-r from-amber-700/90 to-yellow-500/90 text-white";
      case "grooming":
        return "bg-gradient-to-r from-blue-900/90 to-indigo-900/90 text-white";
      case "products":
        return "bg-gradient-to-r from-cyan-700/90 to-cyan-500/90 text-white";
      default:
        return "bg-gradient-to-r from-indigo-950/90 to-gray-900/90 text-white";
    }
  };
  
  const getLogoColors = () => {
    const theme = pageTheme !== 'default' ? pageTheme : scrollSection;
    
    if (theme === "bike") {
      return [
        "text-teal-200", "text-teal-300", "text-teal-200", 
        "text-teal-300", "text-teal-200"
      ];
    } else if (theme === "cleaning") {
      return [
        "text-yellow-200", "text-yellow-300", "text-amber-200", 
        "text-amber-300", "text-yellow-200"
      ];
    } else if (theme === "grooming") {
      return [
        "text-indigo-200", "text-blue-300", "text-indigo-200", 
        "text-blue-300", "text-indigo-200"
      ];
    } else if (theme === "products") {
      return [
        "text-cyan-200", "text-cyan-300", "text-cyan-200", 
        "text-cyan-300", "text-cyan-200"
      ];
    } else {
      return [
        "text-indigo-200", "text-indigo-300", "text-indigo-200", 
        "text-indigo-300", "text-indigo-200"
      ];
    }
  };
  
  const menuItems = [
    { name: "Home", path: "/", icon: <Home className="w-4 h-4" /> },
    { name: "About Us", path: "/about", icon: <Info className="w-4 h-4" /> },
    { name: "Services", path: "/services", icon: <Settings className="w-4 h-4" /> },
    { name: "Contact", path: "/contact", icon: <Phone className="w-4 h-4" /> }
  ];
  
  return (
    <div className={`w-full ${getNavbarStyle()} fixed top-0 left-0 z-50 transition-colors duration-500 shadow-md`}>
      <div className="relative flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="rounded flex-shrink-0 group">
          <motion.h1 
            className="text-lg font-semibold font-serif flex gap-[1px]"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {['C', 'l', 'e', 'a', 'n'].map((letter, index) => (
              <motion.span 
                key={index}
                className={getLogoColors()[index]}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>
        </Link>

        <div className="hidden md:flex flex-grow justify-center">
          <ul className="flex gap-4 lg:gap-8">
            {menuItems.map((item, index) => (
              <motion.li 
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <Link 
                  href={item.path} 
                  className={cn(
                    "p-2 font-mono text-base transition-all duration-300 hover:opacity-80 relative group flex items-center gap-1",
                    pathname === item.path ? "font-bold" : ""
                  )}
                >
                  {item.name}
                  {pathname === item.path && (
                    <motion.div 
                      className="absolute bottom-0 left-0 h-0.5 bg-white"
                      layoutId="navbar-underline"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <AnimatePresence mode="wait" initial={false}>
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        <div className="hidden md:block">
          <CarouselMenuBar 
            isOpen={isCarouselOpen} 
            setIsOpen={setIsCarouselOpen} 
            currentSection={pageTheme !== 'default' ? pageTheme : scrollSection}
          />
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link 
                    href={item.path} 
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium",
                      pathname === item.path ? "font-bold bg-black bg-opacity-10" : ""
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: menuItems.length * 0.1 }}
                className="pt-4 pb-2"
              >
                <CarouselMenuBar 
                  isOpen={isCarouselOpen} 
                  setIsOpen={setIsCarouselOpen} 
                  currentSection={pageTheme !== 'default' ? pageTheme : scrollSection}
                  isMobile={true}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
       <div className="">
      <Slider/>
    </div>
    </div>
   
  );
};

export default NavBar;
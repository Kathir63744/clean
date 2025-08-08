"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, Info, Phone, Settings, Search } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { clsx as cn } from 'clsx';
import Slider from "./Slider";

const PLACEHOLDER_TEXTS = [
  "Cleaning...",
  "Grooming...",
  "Bike Taxi...",
  "Products..."
];

interface SearchBarProps {
  currentSection: string;
  isMobile?: boolean;
}

const SearchBar = ({ currentSection, isMobile = false }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholderText, setPlaceholderText] = useState(PLACEHOLDER_TEXTS[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDER_TEXTS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let charIndex = 0;
    const currentText = PLACEHOLDER_TEXTS[placeholderIndex];
    const typingInterval = setInterval(() => {
      if (charIndex <= currentText.length) {
        setPlaceholderText(currentText.substring(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [placeholderIndex]);

  const getSearchStyle = () => {
    switch(currentSection) {
      case "hero":
        return {
          bg: "bg-white/90",
          border: "border-cyan-200",
          text: "text-cyan-900",
          placeholder: "placeholder-cyan-600",
          icon: "text-cyan-500",
          shadow: "shadow-sm"
        };
      case "cleaning":
        return {
          bg: "bg-amber-100/90",
          border: "border-amber-300",
          text: "text-amber-900",
          placeholder: "placeholder-amber-600",
          icon: "text-amber-600",
          shadow: "shadow-sm"
        };
      case "bike":
        return {
          bg: "bg-teal-100/90",
          border: "border-teal-300",
          text: "text-teal-900",
          placeholder: "placeholder-teal-600",
          icon: "text-teal-600",
          shadow: "shadow-sm"
        };
      case "grooming":
        return {
          bg: "bg-indigo-100/90",
          border: "border-indigo-300",
          text: "text-indigo-900",
          placeholder: "placeholder-indigo-600",
          icon: "text-indigo-600",
          shadow: "shadow-sm"
        };
      case "products":
        return {
          bg: "bg-white/90",
          border: "border-cyan-200",
          text: "text-cyan-900",
          placeholder: "placeholder-cyan-600",
          icon: "text-cyan-500",
          shadow: "shadow-sm"
        };
      case "footer":
        return {
          bg: "bg-gray-700/90",
          border: "border-gray-600",
          text: "text-gray-100",
          placeholder: "placeholder-gray-400",
          icon: "text-gray-400",
          shadow: "shadow-sm"
        };
      default:
        return {
          bg: "bg-gray-800/90",
          border: "border-gray-700",
          text: "text-gray-100",
          placeholder: "placeholder-gray-400",
          icon: "text-gray-400",
          shadow: "shadow-sm"
        };
    }
  };

  const styles = getSearchStyle();

  return (
    <div className={cn(
      "relative flex items-center transition-all duration-200",
      isMobile ? "w-full" : "w-56"
    )}>
      <div className={cn(
        "absolute left-3 flex items-center justify-center",
        styles.icon
      )}>
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholderText}
        className={cn(
          "w-full pl-9 pr-3 py-1.5 rounded-lg text-sm border focus:outline-none transition-all",
          styles.bg,
          styles.border,
          styles.text,
          styles.placeholder,
          styles.shadow,
          "focus:ring-1 focus:ring-opacity-50 focus:ring-cyan-400/50"
        )}
      />
    </div>
  );
};

const NavBar = () => {
  const [scrollSection, setScrollSection] = useState<string>("default");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      const heroSection = document.getElementById("hero-section");
      const bikeSection = document.getElementById("bike-taxi-section");
      const cleaningSection = document.getElementById("cleaning-section");
      const groomingSection = document.getElementById("grooming-section");
      const productsSection = document.getElementById("products-section");
      const footerSection = document.getElementById("footer-section");

      if (heroSection && 
          scrollPosition >= heroSection.offsetTop && 
          scrollPosition < heroSection.offsetTop + heroSection.offsetHeight) {
        setScrollSection("hero");
      } 
      else if (footerSection && 
               scrollPosition >= footerSection.offsetTop - 100) {
        setScrollSection("footer");
      }
      else if (bikeSection && 
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
          return "bg-gradient-to-r from-amber-700/90 to-amber-600/90 text-white";
        case "grooming":
          return "bg-gradient-to-r from-blue-900/90 to-indigo-900/90 text-white";
        default:
          return "bg-gradient-to-r from-indigo-950/90 to-gray-900/90 text-white";
      }
    }
    
    switch (scrollSection) {
      case "hero":
        return "bg-cyan-600 text-white";
      case "products":
        return "bg-white text-gray-900 shadow-sm";
      case "footer":
        return "bg-gray-800 text-white";
      case "bike":
        return "bg-gradient-to-r from-gray-900/90 to-teal-900/90 text-white";
      case "cleaning":
        return "bg-gradient-to-r from-amber-700/90 to-amber-600/90 text-white";
      case "grooming":
        return "bg-gradient-to-r from-blue-900/90 to-indigo-900/90 text-white";
      default:
        return "bg-gradient-to-r from-indigo-950/90 to-gray-900/90 text-white";
    }
  };
  
  const getLogoColors = () => {
    const theme = pageTheme !== 'default' ? pageTheme : scrollSection;
    
    if (theme === "hero") {
      return [
        "text-white", "text-cyan-100", "text-white", 
        "text-cyan-100", "text-white"
      ];
    } else if (theme === "products") {
      return [
        "text-gray-800", "text-gray-700", "text-gray-800", 
        "text-gray-700", "text-gray-800"
      ];
    } else if (theme === "footer") {
      return [
        "text-gray-300", "text-gray-400", "text-gray-300", 
        "text-gray-400", "text-gray-300"
      ];
    } else if (theme === "bike") {
      return [
        "text-teal-200", "text-teal-300", "text-teal-200", 
        "text-teal-300", "text-teal-200"
      ];
    } else if (theme === "cleaning") {
      return [
        "text-amber-200", "text-amber-300", "text-amber-200", 
        "text-amber-300", "text-amber-200"
      ];
    } else if (theme === "grooming") {
      return [
        "text-indigo-200", "text-blue-300", "text-indigo-200", 
        "text-blue-300", "text-indigo-200"
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
        {/* Logo - Left aligned */}
        <div className="flex-shrink-0 w-1/5">
          <Link href="/" className="rounded group">
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
        </div>

        {/* Navigation Links - Centered */}
        <div className="hidden md:flex justify-center w-3/5">
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
                    "p-2 font-mono text-sm transition-all duration-300 hover:opacity-80 relative group flex items-center gap-1",
                    pathname === item.path ? "font-bold" : "",
                    scrollSection === "products" ? "text-gray-800" : "text-white"
                  )}
                >
                  {item.name}
                  {pathname === item.path && (
                    <motion.div 
                      className={cn(
                        "absolute bottom-0 left-0 h-0.5 w-full",
                        scrollSection === "products" ? "bg-gray-800" : "bg-white"
                      )}
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

        {/* Search Bar - Right aligned */}
        <div className="flex items-center justify-end w-1/5">
          <div className="hidden md:block">
            <SearchBar 
              currentSection={pageTheme !== 'default' ? pageTheme : scrollSection}
            />
          </div>

          {/* Mobile menu button */}
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
        </div>
      </div>

      {/* Mobile menu */}
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
                      "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium",
                      pathname === item.path ? "font-bold bg-black bg-opacity-10" : "",
                      scrollSection === "products" 
                        ? "text-gray-800 hover:bg-gray-100" 
                        : "text-white hover:bg-white/10"
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
                <SearchBar 
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
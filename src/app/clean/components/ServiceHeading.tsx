import { useEffect, useState, useRef, JSX } from 'react';
import { 
  Sparkles, 
  Droplets, 
  Scissors, 
  Paintbrush, 
  Cat, 
  Heart 
} from 'lucide-react';
interface ServiceWord {
  text: string;
  icon: JSX.Element;
  color: string;
}
export default function ServiceHeading() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const serviceWords: ServiceWord[] = [
    { 
      text: "cleaning", 
      icon: <Sparkles className="service-icon" />,
      color: "rgb(59, 130, 246)" // blue
    },
    { 
      text: "washing", 
      icon: <Droplets className="service-icon" />,
      color: "rgb(14, 165, 233)" // sky blue
    },
    { 
      text: "grooming", 
      icon: <Scissors className="service-icon" />,
      color: "rgb(168, 85, 247)" // purple
    },
    { 
      text: "polishing", 
      icon: <Paintbrush className="service-icon" />,
      color: "rgb(236, 72, 153)" // pink
    },
    { 
      text: "pet caring", 
      icon: <Cat className="service-icon" />,
      color: "rgb(249, 115, 22)" // orange
    },
    { 
      text: "health care", 
      icon: <Heart className="service-icon" />,
      color: "rgb(239, 68, 68)" // red
    }
  ];

  useEffect(() => {
    // Start the animation cycle
    startAnimationCycle();
    
    // Clear timeout on component unmount
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (isAnimating) {
      timeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
        timeoutRef.current = setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % serviceWords.length);
          setIsAnimating(true);
          startAnimationCycle();
        }, 500); // Short pause before starting next word
      }, 4000); // Time to display each word
    }
  }, [isAnimating, serviceWords.length]);

  const startAnimationCycle = () => {
    setIsAnimating(true);
  };

  const currentWord = serviceWords[currentIndex];
  
  // Split the current word into individual characters for animation
  const characters = currentWord.text.split('');

  return (
    <div className="service-heading-container">
      <div className="particles"></div>
      <div 
        className="service-heading-wrapper"
        style={{
          '--accent-color': currentWord.color
        } as React.CSSProperties}
      >
        <h2 className="service-heading">
          <span className="static-text">Better Services in</span>
          <div className="animated-text-container">
            <div className="icon-wrapper">
              {currentWord.icon}
            </div>
            <div className="animated-text">
              {characters.map((char, index) => (
                <span 
                  key={`${currentIndex}-${char}-${index}`} 
                  className={`animated-char ${isAnimating ? 'animate' : ''}`}
                  style={{ 
                    '--char-index': index,
                    color: currentWord.color
                  } as React.CSSProperties}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        </h2>
      </div>
    </div>
  );
}
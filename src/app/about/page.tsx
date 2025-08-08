import Image from "next/image";
import NavBar from "../clean/components/NavBar";

const About = () => {
  return (
    <div className="bg-teal-900 py-10 min-h-screen">
      <NavBar />

      <div className="max-w-5xl mx-auto px-4">
        {/* Image Container */}
        <div className="border-4 mt-12 border-gray-800 rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/car.jpg"
            alt="Car service"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        {/* Heading */}
        <h3 className="text-center text-3xl font-extrabold text-cyan-400 mt-6">
          About Us
        </h3>

        {/* Content */}
        <p className="text-gray-200 text-lg font-medium text-center mt-3 tracking-tight leading-relaxed max-w-3xl mx-auto px-2">
          From quick rides in bikes and cars to spotless cleaning and premium grooming, 
          <span className="text-cyan-400 font-semibold"> Click </span>
          connects you to trusted services with just a tap.
        </p>
      </div>
    </div>
  );
};

export default About;

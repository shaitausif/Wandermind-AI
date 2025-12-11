"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import TopBar from "../../components/TopBar";
import SearchBar from "../../components/SearchBar";
import Footer from "../../components/Footer";

export default function InteractiveHome() {
  const [mounted, setMounted] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "🌍 Explore the World with AI";

  const [currentDestination, setCurrentDestination] = useState("");

  // NEW STATES
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [particlePositions, setParticlePositions] = useState<
    { top: number; left: number }[]
  >([]);

  useEffect(() => {
    setMounted(true);
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 100);

    const positions = [...Array(10)].map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
    }));
    setParticlePositions(positions);
  }, []);

  // ⭐ BACKEND REQUEST FOR PLACES
  const fetchPlaces = async (query: string) => {
    
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500">
      {/* Top Navbar */}
      <TopBar />

      {/* HERO SECTION */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden">
        <motion.div
          className="absolute inset-0 -z-10"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            background:
              "linear-gradient(135deg, #6EE7B7 0%, #3B82F6 50%, #9333EA 100%)",
            backgroundSize: "400% 400%",
          }}
        />

        {mounted && (
          <motion.div
            className="absolute w-full h-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          >
            {particlePositions.map((pos, idx) => (
              <div
                key={idx}
                className="absolute w-4 h-4 bg-yellow-300 rounded-full opacity-50"
                style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
              />
            ))}
          </motion.div>
        )}

        <div className="relative z-10 flex flex-col items-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white">
            {typedText}
            <span className="blinking-cursor">|</span>
          </h1>

          <p className="text-white/80 mt-4 text-lg md:text-xl max-w-2xl animate-bounceFade">
            Personalized itineraries, hidden gems, local food tips & more —
            instantly!
          </p>

          {/* Search Section */}
          <motion.div
            className="mt-10 bg-white rounded-3xl shadow-2xl p-6 max-w-3xl w-full cursor-pointer"
            whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
          >
            <SearchBar
              currentQuery={currentDestination}
              setCurrentQuery={setCurrentDestination}
              onSearch={fetchPlaces}
            />
          </motion.div>
        </div>
      </section>

      {/* RESULTS SECTION (CARDS) */}
      <section className="flex flex-col items-center px-4 md:px-8 -mt-20 z-10 w-full">
        {loading && (
          <motion.div
            className="mt-8 text-white font-semibold text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Generating your travel recommendations...
          </motion.div>
        )}

        {error && (
          <p className="text-red-300 font-medium mt-4">{error}</p>
        )}

        {!loading && places.length > 0 && (
          <motion.div
            className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {places.map((place, idx) => (
              <div
                key={idx}
                className="bg-white shadow-lg rounded-xl p-4 flex flex-col gap-3"
              >
                <h3 className="text-xl font-bold">{place.name}</h3>
                <p className="text-gray-600 text-sm">{place.description}</p>

                {/* Embed Map */}
                {place.lat && place.lng ? (
                  <iframe
                    width="100%"
                    height="180"
                    className="rounded-lg"
                    style={{ border: 0 }}
                    loading="lazy"
                    src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&q=${place.lat},${place.lng}`}
                  ></iframe>
                ) : (
                  <p className="text-red-500 text-sm">Location not found</p>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </section>

      {/* POPULAR DESTINATIONS */}
      <section className="relative z-10 w-full px-6 md:px-12 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">
          Popular Destinations
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: "Japan", img: "/images/japan.avif" },
            { name: "Italy", img: "/images/italy.jpeg" },
            { name: "Brazil", img: "/images/brazil.png" },
            { name: "Australia", img: "/images/australia.jpeg" },
          ].map((country, idx) => (
            <motion.div
              key={idx}
              className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={country.img}
                alt={country.name}
                className="w-full h-56 object-cover group-hover:brightness-75 transition-all duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  className="text-white text-2xl font-bold opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.4 }}
                >
                  {country.name}
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />

      {/* Cursor Blink Animation */}
      <style jsx>{`
        .blinking-cursor {
          display: inline-block;
          width: 1ch;
          animation: blink 1s step-start infinite;
        }
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

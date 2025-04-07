
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import activities from "../dataJson/activitiesData.json"; // Pfad anpassen
import faqData from "../dataJson/faqData.json";
import mainBild from "../assets/imageNaheeda/main5.jpg"
import { FaArrowLeft, FaArrowUp, FaEnvelope, FaPhoneAlt, FaChevronDown  } from "react-icons/fa";
import NavbarMini from "../components/navbarMini/NavbarMini";

import "../styles/extra.css";


const MainSection = () => {
  return (
    <div className="relative h-[86vh] w-full overflow-hidden">
      {/* Hintergrundbild */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${mainBild})`,
          backgroundAttachment: "fixed",
        }}
      />

      {/* Text im Vordergrund */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm text-white text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-bold mb-12" style={{ fontFamily: 'Merriweather, serif' }}
        >
          Entdecke unsere exklusiven Aktivitäten
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xl md:text-2xl max-w-3xl" style={{ fontFamily: 'Merriweather, serif' }}
        >
          Von luxuriösen Spa-Erlebnissen bis zu aufregenden Abenteuern –
          gestalte deinen perfekten Aufenthalt.
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 text-white text-3xl opacity-80"
        >
          <FaChevronDown />
        </motion.div>
      </div>
    </div>
  );
};


const ActivitySection = ({ title, description, image }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${image})`, backgroundAttachment: "fixed" }}
      />
     <div className="relative z-10 h-1/2 w-full flex items-center justify-center bg-white/70 backdrop-blur-sm">
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="max-w-4xl px-8 text-center"
  >
    <h2 className="text-4xl font-bold text-teal-dark mb-12" style={{ fontFamily: 'Merriweather, serif' }}>{title}</h2>
    <p className="text-lg text-gray-600 leading-relaxed" >{description}</p>
  </motion.div>
</div>

      <div className="relative z-0 h-1/2 w-full" />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-white text-3xl opacity-70"
        >
          ↓
        </motion.div>
      </div>
    </div>
  );
};
const Accordion = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#d6cfc9] pb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex justify-between items-center py-4 font-semibold text-lg"
      >
        {question}
        <span className="text-2xl text-caramel">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <p className="text-md text-gray-600 pl-2 pr-4 transition-all duration-300" >
          {answer}
        </p>
      )}
    </div>
  );
};

const ContactSection = () => {
  const scrollToTop = () => {
    // window.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-[#f9f4ef] text-teal-dark py-16 px-6 md:px-12" >
      {/* FAQ-Bereich */}
      <h2
        className="text-3xl font-bold mb-8 text-center"
        style={{ fontFamily: "Merriweather, serif" }}
      >
        Fragen & Antworten
      </h2>
      <div className="max-w-4xl mx-auto space-y-4 mb-16">
        {faqData.map((faq, idx) => (
          <Accordion key={idx} question={faq.question} answer={faq.answer} />
        ))}
      </div>

{/* Kontakt & Buttons Wrapper */}
<div className="mt-16 text-center text-teal-dark">
  <h3
    className="text-xl font-semibold mb-4"
    style={{ fontFamily: "Merriweather, serif" }}
  >
    Noch Fragen zu unseren Aktivitäten?
  </h3>

  <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm font-medium">
  {/* Nachricht schreiben */}
  <div className="flex items-center gap-2 group">
    <FaEnvelope className="text-caramel text-base" />
    <span className="font-semibold relative group-hover:underline group-hover:underline-offset-4">
      kontakt@myluxzen.com
    </span>
  </div>

  {/* Trennstrich */}
  <span className="hidden sm:inline text-gray-400">|</span>

  {/* Anruf */}
  <div className="flex items-center gap-2 group">
    <FaPhoneAlt className="text-caramel text-base" />
    <span className="font-semibold relative group-hover:underline group-hover:underline-offset-4">
      +49 123 456 789
    </span>
  </div>
</div>

</div>

  {/* Buttons darunter */}
  <div className="flex justify-center gap-4 mt-6 flex-wrap">
    <button className="bg-caramel hover:bg-[#0e5756] text-white py-2 px-4 rounded flex items-center gap- text-sm ">
      <FaArrowLeft /> Aktivitäten buchen
    </button>
    <button
      onClick={scrollToTop}
      className="bg-caramel hover:bg-[#0e5756] text-white py-2 px-4 rounded flex items-center gap-2 text-sm"
    >
      <FaArrowUp /> Nach oben scrollen
    </button>
  </div>
    </div>
  );
};

const ActivitiesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full">
      <NavbarMini />
      <MainSection />
      {activities.map((act, idx) => (
        <ActivitySection
          key={idx}
          title={act.title}
          description={act.description}
          image={act.image}
        />
      ))}
      <ContactSection />
    </div>
  );
};

export default ActivitiesPage;
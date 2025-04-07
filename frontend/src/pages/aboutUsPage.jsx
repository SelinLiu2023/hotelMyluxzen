import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import aboutUs from "../dataJson/aboutUnsData.json";
import NavbarMini from "../components/navbarMini/NavbarMini";
import "../styles/extra.css";
import aboutUsImgMinas from "../assets/aboutUsImg/Minas1.jpg";
import aboutUsImgNaheeda from "../assets/aboutUsImg/Naheeda1.jpg";
import aboutUsImgXiangyu from "../assets/aboutUsImg/Xiangyu.jpg";
import aboutUsImgFatima from "../assets/aboutUsImg/Fatima.jpg";
import aboutUsImg1 from "../assets/aboutUsImg/aboutUsBild.jpg";
import aboutUsImg2 from "../assets/aboutUsImg/aboutUsBild-2.png";
import aboutUsImg3 from "../assets/aboutUsImg/aboutUsBild-6.jpg";
import aboutUsImg4 from "../assets/aboutUsImg/first.webp";
import teamBg from "../assets/aboutUsImg/kayak1.avif";
import Footer from "../components/footer/Footer";
import { FaArrowLeft, FaArrowUp, FaEnvelope, FaPhone } from "react-icons/fa";

const InfoSection = ({ title, description, image }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center py-20">
      <div
        className="absolute inset-0 bg-cover bg-center filter brightness-90"
        style={{
          backgroundImage: `url(${image})`,
          backgroundAttachment: "fixed",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        viewport={{ once: true }}
        className="relative z-10 w-full max-w-4xl bg-white/90 backdrop-blur-lg p-12 md:p-16 rounded-3xl text-center shadow-2xl"
      >
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0, scale: 1.05 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 120,
            delay: 0.3,
          }}
          className="text-4xl font-bold text-teal-700 mb-6"
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 120,
            delay: 0.5,
          }}
          className="text-lg text-gray-800 leading-relaxed"
        >
          {description}
        </motion.p>
      </motion.div>
    </div>
  );
};

const UnserTeamSection = () => {
  const teamMembers = [
    {
      name: "Fatima Zahra Azekraoui",
      image: aboutUsImgFatima,
      description:
        "Fatima ist die Gründerin von Myluxzen, die mit viel Leidenschaft und Vision das Hotel erschaffen hat. Ihr Ziel ist es, Gästen unvergessliche Erlebnisse in einem luxuriösen und entspannten Ambiente zu bieten.",
    },
    {
      name: "Minas Ayoun Alsoud",
      image: aboutUsImgMinas,
      description:
        "Minas ist Mitbegründerin von Myluxzen und sorgt dafür, dass jeder Aufenthalt der Gäste ein perfektes Erlebnis wird. Ihr Augenmerk liegt auf exzellentem Service und einem hohen Standard in jeder Hinsicht.",
    },
    {
      name: "Naheeda Tokhi",
      image: aboutUsImgNaheeda,
      description:
        "Naheeda ist Mitgründerin und die kreative Seele von Myluxzen. Sie sorgt dafür, dass jede Unterkunft einladend und einzigartig gestaltet ist, um den Gästen ein Gefühl von Luxus und Komfort zu vermitteln.",
    },
    {
      name: "Xiangyu Liu",
      image: aboutUsImgXiangyu,
      description:
        "Xiangyu ist Mitgründerin und die organisatorische Stütze von Myluxzen. Sie sorgt dafür, dass alle Prozesse reibungslos ablaufen und jeder Gast die bestmögliche Erfahrung während seines Aufenthalts hat.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen py-20 px-6 bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${teamBg})` }}
    >
      <div className="max-w-7xl mx-auto text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold text-teal-dark mb-12"
          style={{ fontFamily: "Merriweather, serif" }}
        >
          Unser Team
        </motion.h1>
      </div>

      <div className="flex flex-wrap justify-center gap-8 mt-10">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full md:w-1/2 lg:w-1/4 xl:w-1/5"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-80 object-cover rounded-lg mb-4"
            />
            <div className="relative z-10 p-4 text-center">
              <h2 className="text-2xl font-semibold text-white">
                {member.name}
              </h2>
              <p className="text-lg text-white mt-5">{member.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const AboutUsPage = () => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);
  const aboutUsData = [
    {
      title: "MyLuxzen",
      description:
        "MyLuxzen ist eine exklusive Plattform für die Buchung von Luxusferienwohnungen. Genießen Sie einen luxuriösen Aufenthalt an den schönsten Reisezielen. Unser Ziel ist es, Ihnen unvergessliche Erlebnisse in den exklusivsten Unterkünften zu bieten, die nur das Beste für Sie bereithalten.",

      image: aboutUsImg1,
    },
    {
      title: "Über MyLuxzen",
      description:
        "Bei MyLuxzen finden Sie nicht nur eine Unterkunft, sondern ein Erlebnis. Wir bieten handverlesene Luxusvillen und exklusive Resorts an, die Ihnen den höchsten Komfort und erstklassigen Service bieten. Jede unserer Unterkünfte wurde sorgfältig ausgewählt, um Ihnen das Gefühl von Ruhe und Luxus zu vermitteln, während Sie gleichzeitig an atemberaubenden Reisezielen verweilen. Unser Team ist stets bemüht, Ihre Wünsche zu erfüllen und Ihre Erwartungen zu übertreffen – damit Sie sich während Ihres Aufenthalts bei uns vollkommen entspannen können.",

      image: aboutUsImg2,
    },
    {
      title: "Unsere Häuser und Unterkünfte",
      description:
        "Unsere exklusiven Häuser und Villen wurden mit Liebe zum Detail ausgewählt. Jedes Haus bietet nicht nur Luxus, sondern auch atemberaubende Ausblicke und erstklassigen Service. Wir bieten verschiedene Arten von Ferienhäusern, die auf Ihre individuellen Bedürfnisse zugeschnitten sind. Von modernen Luxusvillen bis zu traditionellen, charmanten Unterkünften haben wir für jedes Paar oder jede Familie die perfekte Option. Unsere Luxusvillen verfügen über private Pools, exklusive Strandhäuser, erstklassige Spas und elegante Innenräume mit großzügigen Wohnbereichen.",

      image: aboutUsImg3,
    },
    {
      title: "Warum MyLuxzen?",
      description:
        "Wir von MyLuxzen haben es uns zur Aufgabe gemacht, Ihnen nicht nur eine Unterkunft zu bieten, sondern ein einzigartiges Erlebnis. Unsere persönliche Beratung und maßgeschneiderten Angebote stellen sicher, dass Ihr Aufenthalt perfekt auf Ihre Wünsche abgestimmt ist. Mit unserem 24/7 Concierge-Service stehen wir Ihnen jederzeit zur Verfügung, um Ihre Bedürfnisse zu erfüllen. Unsere handverlesenen Unterkünfte bieten luxuriöse Ausstattung und exklusive Annehmlichkeiten, die höchsten Komfort garantieren. Darüber hinaus erwarten Sie unvergessliche Erlebnisse und zahlreiche Aktivitäten in der Umgebung, die Ihren Aufenthalt zu etwas ganz Besonderem machen.",

      image: aboutUsImg4,
    },
  ];

  return (
    <div className="w-full">
      <NavbarMini />
      <UnserTeamSection />

      {/* <MainSection /> */}
      {aboutUsData.map((ab, idx) => (
        <InfoSection
          key={idx}
          title={ab.title}
          description={ab.description}
          image={ab.image}
        />
      ))}

      <Footer />
    </div>
  );
};

export default AboutUsPage;

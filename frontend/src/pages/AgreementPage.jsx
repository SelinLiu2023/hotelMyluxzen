import React, { useEffect } from "react";
import NavbarMini from "../components/navbarMini/NavbarMini";
import Footer from "../components/footer/Footer";

import agreementBg from "../assets/agreementImg/agreement-bg.png";
import agreement1 from "../assets/agreementImg/agreement-1.png";
import agreement3 from "../assets/agreementImg/agreement-3.png";
import agreement4 from "../assets/agreementImg/agreement-4.png";
import agreement5 from "../assets/agreementImg/agreement-5.png";

const InfoSection = ({ title, description, image, reverseLayout }) => {
  return (
    <div
      className={`flex flex-col lg:flex-row items-center justify-between py-16 px-6 ${
        reverseLayout ? "lg:flex-row-reverse" : "lg:flex-row"
      } space-y-8 lg:space-y-0 lg:space-x-12`}
    >
      <div
        className={`w-full lg:w-1/2 text-center lg:text-left ${
          reverseLayout ? "lg:pl-12" : "lg:pr-12"
        }`}
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-teal-700 mb-4">
          {title}
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">{description}</p>
      </div>

      <div className="w-full lg:w-1/2">
        <img
          src={image}
          alt={title}
          className="w-full h-auto rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
};

// Hauptseite der Vereinbarung
const AgreementPage = () => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);
  return (
    <div className="w-full">
      <NavbarMini />

      {/* Hauptsektion für AGB */}
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center text-white px-6"
        style={{ backgroundImage: `url(${agreementBg})` }}
      >
        {/* <div className="text-center bg-black/50 p-12 rounded-3xl shadow-2xl w-full max-w-4xl">
          <h1
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: "Merriweather, serif" }}
          >
            Allgemeine Geschäftsbedingungen
          </h1>
          <p
            className="text-xl md:text-2xl max-w-3xl"
            style={{ fontFamily: "Merriweather, serif" }}
          >
            Lesen Sie unsere Allgemeinen Geschäftsbedingungen, um mehr über
            unsere Richtlinien zu erfahren.
          </p>
        </div> */}
        <div className="mx-auto w-full max-w-4xl p-4 sm:p-8 md:p-12 bg-black/50 rounded-3xl shadow-2xl text-center">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"
            style={{ fontFamily: "Merriweather, serif" }}
          >
            Allgemeine Geschäftsbedingungen
          </h1>
          <p
            className="text-base sm:text-lg md:text-2xl max-w-3xl mx-auto"
            style={{ fontFamily: "Merriweather, serif" }}
          >
            Lesen Sie unsere Allgemeinen Geschäftsbedingungen, um mehr über
            unsere Richtlinien zu erfahren.
          </p>
        </div>
      </div>

      <InfoSection
        title="Check-in und Check-out Zeiten"
        description="Die Check-in-Zeit beginnt um 15:00 Uhr und der Check-out muss bis spätestens 11:00 Uhr erfolgen. Sollten Sie zu einem späteren Zeitpunkt anreisen, bitten wir Sie, uns vorher zu benachrichtigen."
        image={agreement1}
        reverseLayout={false}
      />

      <InfoSection
        title="Stornierungsrichtlinien"
        description="Stornierungen sind bis zu 24 Stunden vor dem geplanten Check-in kostenlos möglich. Bei späteren Stornierungen oder No-Shows fällt eine Gebühr von 50 % des Gesamtbetrags an."
        image={agreement3}
        reverseLayout={true}
      />

      <InfoSection
        title="Haftungsausschluss"
        description="Wir übernehmen keine Haftung für verloren gegangene oder gestohlene Gegenstände während des Aufenthalts. Es wird empfohlen, persönliche Wertgegenstände sicher zu verwahren."
        image={agreement4}
        reverseLayout={false}
      />

      <InfoSection
        title="Zahlungsrichtlinien"
        description="Die Bezahlung ist bei der Ankunft zu leisten. Wir akzeptieren Bargeld, Kredit- und Debitkarten. Eine Vorauszahlung wird in bestimmten Fällen erforderlich sein."
        image={agreement5}
        reverseLayout={true}
      />

      <Footer />
    </div>
  );
};

export default AgreementPage;

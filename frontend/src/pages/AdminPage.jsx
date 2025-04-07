import { useContext, useState } from "react";
import { NavLink, Outlet, useNavigate, Navigate } from "react-router-dom";
import {
  Menu,
  X,
  LogOut,
  Home,
  Image as ImageIcon,
  Mail,
  Book,
  Calendar,
  Building2,
  Star,
} from "lucide-react";
import AuthContext from "../context/AuthContext";
import logo from "../../src/assets/img/logo-motif-only-circular.png";

export function AdminPage() {
  const { user, loading, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  if (loading) {
    return <div className="text-center p-10 text-xl">Admin-Bereich wird geladen...</div>;
  }

  if (!loading && (!user || !user.isAuthenticated || !user.isAdmin)) {
    return <Navigate to="/" replace />;
  }

  const links = [
    { to: "bookings-manage", label: "BuchungsVerhandlung", icon: Book },
    { to: "booking-timeline", label: "Buchungszeitlinie", icon: Calendar },
    { to: "singleHouse-query", label: "Häuseranfrage", icon: Building2 },
    { to: "gallery", label: "Galerie", icon: ImageIcon },
    { to: "HausBeschreibung", label: "HausBeschreibung", icon: Home },
    { to: "reviews", label: "Reviews", icon: Star },
    { to: "booking-dashboard", label: "Dashboard Buchungen", icon: Calendar },
    { to: "client-email-support", label: "E-Mail Support", icon: Mail },
  ];

  const getLinkClass = ({ isActive }) =>
    isActive
      ? "text-caramel border-b-2 border-caramel"
      : "text-off-white hover:text-caramel transition duration-200";

  const getIconClass = (isActive) =>
    isActive
      ? "text-caramel"
      : "text-off-white group-hover:text-caramel transition duration-200";

  const Navbar = () => (
    <aside className="hidden md:flex bg-teal-dark text-off-white w-64 flex-col p-4 h-screen fixed top-0 left-0 z-[999]">
      <div className="flex items-center space-x-3 mb-6">
        <img src={logo} alt="Logo" className="w-14 h-14 object-contain" />
        <h2 className="text-2xl font-bold text-caramel">Admin</h2>
      </div>
      <ul className="space-y-4 mb-8 text-sm font-haute-couture uppercase tracking-wide">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            to={to}
            key={to}
            className={({ isActive }) =>
              `group flex items-center space-x-2 ${getLinkClass({ isActive })}`
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center">
                  <Icon className={`${getIconClass(isActive)} hidden md:inline`} size={24} />
                  <Icon className={`${getIconClass(isActive)} md:hidden`} size={20} />
                </div>
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </ul>
      <button
        onClick={() => {
          logout();
          navigate("/auth?register=false");
        }}
        className="mt-auto flex items-center space-x-2 bg-caramel text-white font-semibold py-1 px-3 rounded hover:bg-chocolate hover:scale-105 transition-transform duration-200"
      >
        <LogOut size={18} />
        <span>Abmelden</span>
      </button>
    </aside>
  );

  const MobileSidebar = () => (
    <aside
      className={`md:hidden bg-teal-dark text-off-white fixed top-0 left-0 z-50 p-4 shadow-md transition-all duration-300 h-screen ${sidebarExpanded ? "w-64" : "w-20"}`}
    >
      <div className="flex flex-col items-center space-y-3 mb-6">
        <img src={logo} alt="Logo" className="w-14 h-14 object-contain" />
        <button
          className="bg-caramel text-white p-2 rounded-full shadow-md hover:bg-chocolate hover:scale-105 transition"
          onClick={() => setSidebarExpanded(!sidebarExpanded)}
        >
          {sidebarExpanded ? <X size={20} /> : <Menu size={20} />}
        </button>
        {sidebarExpanded && <h2 className="text-2xl font-bold text-caramel">Admin</h2>}
      </div>

      <ul className="space-y-4 mb-8 text-sm font-haute-couture uppercase tracking-wide">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            to={to}
            key={to}
            className={({ isActive }) =>
              `group flex items-center space-x-3 ${getLinkClass({ isActive })}`
            }
            onClick={() => setSidebarExpanded(false)}
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center">
                  <Icon className={`${getIconClass(isActive)} hidden md:inline`} size={24} />
                  <div className="relative group flex items-center justify-center">
                    <Icon
                      className={`${getIconClass(isActive)} md:hidden`}
                      size={20}
                    />
                    {!sidebarExpanded && (
                      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-[9999] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-caramel text-white text-xs px-3 py-1 rounded-lg shadow-lg whitespace-nowrap">
                          {label}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {sidebarExpanded && <span>{label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </ul>

      <button
        onClick={() => {
          logout();
          navigate("/auth?register=false");
        }}
        className={`mt-auto flex items-center ${
          sidebarExpanded ? "justify-start space-x-2 px-3" : "justify-center"
        } bg-caramel text-white font-semibold py-2 px-2 rounded hover:bg-chocolate hover:scale-105 transition-transform duration-200`}
      >
        <LogOut size={18} />
        {sidebarExpanded && <span>Abmelden</span>}
      </button>
    </aside>
  );

  return (
    <div className="flex bg-white min-h-screen">
      <Navbar />
      <MobileSidebar />

      <div className="flex-1 ml-0 md:ml-64 flex flex-col">
      <main
  className={`
    relative z-0 flex-1 overflow-visible p-6 transition-all duration-300
    ${sidebarExpanded ? "pl-64" : "pl-20"}  // padding-left dynamique selon sidebar mobile
    md:pl-0                                // en grand écran, plus de padding
    md:max-w-5xl md:mx-auto                // centrage uniquement sur md+
  `}
>
  <Outlet />
</main>
      </div>
    </div>
  );
}

/*import { useContext, useState } from "react";
import { NavLink, Outlet, useNavigate, Navigate } from "react-router-dom";
import {
  Menu,
  X,
  LogOut,
  Home,
  Image as ImageIcon,
  Mail,
  Book,
  Calendar,
  Building2,
  Star,
} from "lucide-react";
import AuthContext from "../context/AuthContext";
import logo from "../../public/logo-motif-only-circular.png";

export function AdminPage() {
  const { user, loading, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  if (loading) {
    return <div className="text-center p-10 text-xl">Admin-Bereich wird geladen...</div>;
  }

  if (!loading && (!user || !user.isAuthenticated || !user.isAdmin)) {
    return <Navigate to="/" replace />;
  }

  const links = [
    { to: "bookings-manage", label: "BuchungsVerhandlung", icon: Book },
    { to: "booking-timeline", label: "Reservierungszeitlinie", icon: Calendar },
    { to: "singleHouse-query", label: "Häuseranfrage", icon: Building2 },
    { to: "gallery", label: "Galerie", icon: ImageIcon },
    { to: "HausBeschreibung", label: "HausBeschreibung", icon: Home },
    { to: "reviews", label: "Reviews", icon: Star },
    { to: "booking-dashboard", label: "Dashboard Buchungen", icon: Calendar },
    { to: "client-email-support", label: "E-Mail Support", icon: Mail },
  ];

  const getLinkClass = ({ isActive }) =>
    isActive
      ? "text-caramel border-b-2 border-caramel"
      : "text-off-white hover:text-caramel transition duration-200";

  const getIconClass = (isActive) =>
    isActive
      ? "text-caramel"
      : "text-off-white group-hover:text-caramel transition duration-200";

  const Navbar = () => (
    <aside className="hidden md:flex bg-teal-dark text-off-white w-64 flex-col p-4 overflow-y-auto h-screen fixed top-0 left-0 z-30">
      <div className="flex items-center space-x-3 mb-6">
        <img src={logo} alt="Logo" className="w-14 h-14 object-contain" />
        <h2 className="text-2xl font-bold text-caramel">Admin</h2>
      </div>
      <ul className="space-y-4 mb-8 text-sm font-haute-couture uppercase tracking-wide">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            to={to}
            key={to}
            className={({ isActive }) =>
              `group flex items-center space-x-2 ${getLinkClass({ isActive })}`
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center">
                  <Icon className={`${getIconClass(isActive)} hidden md:inline`} size={24} />
                  <Icon className={`${getIconClass(isActive)} md:hidden`} size={20} />
                </div>
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </ul>
      <button
        onClick={() => {
          logout();
          navigate("/auth?register=false");
        }}
        className="mt-auto flex items-center space-x-2 bg-caramel text-white font-semibold py-1 px-3 rounded hover:bg-chocolate hover:scale-105 transition-transform duration-200"
      >
        <LogOut size={18} />
        <span>Abmelden</span>
      </button>
    </aside>
  );

  const MobileSidebar = () => (
    <aside
      className={`md:hidden bg-teal-dark text-off-white fixed top-0 left-0 z-40 p-4 shadow-md transition-all duration-300 h-screen overflow-y-auto ${
        sidebarExpanded ? "w-64" : "w-20"
      }`}
    >
      <div className="flex flex-col items-center space-y-3 mb-6">
        <img src={logo} alt="Logo" className="w-14 h-14 object-contain" />
        <button
          className="bg-caramel text-white p-2 rounded-full shadow-md hover:bg-chocolate hover:scale-105 transition"
          onClick={() => setSidebarExpanded(!sidebarExpanded)}
        >
          {sidebarExpanded ? <X size={20} /> : <Menu size={20} />}
        </button>
        {sidebarExpanded && <h2 className="text-2xl font-bold text-caramel">Admin</h2>}
      </div>

      
      <ul className="space-y-4 mb-8 text-sm font-haute-couture uppercase tracking-wide">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            to={to}
            key={to}
            className={({ isActive }) =>
              `group flex items-center space-x-3 ${getLinkClass({ isActive })}`
            }
            onClick={() => setSidebarExpanded(false)}
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center">
                  <Icon className={`${getIconClass(isActive)} hidden md:inline`} size={24} />
                  <Icon className={`${getIconClass(isActive)} md:hidden`} size={20} />
                </div>
                {sidebarExpanded && <span>{label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </ul>

     
      <button
        onClick={() => {
          logout();
          navigate("/auth?register=false");
        }}
        className={`mt-auto flex items-center ${
          sidebarExpanded ? "justify-start space-x-2 px-3" : "justify-center"
        } bg-caramel text-white font-semibold py-2 px-2 rounded hover:bg-chocolate hover:scale-105 transition-transform duration-200`}
      >
        <LogOut size={18} />
        {sidebarExpanded && <span>Abmelden</span>}
      </button>
    </aside>
  );

  return (
    <div className="flex bg-white min-h-screen">
      <Navbar />
      <MobileSidebar />

      <div className="flex-1 ml-0 md:ml-64 flex flex-col overflow-hidden">
        
        <main
          className={`flex-1 overflow-y-auto p-6 max-w-5xl mx-auto transition-all duration-300 pl-20 md:pl-0`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
/*import { NavLink, Outlet } from "react-router-dom";

export function AdminPage() {
  const Navbar = () => {
    const getLinkClass = ({ isActive }) =>
      isActive
        ? "text-caramel border-b-2 border-caramel"
        : "text-off-white hover:text-caramel";

    return (
      <nav className="bg-teal-dark text-off-white px-6 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-tan-angleton text-peach tracking-wider">
            Admin Panel
          </h1>

          <ul className="flex flex-wrap gap-6 text-sm font-haute-couture uppercase tracking-wide">
            <li>
              <NavLink to="bookings-manage" className={getLinkClass}>
                BuchungsVerhandlung
              </NavLink>
            </li>
            <li>
              <NavLink to="singleHouse-query" className={getLinkClass}>
                Häuseranfrage
              </NavLink>
            </li>
            <li>
              <NavLink to="booking-edit" className={getLinkClass}>
                Buchungsticket bearbeiten
              </NavLink>
            </li>
            <li>
              <NavLink to="gallery" className={getLinkClass}>
                Galerie
              </NavLink>
            </li>
            <li>
              <NavLink to="booking-dashboard" className={getLinkClass}>
                Dashboard Buchungen
              </NavLink>
            </li>
            <li>
              <NavLink to="client-email-support" className={getLinkClass}>
                E-Mail Support
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
*/
/*import { useContext, useState } from "react";
import { NavLink, Outlet, useNavigate, Navigate } from "react-router-dom";
import {
  Menu, X, LogOut, Home, Image as ImageIcon, Mail,
  Book, Calendar, Building2, Star
} from "lucide-react";
import AuthContext from "../context/AuthContext";
import logo from "../assets/img/imgHome/logo.png";

export function AdminPage() {
  const { user, loading, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  if (loading) {
    return <div className="text-center p-10 text-xl">Admin-Bereich wird geladen...</div>;
  }

  if (!loading && (!user || !user.isAuthenticated || !user.isAdmin)) {
    return <Navigate to="/" replace />;
  }

  const links = [
    { to: "bookings-manage", label: "BuchungsVerhandlung", icon: Book },
    { to: "booking-timeline", label: "Reservierungszeitlinie", icon: Calendar },
    { to: "singleHouse-query", label: "Häuseranfrage", icon: Building2 },
    { to: "gallery", label: "Galerie", icon: ImageIcon },
    { to: "HausBeschreibung", label: "HausBeschreibung", icon: Home },
    { to: "reviews", label: "Reviews", icon: Star },
    { to: "booking-dashboard", label: "Dashboard Buchungen", icon: Calendar },
    { to: "client-email-support", label: "E-Mail Support", icon: Mail },
  ];

  const getLinkClass = ({ isActive }) =>
    isActive ? "text-[#FAE1A8] underline underline-offset-4" : "hover:text-[#FAE1A8]";

  const Navbar = () => (
    <aside className="bg-gray-900 text-white w-64 h-screen sticky top-0 flex flex-col p-4 overflow-y-auto">
      <div className="flex items-center space-x-3 mb-6">
        <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
        <h2 className="text-2xl font-bold">Admin Bereich</h2>
      </div>
      <ul className="space-y-4 flex-1">
        {links.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex items-center space-x-2">
            <Icon size={20} />
            <NavLink to={to} className={getLinkClass}>{label}</NavLink>
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          logout();
          navigate("/auth?register=false");
        }}
        className="mt-4 flex items-center space-x-2 bg-white text-black font-semibold py-1 px-3 rounded hover:bg-gray-200 transition-colors"
      >
        <LogOut size={18} /> <span>Abmelden</span>
      </button>
    </aside>
  );

  const MobileNavbar = () => (
    <div className="bg-gray-900 text-white p-4 flex md:hidden items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
        <h2 className="text-xl font-semibold">Admin</h2>
      </div>
      <button onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-gray-800 p-4 z-50 overflow-y-auto max-h-[80vh]">
          <ul className="space-y-4">
            {links.map(({ to, label, icon: Icon }) => (
              <li key={to} className="flex items-center space-x-2">
                <Icon size={18} />
                <NavLink to={to} className={getLinkClass} onClick={() => setMenuOpen(false)}>{label}</NavLink>
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              logout();
              navigate("/auth?register=false");
              setMenuOpen(false);
            }}
            className="mt-6 flex items-center space-x-2 bg-white text-black font-semibold py-1 px-3 rounded hover:bg-gray-200 transition-colors"
          >
            <LogOut size={18} /> <span>Abmelden</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1 overflow-y-auto max-h-screen">
        <MobileNavbar />
        <Outlet />
      </div>
    </div>
  );
}

*/
/*import { useContext, useState } from "react";
import { NavLink, Outlet, useNavigate, Navigate } from "react-router-dom";
import {
  Menu,
  X,
  LogOut,
  Home,
  Image as ImageIcon,
  Mail,
  Book,
  Calendar,
  Building2,
  Star,
} from "lucide-react";
import AuthContext from "../context/AuthContext";
import logo from "../../public/logo-motif-only-circular.png";

export function AdminPage() {
  const { user, loading, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  if (loading) {
    return <div className="text-center p-10 text-xl">Admin-Bereich wird geladen...</div>;
  }

  if (!loading && (!user || !user.isAuthenticated || !user.isAdmin)) {
    return <Navigate to="/" replace />;
  }

  const links = [
    { to: "bookings-manage", label: "BuchungsVerhandlung", icon: Book },
    { to: "booking-timeline", label: "Reservierungszeitlinie", icon: Calendar },
    { to: "singleHouse-query", label: "Häuseranfrage", icon: Building2 },
    { to: "gallery", label: "Galerie", icon: ImageIcon },
    { to: "HausBeschreibung", label: "HausBeschreibung", icon: Home },
    { to: "reviews", label: "Reviews", icon: Star },
    { to: "booking-dashboard", label: "Dashboard Buchungen", icon: Calendar },
    { to: "client-email-support", label: "E-Mail Support", icon: Mail },
  ];

  const getLinkClass = ({ isActive }) =>
    isActive
      ? "text-caramel border-b-2 border-caramel"
      : "text-off-white hover:text-caramel transition duration-200";

  const getIconClass = (isActive) =>
    isActive
      ? "text-caramel"
      : "text-off-white group-hover:text-caramel transition duration-200";

  const Navbar = () => (
    <aside className="hidden md:flex bg-teal-dark text-off-white w-64 flex-col p-4 overflow-y-auto h-screen fixed top-0 left-0 z-30">
      <div className="flex items-center space-x-3 mb-6">
        <img src={logo} alt="Logo" className="w-14 h-14 object-contain" />
        <h2 className="text-2xl font-bold text-caramel">Admin</h2>
      </div>
      <ul className="space-y-4 mb-8 text-sm font-haute-couture uppercase tracking-wide">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            to={to}
            key={to}
            className={({ isActive }) =>
              `group flex items-center space-x-2 ${getLinkClass({ isActive })}`
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center">
                  <Icon className={`${getIconClass(isActive)} hidden md:inline`} size={24} />
                  <Icon className={`${getIconClass(isActive)} md:hidden`} size={20} />
                </div>
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </ul>
      <button
        onClick={() => {
          logout();
          navigate("/auth?register=false");
        }}
        className="mt-auto flex items-center space-x-2 bg-caramel text-white font-semibold py-1 px-3 rounded hover:bg-chocolate hover:scale-105 transition-transform duration-200"
      >
        <LogOut size={18} />
        <span>Abmelden</span>
      </button>
    </aside>
  );

  const MobileSidebar = () => (
    <aside
      className={`md:hidden bg-teal-dark text-off-white fixed top-0 left-0 z-40 p-4 shadow-md transition-all duration-300 h-screen overflow-y-auto ${
        sidebarExpanded ? "w-64" : "w-20"
      }`}
    >
      <div className="flex flex-col items-center space-y-3 mb-6">
        <img src={logo} alt="Logo" className="w-14 h-14 object-contain" />
        <button
          className="bg-caramel text-white p-2 rounded-full shadow-md hover:bg-chocolate hover:scale-105 transition"
          onClick={() => setSidebarExpanded(!sidebarExpanded)}
        >
          {sidebarExpanded ? <X size={20} /> : <Menu size={20} />}
        </button>
        {sidebarExpanded && <h2 className="text-2xl font-bold text-caramel">Admin</h2>}
      </div>

      
      <ul className="space-y-4 mb-8 text-sm font-haute-couture uppercase tracking-wide">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            to={to}
            key={to}
            className={({ isActive }) =>
              `group flex items-center space-x-3 ${getLinkClass({ isActive })}`
            }
            onClick={() => setSidebarExpanded(false)}
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center">
                  <Icon className={`${getIconClass(isActive)} hidden md:inline`} size={24} />
                  <Icon className={`${getIconClass(isActive)} md:hidden`} size={20} />
                </div>
                {sidebarExpanded && <span>{label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </ul>

     
      <button
        onClick={() => {
          logout();
          navigate("/auth?register=false");
        }}
        className={`mt-auto flex items-center ${
          sidebarExpanded ? "justify-start space-x-2 px-3" : "justify-center"
        } bg-caramel text-white font-semibold py-2 px-2 rounded hover:bg-chocolate hover:scale-105 transition-transform duration-200`}
      >
        <LogOut size={18} />
        {sidebarExpanded && <span>Abmelden</span>}
      </button>
    </aside>
  );

  return (
    <div className="flex bg-white min-h-screen">
      <Navbar />
      <MobileSidebar />

      <div className="flex-1 ml-0 md:ml-64 flex flex-col overflow-hidden">
        
        <main
          className={`flex-1 overflow-y-auto p-6 max-w-5xl mx-auto transition-all duration-300 pl-20 md:pl-0`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
*/

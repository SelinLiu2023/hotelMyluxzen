import { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import countryData from "../../dataJson/CountryCodes.json";
import createErrorHandler from "./ErrorHandler";


const AccountDetails = () => {
    const { user, setUser } = useContext(AuthContext);
    const [editingFields, setEditingFields] = useState({}); 
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const errorHandler = createErrorHandler(setErrors);
    const API_URL = import.meta.env.VITE_SERVER_URL;

    const [formData, setFormData] = useState({
        vorname: "",
        nachname: "",
        email: "",
        telefonnummer: "",
        landesvorwahl: "+49", // Standardwert
        address: {  //  Address als Standard-Objekt setzen
            land: "",
            straße: "",
            snummer: "",
            stadt: "",
            postleitzahl: "",
        },
    });
 
    // **Daten beim Start aus Backend laden**
   
    // **Beim Laden `formData` mit `user` befüllen**
    useEffect(() => {
        if (user) {
            setFormData({
                vorname: user.vorname || "",
                nachname: user.nachname || "",
                email: user.email || "",
                telefonnummer: user.telefonnummer || "",
                landesvorwahl: user.landesvorwahl || "+49",
                address: {
                    land: user.address?.land || "",
                    straße: user.address?.straße || "",
                    snummer: user.address?.snummer || "",
                    stadt: user.address?.stadt || "",
                    postleitzahl: user.address?.postleitzahl || "",
                },
            });
        }
    }, [user]);

    
    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name.startsWith("address.")) {
            const field = name.split(".")[1]; // "address.land" → "land"
            setFormData((prevData) => ({
                ...prevData,
                address: { 
                    ...prevData.address, 
                    [field]: value 
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };
    
    const handleSave = async () => {
        setErrors({});
        setSuccessMessage("");

        try {
            const response = await fetch(`${API_URL}/api/auth/profile`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.user);
                setFormData(data.user);
                setEditingFields({});
                setSuccessMessage("Deine Änderungen wurden erfolgreich gespeichert!");

                setTimeout(() => setSuccessMessage(""), 3000);
            } else {
                errorHandler(data);
            }
        } catch (error) {
            console.error("Fehler beim Speichern:", error);
            setErrors({ general: "Serverfehler, bitte später erneut versuchen." });
        }
    };


    // **Sofort Daten setzen, wenn auf "Bearbeiten" geklickt wird**
    const handleEditClick = (field) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: user[field] || "",
        }));
        setEditingFields({ [field]: true });
    };

    // **Abbrechen-Button setzt Originaldaten zurück**
    const handleCancel = (field) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: user[field] || "",
        }));
        setEditingFields((prev) => ({ ...prev, [field]: false }));
    };


    return (
        /*
        <div className="max-w-4xl mx-auto px-8 md:px-12 lg:px-16 py-8 bg-white shadow-lg rounded-2xl space-y-4">
        */
        <div className="max-w-5xl mx-auto p-8  bg-transparent space-y-4">
        <h2 className="text-4xl font-semibold mb-15 mt-5 text-[#0e5756] text-center"
            style={{ fontFamily: 'Merriweather, serif' }}>
            Persönliche Daten
        </h2>


{/* Vorname */}
<div className="p-6 bg-white shadow-lg  border-gray-200 rounded-none mb-6" >
    <h2 className="text-xl font-semibold text-[#0e5756]" style={{ fontFamily: 'Merriweather, serif' }}>Vorname</h2>
    {editingFields.vorname ? (
        <>
            <input
                type="text"
                name="vorname"
                value={formData.vorname}
                onChange={handleChange}
                className="w-full bg-white p-3 text-gray-600 border border-gray-300 mt-2 focus:border-[#116769] focus:outline-none shadow-sm"
            />
             {errors.vorname && <p className="text-[#9C785E] text-sm mt-1">{errors.vorname}</p>}
            <div className="flex justify-between mt-3">
                <button onClick={handleSave} className="px-4 py-2 bg-[#116769] cursor-pointer text-white border border-[#0e5756] rounded-md hover:bg-[#0e5756] transition duration-200">
                    Speichern
                </button>
                <button onClick={() => handleCancel("vorname")} className="text-gray-600 font-bold cursor-pointer hover:underline">
                    Abbrechen
                </button>
            </div>
        </>
    ) : (
        <div className="flex justify-between items-center mt-3">
            <p className="text-gray-600 text-lg">{user?.vorname || "Kein Vorname angegeben"}</p>
            <button 
                onClick={() => handleEditClick("vorname")} 
                className="text-[#0e5756] hover:text-[#116769] font-bold transition-all duration-200 cursor-pointer hover:underline"
            >
                Bearbeiten
            </button>
        </div>
    )}
</div>



   {/* Nachname */}
   <div className="p-6 bg-white shadow-lg  border-gray-200 rounded-none" >
                <h2 className="text-xl font-semibold text-[#0e5756]" style={{ fontFamily: 'Merriweather, serif' }}>Nachname</h2>
                {editingFields.nachname ? (
                    <>
                        <input
                            type="text"
                            name="nachname"
                            value={formData.nachname}
                            onChange={handleChange}
                            className="w-full bg-white p-3 text-gray-600 border border-gray-300 mt-2 focus:border-[#116769] focus:outline-none shadow-sm"
                        />
                        {errors.nachname && <p className="text-[#9C785E] text-sm mt-1">{errors.nachname}</p>}
                        <div className="flex justify-between mt-3">
                            <button onClick={handleSave} className="px-4 py-2 bg-[#116769] cursor-pointer text-white border border-[#0e5756] rounded-md hover:bg-[#0e5756] transition duration-200">
                                Speichern
                            </button>
                            <button onClick={() => handleCancel("nachname")} className="text-gray-600 font-bold cursor-pointer hover:underline">
                                Abbrechen
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex justify-between mt-3">
                        <p className="text-gray-600">{user?.nachname || "Kein Nachname angegeben"}</p>
                        <button onClick={() => handleEditClick("nachname")} className="text-[#0e5756] font-bold hover:text-[#116769] transition duration-200 cursor-pointer hover:underline">
                            Bearbeiten
                        </button>
                    </div>
                )}
            </div>

    

    
      {/* E-Mail (nur Anzeige, keine Bearbeitung) */}
      <div className="p-6 bg-white shadow-lg border-gray-200 rounded-none" >
                <h2 className="text-xl font-semibold text-[#0e5756]" style={{ fontFamily: 'Merriweather, serif' }}>E-Mail Adresse</h2>
                <p className="text-gray-600 mt-3">{user?.email || "Keine E-Mail angegeben"}</p>
            </div>

                       {/* Telefonnummer mit Vorwahl */}
                       <div className="p-6 bg-white shadow-lg  border-gray-200 rounded-none" >
                <h2 className="text-xl font-semibold text-[#0e5756]" style={{ fontFamily: 'Merriweather, serif' }}>Telefonnummer</h2>
                {editingFields.telefonnummer ? (
                    <>
                        <div className="flex space-x-3 mt-3">
                            {/* Landesvorwahl Dropdown */}
                            <select
                                name="landesvorwahl"
                                value={formData.landesvorwahl}
                                onChange={handleChange}
                                className="w-1/3 bg-[#e6f2f1] p-3 text-gray-600 border border-gray-300 focus:border-[#116769] focus:outline-none shadow-sm"
                            >
                                <option value="">Landes Vorwahl auswählen...</option>
                                {countryData.countryCodes.map((country, index) => (
                                    <option key={`${country.code}-${index}`} value={country.code} className="bg-white text-[#0e5756]">
                                        {country.name} ({country.code})
                                    </option>
                                ))}
                            </select>

                            {/* Telefonnummer Input */}
                            <input
                                type="text"
                                name="telefonnummer"
                                placeholder="Telefonnummer"
                                value={formData.telefonnummer}
                                onChange={handleChange}
                                className="w-2/3 bg-white p-3 text-gray-600 border border-gray-300 focus:border-[#116769] focus:outline-none shadow-sm"
                            />
                        </div>

                        {/* Fehlermeldung */}
                        {errors.telefonnummer && <p className="text-[#9C785E] text-sm mt-1">{errors.telefonnummer}</p>}

                        <div className="flex justify-between mt-3">
                            <button onClick={handleSave} className="px-4 py-2 bg-[#116769] cursor-pointer text-white border border-[#0e5756] rounded-md hover:bg-[#0e5756] transition duration-200">
                                Speichern
                            </button>
                            <button onClick={() => handleCancel("telefonnummer")} className="text-gray-600 font-bold cursor-pointer hover:underline">
                                Abbrechen
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex justify-between mt-3">
                        <p className="text-gray-600">{user?.landesvorwahl} {user?.telefonnummer || " "}</p>
                        <button onClick={() => handleEditClick("telefonnummer")} className="text-[#0e5756] font-bold hover:text-[#116769]  transition duration-200 cursor-pointer hover:underline">
                            Bearbeiten
                        </button>
                    </div>
                )}
            </div>

{/* Adresse */}
<div className="p-6 bg-white shadow-lg  border-gray-200 rounded-none" >
                <h2 className="text-xl font-semibold text-[#0e5756]" style={{ fontFamily: 'Merriweather, serif' }}>Adresse</h2>
                {editingFields.address ? (
                    <>
                        {/* Landesauswahl */}
                        <select
                            name="address.land"
                            value={formData.address.land}
                            onChange={handleChange}
                            className="w-full bg-[#e6f2f1] p-3 text-gray-600 border border-gray-300 mt-2 focus:border-[#116769] focus:outline-none shadow-sm"
                        >
                            <option value="">Land auswählen...</option>
                            {countryData.countries.map((country) => (
                                <option key={country.code} value={country.name} className="bg-white text-[#0e5756]">
                                    {country.name}
                                </option>
                            ))}
                        </select>

                        {/* Straße & Hausnummer */}
                        <div className="flex space-x-3 mt-2">
                            <input
                                type="text"
                                name="address.straße"
                                placeholder="Straße"
                                value={formData.address.straße}
                                onChange={handleChange}
                                className="w-3/4 bg-white p-3 text-gray-600 border border-gray-300 focus:border-[#116769] focus:outline-none shadow-sm"
                            />
                            <input
                                type="text"
                                name="address.snummer"
                                placeholder="Hausnr."
                                value={formData.address.snummer}
                                onChange={handleChange}
                                className="w-1/4 bg-white p-3 text-gray-600 border border-gray-300 focus:border-[#116769] focus:outline-none shadow-sm"
                            />
                        </div>

                        {/* Stadt & Postleitzahl */}
                        <div className="flex space-x-3 mt-2">
                            <input
                                type="text"
                                name="address.stadt"
                                placeholder="Stadt"
                                value={formData.address.stadt}
                                onChange={handleChange}
                                className="w-3/4 bg-white p-3 text-gray-600 border border-gray-300 focus:border-[#116769] focus:outline-none shadow-sm"
                            />
                            <input
                                type="text"
                                name="address.postleitzahl"
                                placeholder="PLZ"
                                value={formData.address.postleitzahl}
                                onChange={handleChange}
                                className="w-1/4 bg-white p-3 text-gray-600 border border-gray-300 focus:border-[#116769] focus:outline-none shadow-sm"
                            />
                        </div>

                        <div className="flex justify-between mt-3">
                            <button onClick={handleSave} className="px-4 py-2 bg-[#116769] cursor-pointer text-white border border-[#0e5756] rounded-md hover:bg-[#0e5756] transition duration-200">
                                Speichern
                            </button>
                            <button onClick={() => handleCancel("address")} className="text-gray-600  font-bold cursor-pointer hover:underline">
                                Abbrechen
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex justify-between mt-3">
                        <p className="text-gray-600">
                            {user?.address?.land ? `${user.address.land}, ` : ""}
                            {user?.address?.straße ? `${user.address.straße} ` : ""}
                            {user?.address?.snummer ? `${user.address.snummer}, ` : ""}
                            {user?.address?.stadt ? `${user.address.stadt}, ` : ""}
                            {user?.address?.postleitzahl ? `${user.address.postleitzahl}` : ""}
                        </p>
                        <button onClick={() => handleEditClick("address")} className="text-[#0e5756] hover:text-[#116769] font-bold transition duration-200 cursor-pointer hover:underline">
                            Bearbeiten
                        </button>
                    </div>
                )}
            </div>

            {errors.general && (
            <div className="mt-4 text-red-600 text-sm text-center">
                {errors.general}
            </div>
        )}
        {successMessage && (
            <div className="fixed bottom-5 left-5 bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow-md">
                 {successMessage}
            </div>
        )}
    </div>

    );
};


export default AccountDetails;

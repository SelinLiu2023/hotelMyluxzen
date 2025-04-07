import { useEffect, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";

export function ContactForm({newBooking, setNewBooking, errEmail, errFirstName, errLastName}) {
  
  const [focusedField, setFocusedField] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBooking(prevBooking => ({
      ...prevBooking,
      [name]: value
    }));
  };
  const handleFocus = (name) => {
    setFocusedField(name);
  };
  const handleBlur = (name) => {
    setFocusedField(null);
  };
  return (
  <div className="w-full">
    <form className="space-y-10">
      <div>
          <div className={`relative border rounded-lg ${focusedField === "email"  ? "border-gray-700" : (errEmail ? "border-[#9C785E] " : "border-gray-300")} p-2`}>
            <label 
              htmlFor="email" 
              className={`absolute text-gray-700 transition-all ${focusedField === "email" || newBooking.email ? "text-sm top-0" : "text-lg top-1/2 transform -translate-y-1/2"} `}
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={newBooking.email}
              onChange={handleChange}
              onFocus={() => handleFocus("email")}
              onBlur={() => handleBlur("email")}
              className="mt-1 block w-full pl-2 pr-8 py-2 bg-transparent focus:outline-none"
            />
            <button
              type="button"
              onClick={() => handleChange({ target: { name: "email", value: "" } })}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-gray-500 focus:outline-none"
            >
              <RxCrossCircled />
            </button>
          </div>
          {
            errEmail ? (
            <p className="text-[#9C785E] text-sm">Provide your email address.</p>
            ) : ( 
            <p className="text-transparent text-sm">Placeholder</p>
        )}
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
            <div className={`relative border rounded-lg  ${focusedField === "guestFirstName"  ? "border-gray-700" : (errFirstName? "border-[#9C785E] " : "border-gray-300")} p-2`}>
              <label 
                htmlFor="guestFirstName" 
                className={`absolute text-gray-700 transition-all ${focusedField === "guestFirstName" || newBooking.guestFirstName ? "text-sm top-0" : "text-lg top-1/2 transform -translate-y-1/2"}`}
              >
                Vorname:
              </label>
              <input
                type="text"
                id="guestFirstName"
                name="guestFirstName"
                value={newBooking.guestFirstName}
                onChange={handleChange}
                onFocus={() => handleFocus("guestFirstName")}
                onBlur={() => handleBlur("guestFirstName")}
                className="mt-1 block w-full pl-2 pr-8 py-2 bg-transparent focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleChange({ target: { name: "guestFirstName", value: "" } })}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-gray-500 focus:outline-none"
              >
                <RxCrossCircled />
              </button>
            </div>
              {
                errFirstName ? (
                <p className="text-[#9C785E] text-sm">Provide your first name.</p>
                ) : (
                <p className="text-transparent text-sm">Placeholder</p>
            )}
        </div>
        <div className="flex-1">
          <div className={`relative border rounded-lg  ${focusedField === "guestFamilyName"  ? "border-gray-700" : (errLastName ? "border-[#9C785E] " : "border-gray-300")} p-2`}>
            <label 
              htmlFor="guestFamilyName" 
              className={`absolute text-gray-700 transition-all ${focusedField === "guestFamilyName" || newBooking.guestFamilyName ? "text-sm top-0" : "text-lg top-1/2 transform -translate-y-1/2"}`}
            >
              Nachname:
            </label>
            <input
              type="text"
              id="guestFamilyName"
              name="guestFamilyName"
              value={newBooking.guestFamilyName}
              onChange={handleChange}
              onFocus={() => handleFocus("guestFamilyName")}
              onBlur={() => handleBlur("guestFamilyName")}
              className="mt-1 block w-full pl-2 pr-8 py-2 bg-transparent focus:outline-none"
            />
            <button
              type="button"
              onClick={() => handleChange({ target: { name: "guestFamilyName", value: "" } })}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-gray-500 focus:outline-none"
            >
              <RxCrossCircled />
            </button>
          </div>
          {
            errLastName ? (
            <p className="text-[#9C785E] text-sm">Provide your last name.</p>
            ) : (
            <p className="text-transparent text-sm">Placeholder</p>
          )}
        </div>
      </div>
      <div className={`relative border rounded-lg  ${focusedField === "mobileNumber"? "border-gray-700" : "border-gray-300"} p-2`}>
        <label 
          htmlFor="mobileNumber" 
          className={`absolute text-gray-700 transition-all ${focusedField === "mobileNumber" || newBooking.mobileNumber ? "text-sm top-0" : "text-lg top-1/2 transform -translate-y-1/2"}`}
        >
          Telefonnummer(optional):
        </label>
        <input
          type="text"
          id="mobileNumber"
          name="mobileNumber"
          value={newBooking.mobileNumber}
          onChange={handleChange}
          onFocus={() => handleFocus("mobileNumber")}
          onBlur={() => handleBlur("mobileNumber")}
          className="mt-1 block w-full pl-2 pr-8 py-2 bg-transparent focus:outline-none"
        />
        <button
          type="button"
          onClick={() => handleChange({ target: { name: "mobileNumber", value: "" } })}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-gray-500 focus:outline-none"
        >
          <RxCrossCircled />
        </button>
      </div>
      <div className={`relative border rounded-lg  ${focusedField === "comments"? "border-gray-700" : "border-gray-300"} p-2 `}>
        <label 
          htmlFor="comments" 
          className={`absolute text-gray-700 transition-all ${focusedField === "comments" || newBooking.comments ? "text-sm top-0" : "text-lg top-1/2 transform -translate-y-1/2"}`}
        >
          Kommentare (optional):
        </label>
        <textarea
          id="comments"
          name="comments"
          value={newBooking.comments}
          onChange={handleChange}
          onFocus={() => handleFocus("comments")}
          onBlur={() => handleBlur("comments")}
          className="mt-1 block w-11/12 pl-2 pr-8 py-2 bg-transparent focus:outline-none"
          rows="6"
          style={{ resize: "none", overflow: "auto" }}
        />
        <button
          type="button"
          onClick={() => handleChange({ target: { name: "comments", value: "" } })}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-gray-500 focus:outline-none"
        >
          <RxCrossCircled />
        </button>      
      </div>
    </form>
  </div>
  );
}

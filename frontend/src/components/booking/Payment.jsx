import { useState } from "react";
import { FaPaypal, FaCreditCard } from "react-icons/fa";

export function Payment() {
  const [selectedPayment, setSelectedPayment] = useState("paypal");
  const handleSelectPayment = (payment) => {
    setSelectedPayment(payment);
  };
  return (
    <div>
      <div className="text-2xl mb-4 text-gray-700 font-bold">
          Zahlung
      </div>

  <div className="w-full flex justify-center">
    <div className="w-2/3 flex flex-col items-start space-y-10 border rounded-lg shadow border-gray-300 px-8 py-8">
      <div className="flex items-center space-x-2 ">
        <input
          type="radio"
          id="paypal"
          name="paymentMethod"
          value="paypal"
          checked={selectedPayment === "paypal"}
          onChange={() => handleSelectPayment("paypal")}
          className="hidden" 
        />
        <label 
          htmlFor="paypal" 
          className={`w-10 h-10 rounded-full p-2 flex justify-center items-center cursor-pointer ${selectedPayment === "paypal" ? "bg-[#064236] text-white" : "bg-white border-2 border-gray-300"}`}
        >
          <FaPaypal size={24} />
        </label>
        <span className="text-gray-700">PayPal</span>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="radio"
          id="creditCard"
          name="paymentMethod"
          value="creditCard"
          checked={selectedPayment === "creditCard"}
          onChange={() => handleSelectPayment("creditCard")}
          className="hidden" 
        />
        <label 
          htmlFor="creditCard" 
          className={`w-10 h-10 rounded-full p-2 flex justify-center items-center cursor-pointer ${selectedPayment === "creditCard" ? "bg-[#064236] text-white" : "bg-white border-2 border-gray-300"}`}
        >
          <FaCreditCard size={24} />
        </label>
        <span className="text-gray-700">Credit Card</span>
      </div>
    </div>
  </div>
  </div>
  );
}


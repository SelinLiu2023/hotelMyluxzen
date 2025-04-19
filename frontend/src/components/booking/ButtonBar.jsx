import { FaArrowLeft } from "react-icons/fa6";
import "../../styles/booking.css";

export const ButtonBar = ({ step, setPrevStep, setNextStep })=>{
    return (
    <div>
        <div className="flex justify-end space-x-4 md:px-10 lg:px-20 font-bold pt-1">
            {step > 1 && (
            <button
                onClick={setPrevStep}
                className="bg-transparent border border-gray-300 text-lg text-gray-600 py-2 md:px-16 px-4 rounded-lg hover:bg-gray-200 flex items-center space-x-2 cursor-pointer"
            >
                <FaArrowLeft /> <p>Zurück</p>
            </button>
            )}
            <button
                onClick={setNextStep}
                // disabled={step > totalSteps}
                className="custom-bg-navbar-color text-gray-700 text-lg text-gray-600 py-2 md:px-16  px-4 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
                {step === 4 ? "Bestätigen" : "Weiter"}
            </button>
        </div>
    </div>
    );
};

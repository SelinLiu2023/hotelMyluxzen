import React from "react";

export const ProcessBar = ({ step, setStep }) => {
    const steps = ["Datum", "Häuser", "Kontakt", "Zahlung"];
    return (
    <div  className="pt-10 pb-4 px-2" >
        <div className="flex items-center space-x-4">
            {steps.map((label, index) => {
                const isActive = step >= index + 1;
                return (
                    <React.Fragment key={index}>
                        <button
                            className={`text-base font-medium ${isActive ? "text-gray-600 cursor-pointer" : "text-gray-400 cursor-not-allowed"}`}
                            onClick={() => isActive && setStep(index + 1)}
                            disabled={!isActive}
                        >
                            {label}
                        </button>
                        {index < steps.length - 1 && (
                            <span className="text-base text-gray-400"> &gt; </span>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    </div>
    );
};

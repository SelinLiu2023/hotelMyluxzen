import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const AdminReserveForm = ({ inUsePeriods, setInUsePeriods, handleAdminReserveConfirm }) => {
    const handleAddPeriod = () => {
        setInUsePeriods([
            ...inUsePeriods,
            { startDate: new Date(), endDate: new Date(), reason: "" }
        ]);
    };

    const handleRemovePeriod = (index) => {
        const newPeriods = [...inUsePeriods];
        newPeriods.splice(index, 1);
        setInUsePeriods(newPeriods);
    };

    const handleDateChange = (date, index, field) => {
        const updatedPeriods = inUsePeriods.map((period, i) => {
            if (i === index) {
                return { ...period, [field]: date };
            }
            return period;
        });
        setInUsePeriods(updatedPeriods);
    };

    const handleReasonChange = (event, index) => {
        const updatedPeriods = inUsePeriods.map((period, i) => {
            if (i === index) {
                return { ...period, reason: event.target.value };
            }
            return period;
        });
        setInUsePeriods(updatedPeriods);
    };

    return (
        <div className="flex flex-col gap-4 p-4 px-10 text-gray-600">
            { inUsePeriods.map((period, index) => (
                <div key={index} className="flex flex-col  gap-4">
                    <div className="flex gap-4 flex-col">
                        <DatePicker
                            selected={period.startDate}
                            onChange={(date) => handleDateChange(date, index, "startDate")}
                            minDate={new Date()}
                            // maxDate={parseDate(newBooking.endDate)}
                            placeholderText="--"         
                            dateFormat="dd.MM.yyyy" 
                            className="p-2 border rounded focus:outline-none w-full"
                        />
                        <DatePicker
                            selected={period.endDate}
                            onChange={(date) => handleDateChange(date, index, "endDate")}
                            className="p-2 border rounded focus:outline-none w-full"
                            minDate={period.startDate}
                            dateFormat="dd.MM.yyyy" 
                        />
                    </div>
                    <textarea
                        type="text"
                        value={period.reason}
                        onChange={(event) => handleReasonChange(event, index)}
                        className="p-2 border rounded focus:outline-none"
                        placeholder="Reason"
                    />
                    <button 
                        onClick={() => handleRemovePeriod(index)} 
                        className="bg-gray-500 hover:bg-red-700 text-white font-bold  px-4 w-30 h-6 rounded-full"
                    >
                        Löschen
                    </button>
                </div>
            ))}
            <div className="flex gap-6">
                <button 
                    onClick={handleAddPeriod} 
                    className="bg-teal-dark  text-white px-4 mt-4 rounded-full cursor-pointer hover:text-[#FAE1A8]"
                >
                    Neu Period Einfügen
                </button>
                <button 
                    onClick={handleAdminReserveConfirm} 
                    className="bg-teal-dark  text-white px-4 mt-4 rounded-full cursor-pointer hover:text-[#FAE1A8]"
                >
                    Bestätigen
                </button>
            </div>
        </div>
    );
}

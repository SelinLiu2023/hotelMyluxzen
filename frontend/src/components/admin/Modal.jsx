export const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-75 flex justify-center items-center ">
            <div className="bg-white md:ml-60 p-8 md:p-8 rounded-lg shadow-xl mx-4 w-9/10 md:w-3/5 min-w-120 overflow-y-auto max-h-[90vh]">
                {children}
            </div>
        </div>
    );
};
// for small warning message
export const WarningModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-90 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                    {children}
            </div>
        </div>
    );
};

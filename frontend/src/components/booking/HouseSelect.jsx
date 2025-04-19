import { useState, useEffect } from "react";
import { HouseTypeCard,HouseTypeModal } from "./HouseTypeCard";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaArrowTurnUp } from "react-icons/fa6";
import { SingleHousesList } from "./SingleHousesList";

export const HouseSelect = ({ newBooking, setNewBooking, gotoNextStep, setStepCompleted,setGotoNextStep })=>{
  const [availableRooms, setAvailableRooms] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [selectedHouseType, setSelectedHouseType] = useState(null);
  const [houses, setHouses] = useState([]);
  const [showHouses, setShowHouses] = useState(false);

  useEffect(()=>{
      if(gotoNextStep=== true){
          //varify if important information has been inputed
          if(newBooking.houseType === ""){
              setErrorMessage("You need to select an available house for booking.");
              setStepCompleted(false);
              setGotoNextStep(false);
          }else{
              setErrorMessage("");
              setStepCompleted(true);
              setGotoNextStep(false);
          }
      }
  },[gotoNextStep]);
  useEffect(()=>{
    setNewBooking(prev=>({
      ...prev,
      houseNum:""
    }));
  },[newBooking.houseType]);

  // useEffect(()=>{
  //   console.log("selectedApartment",selectedApartment)
  // },[selectedApartment]);
  const calculateTotalPrice = (booking, price) => {
    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);
    const msPerDay = 1000 * 3600 * 24;
    // const days = Math.round((end - start) / msPerDay); 
    const totalPrice = booking.totalDays * price;
    return totalPrice.toFixed(2); 
  };
  useEffect(() => {
      const fetchAvailableRooms = async () => {
        if (!newBooking?.startDate || !newBooking?.endDate || !newBooking?.guestCount) {
          setErrorMessage("Missing parameters.");
          return;
        }
        try {
          const url = `${import.meta.env.VITE_SERVER_URL}/booking/check-availability`;
          // const url = `http://localhost:3000/booking/check-availability`;
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              startDate: newBooking.startDate,
              endDate: newBooking.endDate,
              guestCount: newBooking.guestCount,
            }),
          });
          if (!response.ok) {
            throw new Error("Failed to fetch available rooms");
          }
          const data = await response.json();
          if (data.length > 0) {
            const sortedData = data.sort((a, b) => a.guests - b.guests);
            console.log("fetchAvailableRooms",sortedData)
            setAvailableRooms(sortedData);
            if(sortedData.length>0){  
              setNewBooking((prev) => ({ ...prev, 
                houseType: sortedData[0].houseType,
                price: sortedData[0].pricePerNight,
                houseTitle: sortedData[0].title,
                totalPrice: calculateTotalPrice(prev, sortedData[0].pricePerNight),
                // totalDays:calculateTotalDays(prev)
              }));
              setSelectedHouseType(sortedData[0].houseType);// for choose a special house
          }
            setErrorMessage("");
            console.log("available houses", data)
          } else {
            setErrorMessage("No available rooms for the selected dates.");
          }
        } catch (err) {
          setErrorMessage("No available rooms for the selected dates.", err.message);
        }
      };
      fetchAvailableRooms();
    }, [newBooking.guestCount,newBooking.startDate,newBooking.endDate]); 

    useEffect(() => {
      // console.log("showHouses", showHouses);
      if (showHouses) {
          const handleGetHousesForReserve = async () => {
              try {
                  const requestBody = {
                      startDate: newBooking.startDate,
                      endDate: newBooking.endDate,
                      bookingNum: newBooking.bookingNumber,
                      houseNum: newBooking.houseNum
                  };
                  console.log("handleGetHousesForReserve, requestBody", requestBody);
                  const url = `${import.meta.env.VITE_SERVER_URL}/singleHouse/reserve-get-houses/${selectedHouseType}`;
                  // const url = `http://localhost:3000/singleHouse/reserve-get-houses/${selectedHouseType}`;
                  const response = await fetch(url, {
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify(requestBody)
                  });
                  if (!response.ok) throw new Error("no available houses.");
                  const data = await response.json();
                  console.log("handleGetHousesForReserve, received houses", data);
                  if (data === null) throw new Error("no available houses.");
                  
                  setHouses(data);
              } catch (err) {
                  console.log("Error:", err.message);
                  setHouses([]);
              }
          };

          handleGetHousesForReserve();
      }
  }, [showHouses,selectedHouseType]);

      const handleSelectHouse = (houseType, price, title) => {
      setNewBooking((prev) => ({ ...prev, 
                                  houseType: houseType,
                                  price: price,
                                  houseTitle: title,
                                  totalPrice: calculateTotalPrice(prev, price),
                                  // totalDays:calculateTotalDays(prev)
        }));
        setSelectedHouseType(houseType);// for choose a special house
    };

    return (
    <div>
      <div className="text-2xl mb-4 text-gray-700 font-bold">
          Häuser
      </div>
      <h2 className="pb-1">
        Wählen Sie das perfekte Haus für Ihren Aufenthalt.
      </h2>
      { errorMessage !== "" ? (
        <p className="text-[#9C785E] text-sm">{errorMessage}</p>
      ) : (
        <p className="text-transparent text-sm">Placeholder</p>
      )}
      { availableRooms.length > 0 ? (
        <ul className="flex flex-col gap-6 items-center pb-10">
          {availableRooms.map((room, index) => (
              <div key={index} >
                <HouseTypeCard
                  house={room} 
                  onClick={() => handleSelectHouse(room.houseType, room.pricePerNight, room.title)}  
                  selected={newBooking.houseType === room.houseType}
                />

                {/* show more details info for housetype */}
                <div className="flex items-center text-sm space-x-3">
                  <p>noch <span className="text-base font-bold text-[#064236]">{room.availableCount} </span>verfügbar</p>
                  <button 
                    onClick={() => setSelectedApartment(room)} 
                    className="px-2 py-2 rounded border border-gray-300 text-xs flex space-x-2 cursor-pointer hover:scale-120 hover:border-[#fae1a8] hover:text-[#116769]"
                  >
                    <p>More details </p>
                  </button>
                  <FaArrowTurnUp />
                </div>
                
                {/* for choose a special house */}
                { selectedHouseType === room.houseType && ( 
                  <div className="flex flex-col items-start text-sm md:space-x-6 items-center pt-2">
                    <button onClick={() => setShowHouses(prev => !prev)}
                      className="text-gray-600 hover:scale-105 hover:text-[#116769] cursor-pointer border-b hover:border-[#fae1a8]" 
                    >
                        Gibt es eine bevorzugte Unterkunft? Wir buchen gerne wieder für Sie!
                    </button>
                  </div>
                )}

                {/* show a list for house reserve */}
                {((showHouses && selectedHouseType === room.houseType) || (newBooking.houseNum !== ""  && selectedHouseType === room.houseType)) && (
                  <>
                    { houses.length === 0 ? (
                      <p>Keine Häuser zu resevieren.</p>
                    ) : (
                        <SingleHousesList 
                          houses={houses} 
                          setNewBooking={setNewBooking} 
                          newBooking={newBooking}
                        />
                    )}
                  </>
                )}
              </div>
          ))}
      </ul>
      ) : (
        <p></p>
      )}
      { selectedApartment && (
        <HouseTypeModal
          house={selectedApartment}
          onClose={() => setSelectedApartment(null)}
        />
      )}
    </div>
    );
};

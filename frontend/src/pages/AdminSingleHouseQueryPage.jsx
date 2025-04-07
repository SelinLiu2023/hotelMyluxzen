import { useState, useEffect } from "react";
import { SingleHouseQueryForm } from "../components/admin/SingleHouseQueryForm";
import { SingleHouseQueryResults } from "../components/admin/SingleHouseQueryResults";
import { Modal } from "../components/admin/Modal";
import { SingleHouseCard } from "../components/admin/SingleHouseCard";

export const AdminSingleHouseQueryPage = ()=>{
    const [query, setQuery] = useState(null);
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [houseData,setHouseData] = useState(null);
    const [showQueryResults, setShowQueryResult] = useState(false);
    // useEffect(()=>{
    //     console.log("AdminBookingQueryPage query", query);
    // },[query]);
    const fetchResults = async (query, page = 1) => {
        console.log("fetchResults, query ", query)
        const params = new URLSearchParams({
            ...query, 
            page  
        });
        // const url = `http://localhost:3000/singleHouse/query?${params.toString()}`;
        const url = `${import.meta.env.VITE_SERVER_URL}/singleHouse/query?${params.toString()}`;
        console.log("AdminSingleHouseQueryPage URL:", url);
        const response = await fetch(url);
        let data = await response.json();
        console.log("received query data",data)
        setResults(prev => page === 1 ? data.singleHouses : [...prev, ...data.singleHouses]);
        setHasMore(data.hasMore);
        setPage(page);
    };
    const fetchHouse = async (houseNum) => {
        try {
            const url = `${import.meta.env.VITE_SERVER_URL}/singleHouse/geHausByNum/${houseNum}`;
            // const url = `http://localhost:3000/singleHouse/geHausByNum/${houseNum}`;
            console.log("AdminSingleHouseQueryPage URL:", url);
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) throw new Error("Buchung Number nicht gefunden.");
            let data = await response.json();
            console.log("fetchHouse, data",data);
            setHouseData(data);
            setShowDetails(true);

        } catch (err) {
            setHouseData(null);
            setShowDetails(false);

        }
    };
    const handleSearch = (formData) => {
        setQuery(formData);
        fetchResults(formData, 1);
        setShowQueryResult(true);
    };
    const handleLoadMore = () => {
        fetchResults(query, page + 1);
    };
    const handleClose = () => setShowDetails(false);
    useEffect(()=>{
        console.log("showDetails",showDetails)
    })
    return (
    <>
        <SingleHouseQueryForm handleSearch={handleSearch}/>
        { showQueryResults && (
            <SingleHouseQueryResults results={results} 
                hasMore={hasMore} 
                onLoadMore={handleLoadMore} 
                fetchHouse={fetchHouse}
            />
        )}
        <Modal isOpen={showDetails} onClose={handleClose}>
            <SingleHouseCard house={houseData} 
                setHouseData={setHouseData} 
                onClose={handleClose}
            />
        </Modal>
    </>
    );
}

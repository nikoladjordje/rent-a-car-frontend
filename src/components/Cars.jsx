import { useEffect, useState } from "react";
import Car from "./Car";
const Cars = () => {
    const[carsList, setCarsList] = useState([])
    const[vehicleTypeList, setVehicleTypeList] = useState([])

    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const [availability, setAvailability] = useState(false);

    const [selectedVehicleType, setSelectedVehicleType] = useState('');

    const handleFilterByPrice = () => {
        console.log('Min Price:', minPrice);
        if(minPrice == ''){
            console.log("bomboclaat");
        }
        console.log('Max Price:', maxPrice);
    };

    const fetchCars = async () => {
        const response = await fetch('https://localhost:7205/api/Vehicle/AllVehicles', {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        });

        if (!response.ok) {
          console.error('Failed to fetch cars list');
          return;
        }

        var content = await response.json();
        if(minPrice != '')
            content = content.filter(car => car.attributes.dailyPrice >= minPrice);
        if(maxPrice != '')
            content = content.filter(car => car.attributes.dailyPrice <= maxPrice);
        if(selectedVehicleType != '')
            content = content.filter(car => car.attributes.vehicleType == selectedVehicleType);
        const filteredCars = availability ? content.filter(car => car.attributes.availability) : content;

        setCarsList(filteredCars);
        console.log(filteredCars)
    };

    useEffect(() => {

        const fetchVehicleTypes = async () => {
            const response = await fetch('https://localhost:7205/api/Vehicle/AllVehicleTypes', {
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include'
            });
    
            if (!response.ok) {
              console.error('Failed to fetch vehicle types');
              return;
            }
    
            const content = await response.json();
            setVehicleTypeList(content);
            console.log(content)
        };
    
        fetchCars();
        fetchVehicleTypes();
      }, []);

      useEffect(() => {
        fetchCars();
      }, [availability, minPrice, maxPrice, selectedVehicleType]);
    
    return(
        <>

        <div>
            <div className="filter">
                <div className="filter-by-vehicle-type">
                    <p>filter by vehicle type:</p>

                    {vehicleTypeList.map(type => (
                        <div key={type}>
                        <input
                            type="radio"
                            id={type}
                            name="vehicleType"
                            value={type}
                            onChange={(e) => setSelectedVehicleType(e.target.value)}
                        />
                        <label htmlFor={type}>{type}</label>
                        </div>
                    ))}
                </div>
                <div className="filter-by-price">
                    <p>Filter by daily price:</p>
                    <label htmlFor="minPrice">Min Price:</label>
                    <input
                        type="number"
                        id="minPrice"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <label htmlFor="maxPrice">Max Price:</label>
                    <input
                        type="number"
                        id="maxPrice"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                    <button onClick={handleFilterByPrice}>Apply</button>
                </div>
                <div>
                    <label htmlFor="availability">Show only available:</label>
                    <input
                    type="checkbox"
                    id="availability"
                    checked={availability}
                    onChange={() => setAvailability(!availability)}
                    />
                </div>
            </div>
            {carsList.map(car => {
                return <Car key={car.vehicleId} attributes={car.attributes}/>
                // <div>{car.vehicleId}</div>   key={car.vehicleId}
            })}
        </div>
        </>
    );
}

export default Cars;
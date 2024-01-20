import { useEffect, useState } from "react";
import Car from "./Car";
import AddVehicle from "./AddVehicle";
const Cars = (props) => {
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
        // console.log(content);
        var cl = [];
        content.forEach(element => {
            // console.log(element);
            cl.push(element);
        });
        // setCarsList(content);
        // console.log('carsList:'+content)
        if(minPrice != '')
            cl = cl.filter(car => car.dailyPrice >= minPrice);
        if(maxPrice != '')
            cl = cl.filter(car => car.dailyPrice <= maxPrice);
        if(selectedVehicleType != '')
            cl = cl.filter(car => car.vehicleType == selectedVehicleType);
            cl  = availability ? cl.filter(car => car.availability) : cl;
        setCarsList(cl);

        // setCarsList(filteredCars);
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
            // console.log(content)
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
                return <Car key={car.id} car={car}/>
                // <div>{car.vehicleId}</div>   key={car.vehicleId}
            })}
        </div>
        </>
    );
}

export default Cars;
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const AddVehicle = (props) => {
  const [id, setVehicleId] = useState('string');
  const [vehicleType, setVehicleType] = useState('');
  const [brand, setBrand] = useState('');
  const [dailyPrice, setDailyPrice] = useState(0);
  const [availability, setAvailability] = useState(true);

  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  
  // console.log('vehicle: userid:'+props.userId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('https://localhost:7205/' + 'api/Vehicle/AddVehicle', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
      'Accept': 'application/json' },
      body: JSON.stringify({
        id,
        vehicleType,
        brand,
        dailyPrice,
        availability
      })
    });

    if (!response.ok) {
      console.error('Failed to add vehicle');
      return;
    }
    const vId = await response.json();
    setVehicleId(vId);



    // setRedirect(true);
    const newVehicle = {
      id,
      vehicleType,
      brand,
      dailyPrice,
      availability
    };
    console.log('New Vehicle Data:', newVehicle);

    const response2 = await fetch('https://localhost:7205/' + `api/Vehicle/VehicleOwner?userId=${props.userId}&vehicleId=${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json' }
    });

    if (!response2.ok) {
      console.error('Failed to add vehicle owner');
      return;
    }

  };

  if(redirect){
    navigate('/cars');
  };

  return (
    <div>
      <h2>Add Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="vehicleType">Vehicle Type:</label>
          <input
            type="text"
            id="vehicleType"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="brand">Brand:</label>
          <input
            type="text"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="dailyPrice">Daily Price:</label>
          <input
            type="number"
            id="dailyPrice"
            value={dailyPrice}
            onChange={(e) => setDailyPrice(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>
            Availability:
            <input
              type="checkbox"
              id="availability"
              checked={availability}
              onChange={(e) => setAvailability(e.target.checked)}
            />
          </label>
        </div>
        <div>
          <button type="submit">Add Vehicle</button>
        </div>
      </form>
    </div>
  );
};

export default AddVehicle;
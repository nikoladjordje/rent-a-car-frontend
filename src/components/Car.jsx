import { useState } from "react";

const Car = (props) => {
    const [pickupDate, setPickupDate]=useState();
    const [returnDate, setReturnDate]=useState();

    const handleReservation = async (e) => {
        e.preventDefault();
        console.log(`make a reservation for ${props.car.brand}`);
        console.log('vehicleid:'+props.car.id+'pickup:'+pickupDate+'return:'+returnDate);
        if(pickupDate===undefined || returnDate===undefined){
            console.log("dates undefined");
        }
        else if(pickupDate>returnDate){
        console.log('pickup date has to be before the return date');
        }
        else{
            console.log('bravo');
            const response = await fetch('https://localhost:7205/' + `api/Vehicle/VehicleReservations?vehicleId=${props.car.id}&pickupDate=${pickupDate}&returnDate=${returnDate}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json' }
            });

            if (!response.ok) {
            console.error('Failed to add vehicle reservation');
            return;
            }
        }
        
    }
    return(
        <>
            
            <div key={props.id} className="car-card">
                <h2>{props.car.brand}</h2>
                <p><strong>Daily Price:</strong> ${props.car.dailyPrice}</p>
                {/* <p><strong>Availability:</strong> {props.car.availability ? 'Available' : 'Not Available'}</p> */}
                <p><strong>Vehicle Type:</strong> {props.car.vehicleType}</p>
                <form>
                    <button onClick={handleReservation}>Make a Reservation</button>
                    <label>
                        Start Date:
                        <input type="date" name="startDate" onChange={(e) => setPickupDate(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        End Date:
                        <input type="date" name="endDate" onChange={(e) => setReturnDate(e.target.value)} />
                    </label>
                </form>
                <hr />
            </div>
        </>
    )
}

export default Car;
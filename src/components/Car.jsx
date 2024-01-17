const Car = (props) => {
    const handleReservation = () => {
        console.log(`make a reservation for ${props.attributes.brand}`);
    }
    return(
        <>
            
            <div key={props.vehicleId} className="car-card">
                <h2>{props.attributes.brand}</h2>
                <p><strong>Daily Price:</strong> ${props.attributes.dailyPrice}</p>
                <p><strong>Availability:</strong> {props.attributes.availability ? 'Available' : 'Not Available'}</p>
                <p><strong>Vehicle Type:</strong> {props.attributes.vehicleType}</p>
                {props.attributes.availability && (
                    <button onClick={handleReservation}>Make a Reservation</button>
                )}
                <hr />
            </div>
        </>
    )
}

export default Car;
import { useEffect, useState } from "react";
const Reservation = (props) => {
    const [vehicle, setVehicle] = useState();
    const[id, setId] = useState('string');
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    const fetchVehicle = async () => {
        const response2 = await fetch(`https://localhost:7205/api/Vehicle/GetVehicleByReservationId?reservationId=${props.reservation.id}`, {
          headers: { 'Content-Type': 'application/json',
          'Accept': 'application/json' },
          credentials: 'include'
        });

        if (!response2.ok) {
          console.error('Failed to fetch cars list');
          return;
        }

        const a = await response2.json();
        console.log("asd");
        console.log(a[0]);
        
        setVehicle(a[0]);
        console.log('reservID:'+props.reservation.id);
        console.log(vehicle);
    }

    const CreateReview = async () => {
        const response = await fetch(`https://localhost:7205/api/Review/AddReview`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            'Accept': 'application/json'},
            body: JSON.stringify({
                id,
                rating,
                comment
            })
        });

        if (!response.ok) {
          console.error('Failed to create review');
          return;
        }

        const a = await response.json();
        console.log(a);

        await ConnectReviewToUser(a);
        await ConnectReviewToVehicle(a);

    }

    const ConnectReviewToUser = async (reviewId) => {
        const response = await fetch(`https://localhost:7205/api/Review/GiveReview?userId=${props.userId}&reviewId=${reviewId}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        });

        if (!response.ok) {
          console.error('Failed to connect user to review');
          return;
        }
    }

    const ConnectReviewToVehicle = async (reviewId) => {
        const response = await fetch(`https://localhost:7205/api/Vehicle/VehicleReviews?vehicleId=${vehicle.id}&reviewId=${reviewId}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        });

        if (!response.ok) {
          console.error('Failed to connect vehicle to review');
          return;
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // console.log(rating + comment);
        if(comment == '')
            console.log('comment is empty!');
        else{
            CreateReview();
        }
    };
    
    useEffect(() => {
        fetchVehicle();
    },[])
    return (
        <>
            <div>
            {vehicle && (
                <div>
                    <h2>{vehicle.brand}</h2>
                    <p><strong>Daily Price:</strong> ${vehicle.dailyPrice}</p>
                    <p><strong>Vehicle Type:</strong> {vehicle.vehicleType}</p>
                    <p><strong>Pickup Date:</strong> {props.reservation.pickupDate.split('T')[0]}</p>
                    <p><strong>Return Date:</strong> {props.reservation.returnDate.split('T')[0]}</p>
                    <form onSubmit={handleFormSubmit}>
                        <label>
                            Comment:
                            <input
                            type="text"
                            name="comment"
                            value={comment}
                            onChange={(e)=>setComment(e.target.value)}
                            />
                        </label>
                        <br />

                        <label>
                            Rating:
                            <select
                            name="rating"
                            value={rating}
                            onChange={(e)=>setRating(e.target.value)}
                            >
                            {[1, 2, 3, 4, 5].map((value) => (
                                <option key={value} value={value}>
                                {value}
                                </option>
                            ))}
                            </select>
                        </label>
                        <br />

                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
            
            </div>
            
        </>
    );
}

export default Reservation;
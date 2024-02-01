import { useEffect, useState } from "react";
import Reservation from "./Reservation";

const Reservations = (props) => {
    const [reservationList, setReservationList] = useState([]);
    const [vehicle, setVehicle] = useState();
    const fetchReservations = async () => {
        const response = await fetch(`https://localhost:7205/api/Reservation/GetReservationsForUser?userId=${props.userId}`, {
          headers: { 'Content-Type': 'application/json',
          'Accept': 'application/json' },
          credentials: 'include'
        });

        if (!response.ok) {
          console.error('Failed to fetch cars list');
          return;
        }
        const content = await response.json();
        var rl = [];
        // console.log(content);
        content.forEach(element => {
            // console.log(element);
            rl.push(element);
        });
        setReservationList(rl);
        // console.log('reservations'+list);



    }

    
    useEffect(() => {
        fetchReservations();
    },[])
    return(
        <>
            <div>
            <h1>Reservations</h1>
            {reservationList.map(reservation => {
                return <Reservation key={reservation.id} reservation={reservation} userId={props.userId}/>
                // <div>{car.vehicleId}</div>   key={car.vehicleId}
            })}
            </div>
            <hr />
        </>
    );
}

export default Reservations
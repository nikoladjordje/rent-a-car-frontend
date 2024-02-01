import { useEffect, useState } from "react";
import Review from "./Review";

const Reviews = (props) => {
    const [reviewList, setReviewList] = useState([]);
    const [fetchState, setFetchState] = useState(false);

    const fetchReviews = async () => {
        const response = await fetch(`https://localhost:7205/api/Review/GetAllReviewsForUser?userId=${props.userId}`, {
          headers: { 'Content-Type': 'application/json',
          'Accept': 'application/json' },
          credentials: 'include'
        });

        if (!response.ok) {
          console.error('Failed to fetch cars list');
          return;
        }
        const data = await response.json();
        var list = [];
        console.log(data);
        data.forEach(element => {
            list.push(element);
        });
        setReviewList(list);
    }

    useEffect(() => {
        fetchReviews();
    },[])

    useEffect(() => {
        fetchReviews();
    },[fetch])

    return(
        <>
        <div>
            <h1>Reviews</h1>
            {reviewList.map(review => {
                return <Review key={review.id} review={review} userId={props.userId} setFetchState={setFetchState} fetchState={fetchState}/>
                // <div>{car.vehicleId}</div>   key={car.vehicleId}
            })}
        </div>
        </>
    );
}

export default Reviews;
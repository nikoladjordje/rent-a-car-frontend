const Review = (props) => {
    const handleOnClick = async () => {
        const response = await fetch(`https://localhost:7205/api/Review/RemoveReview?reviewId=${props.review.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('Failed to delete review:', response.status, response.statusText);
            return;
        }
        props.setFetchState(!props.fetchState);
    }
    return(
        <>
        <div style={{ background:'#343434', margin: '8px', padding:'8px'}}>
            {props.review.id}
            <h3>{props.review.comment}</h3>
            <h4>{props.review.rating}</h4>
            <h4><button onClick={handleOnClick}> Delete this review</button></h4>
        </div>
        </>
    );
}

export default Review;
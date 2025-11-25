import '../css/Reviews.css';
import './App.css';

//Reviews Page

export default function Reviews() {
    return (

        <div className='divReview'>
            <div className='viewReview'>
                <h1 className='titleReview'>View Your Reviews</h1>
                <button className="createReview" type="submit">CREATE NEW REVIEW</button>
            </div>
            <div className='review'>
                <div className='top'>
                    <p className='movieTitle'>Movie Title</p>
                    <p className='star'>★★★★★</p>
                    <button className="buttonEdit" type="submit">EDIT</button>
                </div>
                <div className='divDelete'>
                    <p className='description'>description</p>
                    <button className="buttonDelete" type="submit">DELETE</button>
                </div>
            </div>
            <div className='review'>
                <div className='top'>
                    <p className='movieTitle'>Movie Title</p>
                    <p className='star'>★★★★★</p>
                    <button className="buttonEdit" type="submit">EDIT</button>
                </div>
                <div className='divDelete'>
                    <p className='description'>description</p>
                    <button className="buttonDelete" type="submit">DELETE</button>
                </div>
            </div>

        </div>

    );
}
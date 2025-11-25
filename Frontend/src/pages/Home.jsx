import '../css/Home.css';
import './App.css';

//Home Page

export default function Home() {
    return (

        <div className='divHome'>
            <h1 className='titleHome'>Home</h1>
            <div className='reviewHome'>
                <div className='topHome'>
                    <p className='movieTitleHome'>Movie Title</p>
                    <p className='star'>★★★★★</p>
                </div>
                <p className='descriptionHome'>description</p>
            </div>
            <div className='reviewHome'>
                <div className='topHome'>
                    <p className='movieTitleHome'>Movie Title</p>
                    <p className='star'>★★★★★</p>
                </div>
                <p className='descriptionHome'>description</p>
            </div>
        </div>

    );
}
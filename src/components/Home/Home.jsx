import Banner from '../Banner/Banner';
import Aristopharma from '../Aristopharma/Aristopharma';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div className='my-5 border-2'>
                <hr />
            </div>
            <h2 className='text-center text-xl font-bold'>Aristopharma Ltd</h2>
            <Aristopharma></Aristopharma>
        </div>
    );
};

export default Home;
import { useState } from 'react';
import Banner from '../Banner/Banner';
import Aristopharma from '../Aristopharma/Aristopharma';
import Radiant from '../Radiant/Radiant';
import Healthcare from '../Healthcare/Healthcare';

const Home = () => {
    const [selectedCompany, setSelectedCompany] = useState(null);

    const handleCompanySelect = (company) => {
        setSelectedCompany(company);
    };

    return (
        <div>
            <Banner />
            <div className="button-container text-center my-5">
                <button
                    className="btn bg-blue-500 text-white mx-2"
                    onClick={() => handleCompanySelect('Aristopharma')}
                >
                    Aristopharma
                </button>
                <button
                    className="btn bg-green-500 text-white mx-2"
                    onClick={() => handleCompanySelect('Radiant')}
                >
                    Radiant
                </button>
                <button
                    className="btn bg-pink-700 text-white mx-2"
                    onClick={() => handleCompanySelect('Healthcare')}
                >
                    Healthcare
                </button>
            </div>

            {/* Conditionally render the selected company's products */}
            <div className="product-list my-5">
                {selectedCompany === 'Aristopharma' && <Aristopharma />}
                {selectedCompany === 'Radiant' && <Radiant />}
                {selectedCompany === 'Healthcare' && <Healthcare />}
            </div>
        </div>
    );
};

export default Home;

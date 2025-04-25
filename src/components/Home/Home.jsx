import { useState } from 'react';
import Banner from '../Banner/Banner';
import Aristopharma from '../Aristopharma/Aristopharma';
import Radiant from '../Radiant/Radiant';
import Healthcare from '../Healthcare/Healthcare';
import Nuvista from '../Nuvista/Nuvista';
import Renata from '../Renata/Renata';
import DrugInternational from '../DrugInternational/DrugInternational';
import Beximco from '../Beximco/Beximco';
import Delta from '../Delta/Delta';
import Synovia from '../Synovia/Synovia';

const Home = () => {
    const [selectedCompany, setSelectedCompany] = useState(null);

    const handleCompanySelect = (company) => {
        setSelectedCompany(company);
    };

    return (
        <div>
            <Banner />
            <div className="button-container text-center my-5 grid grid-cols-3 gap-3">
                <button
                    className="btn bg-blue-500 text-white mx-2"
                    onClick={() => handleCompanySelect('Aristopharma')}
                >
                    Aristopharma
                </button>
                <button
                    className="btn bg-pink-400 text-white mx-2"
                    onClick={() => handleCompanySelect('Beximco')}
                >
                    Beximco
                </button>
                <button
                    className="btn bg-amber-400 text-white mx-2"
                    onClick={() => handleCompanySelect('Delta')}
                >
                    Delta Pharma
                </button>
                <button
                    className="btn bg-orange-500 text-white mx-2"
                    onClick={() => handleCompanySelect('DrugInternational')}
                >
                    Drug International
                </button>
                <button
                    className="btn bg-pink-700 text-white mx-2"
                    onClick={() => handleCompanySelect('Healthcare')}
                >
                    Healthcare
                </button>
                <button
                    className="btn bg-purple-700 text-white mx-2"
                    onClick={() => handleCompanySelect('Nuvista')}
                >
                    Nuvista
                </button>
                <button
                    className="btn bg-green-500 text-white mx-2"
                    onClick={() => handleCompanySelect('Radiant')}
                >
                    Radiant
                </button>
                <button
                    className="btn bg-red-700 text-white mx-2"
                    onClick={() => handleCompanySelect('Renata')}
                >
                    Renata
                </button>
                <button
                    className="btn bg-lime-600 text-white mx-2"
                    onClick={() => handleCompanySelect('Synovia')}
                >
                    Synovia Pharma
                </button>
            </div>

            {/* Conditionally render the selected company's products */}
            <div className="product-list my-5">
                {selectedCompany === 'Aristopharma' && <Aristopharma />}
                {selectedCompany === 'Beximco' && <Beximco></Beximco>}
                {selectedCompany === 'Delta' && <Delta></Delta>}
                {selectedCompany === 'DrugInternational' && <DrugInternational></DrugInternational>}
                {selectedCompany === 'Healthcare' && <Healthcare />}
                {selectedCompany === 'Nuvista' && <Nuvista></Nuvista>}
                {selectedCompany === 'Radiant' && <Radiant />}
                {selectedCompany === 'Renata' && <Renata></Renata>}
                {selectedCompany === 'Synovia' && <Synovia></Synovia>}
            </div>
        </div>
    );
};

export default Home;

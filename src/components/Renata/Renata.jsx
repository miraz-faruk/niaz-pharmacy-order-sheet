import { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Healthcare = () => {
    const [values, setValues] = useState({});
    const [selectedItems, setSelectedItems] = useState([]);
    const [activeTab, setActiveTab] = useState('General'); // 👈 for switching tabs

    const handleChange = (e, itemName) => {
        const value = e.target.value;
        if (value === '' || /^[0-9]\d*$/.test(value)) {
            setValues(prev => ({
                ...prev,
                [itemName]: value
            }));
        }
    };

    const handleSelect = (itemName, itemType) => {
        const quantity = parseInt(values[itemName], 10);
        if (quantity && quantity > 0) {
            setSelectedItems(prev => {
                const existing = prev.find(item => item.name === itemName);
                const newItem = { name: itemName, type: itemType, quantity };
                if (existing) {
                    return prev.map(item =>
                        item.name === itemName ? newItem : item
                    );
                } else {
                    return [...prev, newItem];
                }
            });
        }
    };

    // 🛠️ Update the quantity safely even when it's temporarily empty
    const handleUpdateSelectedItem = (e, itemName) => {
        const value = e.target.value;

        if (value === '' || /^[0-9]+$/.test(value)) {
            setSelectedItems(prevItems =>
                prevItems.map(item =>
                    item.name === itemName ? { ...item, quantity: value } : item
                )
            );
        }
    };

    // 🧾 Generate PDF while filtering out empty or zero-quantity items
    const handleBuyNow = () => {
        const filteredItems = selectedItems.filter(item => item.quantity && parseInt(item.quantity) > 0);

        if (filteredItems.length === 0) {
            alert("No valid items to generate PDF!");
            return;
        }

        const doc = new jsPDF();
        let yPosition = 10;
        const pageHeight = doc.internal.pageSize.height;

        doc.setFontSize(20);
        doc.setTextColor('Black');
        doc.text("Niaz Pharmacy", 10, yPosition);
        yPosition += 10;

        const date = new Date().toLocaleDateString();
        doc.setFontSize(12);
        doc.text(`Date: ${date}`, 200, 10, { align: 'right' });

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text("Renata Limited", 10, yPosition);
        yPosition += 12;

        doc.setFontSize(12);
        doc.setTextColor('black');
        doc.setFont('helvetica', 'bold');
        doc.text("Items Name", 10, yPosition);
        doc.text("Quantity", 105, yPosition, { align: 'center' });
        yPosition += 5;
        doc.line(5, yPosition, 200, yPosition);
        yPosition += 8;

        doc.setFont('helvetica', 'normal');

        filteredItems.forEach(item => {
            if (yPosition > pageHeight - 20) {
                doc.addPage();
                yPosition = 10;

                // Add header on new page
                doc.setFontSize(12);
                doc.setFont('helvetica', 'bold');
                doc.text("Items Name", 10, yPosition);
                doc.text("Quantity", 105, yPosition, { align: 'center' });
                yPosition += 5;
                doc.line(5, yPosition, 200, yPosition);
                yPosition += 8;
                doc.setFont('helvetica', 'normal');
            }

            doc.text(item.name, 10, yPosition);
            const quantityWidth = doc.getTextWidth(item.quantity.toString());
            const quantityX = 105 - quantityWidth;
            doc.text(item.quantity.toString(), quantityX, yPosition);
            yPosition += 10;
        });

        doc.save('Renata Limited.pdf');
    };

    // Sort items alphabetically
    const generalItems = [
        { name: 'Algin Inj' },
        { name: 'Algin Syp 50 ml' },
        { name: 'Algin Tab 50 mg' },
        { name: 'Alkanon DT Tab 1000 mg' },
        { name: 'Alkanon Tab 500 mg' },
        { name: 'Alkanon Tab 750 mg' },
        { name: 'Androcap Cap 40 mg' },
        { name: 'Angela Tab 1 mg' },
        { name: 'Beconex Syp 100 ml' },
        { name: 'Beconex Syp 200 ml' },
        { name: 'Becosules Gold Cap' },
        { name: 'Bredicon Tab 0.075 mg' },
        { name: 'Cabolin Tab 0.5 mg' },
        { name: 'Calcin-D Tab 500 mg' },
        { name: 'Calcin-DX Tab 600 mg' },
        { name: 'Calcin-M Tab' },
        { name: 'Calcin-O DS Tab 740 mg' },
        { name: 'Calcin-O Tab 400 mg' },
        { name: 'Cebuten Cap 400 mg' },
        { name: 'Ceclofen Tab 100 mg' },
        { name: 'Cilma Tab 10 mg' },
        { name: 'Cilma Tab 5 mg' },
        { name: 'Conasyd Cream 1% 10 gm' },
        { name: 'Coralcin-D Tab 500 mg' },
        { name: 'Coralcin-DX 15 Tab' },
        { name: 'Coralcin-DX 30 Tab' },
        { name: "Criptine Tab" },
        { name: 'Danzol Cap 100 mg' },
        { name: 'Danzol Cap 200 mg' },
        { name: 'Decaren Cap 100 mg' },
        { name: 'Decaren Cap 60 mg' },
        { name: 'Delentin Suspension 50 ml' },
        { name: 'Deltasone Syp 50 ml' },
        { name: 'Deltasone Tab 10 mg' },
        { name: 'Deltasone Tab 20 mg' },
        { name: 'Deltasone Tab 5 mg' },
        { name: 'Denixil Tab 0.25 mg' },
        { name: 'Denixil Tab 0.5 mg' },
        { name: 'Denixil Tab 1 mg' },
        { name: 'Denixil Tab 2 mg' },
        { name: 'Desolon Tab 0.03 mg' },
        { name: 'Domiren Pediatric Drop 5 ml' },
        { name: 'Domiren Suspension 60 ml' },
        { name: 'Domiren Tab 10 mg' },
        { name: 'Doxicap Cap 100 mg' },
        { name: 'Dysmen Tab 500 mg' },
        { name: 'E-Gel DS Cap 400 IU' },
        { name: 'Eazy Jelly Topical Gel 50 gm' },
        { name: 'Emcon 1' },
        { name: 'Erythrox Suspension 100 ml' },
        { name: 'Escilex Tab 10 mg' },
        { name: 'Escilex Tab 5 mg' },
        { name: 'Estracon Tab 0.625 mg' },
        { name: 'Estracon Vaginal Cream 0.0625% 15 gm' },
        { name: 'Fenadin Suspension 30 ml' },
        { name: 'Fenadin Suspension 50 ml' },
        { name: 'Fenadin Tab 120 mg' },
        { name: 'Fenadin Tab 180 mg' },
        { name: 'Fenadin Tab 60 mg' },
        { name: 'Ferix-V Cap' },
        { name: 'Flontin Suspension 60 ml' },
        { name: 'Flontin Tab 500 mg' },
        { name: 'Flustar Cap 250 mg' },
        { name: 'Flustar Cap 500 mg' },
        { name: 'Flustar Suspension 100 ml' },
        { name: 'Folinic Tab 5 mg' },
        { name: 'Furocef Suspension 70 ml' },
        { name: 'Furocef Tab 250 mg' },
        { name: 'Furocef Tab 500 mg' },
        { name: 'Furoclav Suspension 70 ml' },
        { name: 'Furoclav Tab 250 mg' },
        { name: 'Furoclav Tab 500 mg' },
        { name: 'GABA-P Cap 25 mg' },
        { name: 'GABA-P Cap 50 mg' },
        { name: 'GABA-P Cap 75 mg' },
        { name: 'Gaba Tab 300 mg' },
        { name: 'Gaba-P CR Tab 165 mg' },
        { name: 'Gaba-P CR Tab 330 mg' },
        { name: 'Gaba-P CR Tab 82.5 mg' },
        { name: 'Gestrenol Tab 5 mg' },
        { name: 'Giane Tab 35' },
        { name: 'Gynova Tab 2 mg' },
        { name: 'Honycol Syp' },
        { name: 'Kiddi Syp 100 ml' },
        { name: 'Letrol Tab 2.5 mg' },
        { name: 'Levoking Tab 500 mg' },
        { name: 'Linez Tab 400 mg' },
        { name: 'Linez Tab 600 mg' },
        { name: 'Lucan-R Cap 50 mg' },
        { name: 'Lucan-R Suspension 50 mg' },
        { name: 'Lucent Cap 0.25 mg' },
        { name: 'Luliren Cream 1% 10 gm' },
        { name: 'Luliren Cream 1% 20 gm' },
        { name: 'Maxipass Cap 0.4 mg' },
        { name: 'Maxpro Cap 20 mg' },
        { name: 'Maxpro Cap 40 mg' },
        { name: 'Maxpro MUPS Tab 20 mg' },
        { name: 'Maxpro MUPS Tab 40 mg' },
        { name: 'Maxpro Tab 20 mg' },
        { name: 'Maxpro Tab 40 mg' },
        { name: 'Menorest Tab 2.5 mg' },
        { name: 'Microgest Cap 100 mg' },
        { name: 'Microgest Cap 200 mg' },
        { name: "Mupitop Oint" },
        { name: 'Myosit Plus Tab 150 mg' },
        { name: 'Myosit Tab 750 mg' },
        { name: 'Nebiren Tab 2.5 mg' },
        { name: 'Nebiren Tab 5 mg' },
        { name: 'Neogest Tab 2 mg' },
        { name: 'Neurobest Inj 3 ml' },
        { name: 'Neurobest Tab' },
        { name: 'Normanal Tab 500 mg' },
        { name: 'Normens Tab 5 mg' },
        { name: 'Norry Tab 3 mg' },
        { name: 'Novelon Lite Tab 3 mg' },
        { name: 'Novelon Tab 3 mg' },
        { name: 'Odmon Chewable Tab 5 mg' },
        { name: 'Odmon Tab 10 mg' },
        { name: 'Odmon Tab 4 mg' },
        { name: 'Opexa Tab 20 mg' },
        { name: 'Orcef Cap 200 mg' },
        { name: 'Orcef Cap 400 mg' },
        { name: 'Orcef DS Suspension 200 mg' },
        { name: 'Orcef Suspension 50 mg' },
        { name: 'Orcef Suspension 70 mg' },
        { name: 'Orcef Tab 200 mg' },
        { name: 'Orcef Tab 400 mg' },
        { name: 'Ovulet Tab 100 mg' },
        { name: 'Ovulet Tab 50 mg' },
        { name: 'Polycef Cap 250 mg' },
        { name: 'Polycef Cap 500 mg' },
        { name: 'Prazole Cap 20 mg' },
        { name: 'Pulmino Tab 200 mg' },
        { name: 'Regumen Tab 0.05 mg' },
        { name: 'Renxit Tab 0.5 mg' },
        { name: 'Rephaston Tab 10 mg' },
        { name: 'Rolac Tab 10 mg' },
        { name: 'Salburen Inhaler 100 mg' },
        { name: 'Saltica Inhalation Cap 50 mg' },
        { name: 'Saltica Inhaler 25 mg' },
        { name: 'Sperid Tab 1 mg' },
        { name: 'Sperid Tab 2 mg' },
        { name: 'Sperid Tab 4 mg' },
        { name: 'Stark Tab 10 mg' },
        { name: "Suvazol 65" },
        { name: 'Terbimax Cream 1% 10 gm' },
        { name: 'Terbimax Tab 250 mg' },
        { name: 'Thyrox Tab 100 mg' },
        { name: 'Thyrox Tab 12.5 mg' },
        { name: 'Thyrox Tab 25 mg' },
        { name: 'Thyrox Tab 50 mg' },
        { name: 'Thyrox Tab 75 mg' },
        { name: 'Tigover Tab 10 mg' },
        { name: 'Tigover Tab 5 mg' },
        { name: 'Tolter Tab 2 mg' },
        { name: 'Topmate Tab 25 mg' },
        { name: 'Topmate Tab 50 mg' },
        { name: 'Totifen Syp 100 ml' },
        { name: 'Totifen Tab 1 mg' },
        { name: 'Tritin Tab 100 mg' },
        { name: 'Trulax Syp 100 ml' },
        { name: 'Ulfix Suspension 200 ml' },
        { name: 'VCAP VS' },
        { name: 'Valporin CR Tab 200 mg' },
        { name: 'Valporin CR Tab 300 mg' },
        { name: 'Valporin CR Tab 500 mg' },
        { name: 'Vomiren Cap 0.5 mg' },
        { name: 'Vomiren Tab 0.5 mg' },
        { name: 'Voxamin Tab 100 mg' },
        { name: 'Voxamin Tab 50 mg' },
        { name: 'Xamic Cap 500 mg' },
        { name: 'Xamic Tab 650 mg' },
        { name: 'Zithrin Tab 500 mg' },
        { name: 'Zodef Suspension 60 ml' },
        { name: 'Zodef Tab 24 mg' },
        { name: 'Zodef Tab 6 mg' },
    ].sort((a, b) => a.name.localeCompare(b.name));

    const cardiacItems = [
        { name: 'Alphapress Tab 1 mg' },
        { name: 'Alphapress Tab 2 mg' },
        { name: 'Alphapress XR Tab 2.5 mg' },
        { name: 'Alphapress XR Tab 5 mg' },
        { name: 'Antogin ER Tab 500 mg' },
        { name: "Azisan Tablet 40 mg" },
        { name: "Azisan Plus 40/12.5 mg" },
        { name: 'Bigmet Tab 500 mg' },
        { name: 'Bigmet Tab 850 mg' },
        { name: 'Bigmet XR Tab 500 mg' },
        { name: 'Bisoren M Tab 2.5 mg' },
        { name: 'Bisoren Plus Tab 2.5 mg' },
        { name: 'Bisoren Plus Tab 5 mg' },
        { name: 'Bisoren Tab 2.5 mg' },
        { name: 'Bisoren Tab 5 mg' },
        { name: 'Cardipin Plus Tab 50 mg' },
        { name: 'Cardipin Tab 5 mg' },
        { name: 'Cilma Tab 5 mg' },
        { name: 'Cilma Tab 10 mg' },
        { name: 'Diampa M Tab 500 mg' },
        { name: 'Diampa Tab 10 mg' },
        { name: 'Diampa Tab 25 mg' },
        { name: 'Entrovas Tab 50 mg' },
        { name: 'Entrovas Tab 100 mg' },
        { name: 'Entrovas Tab 200 mg' },
        { name: 'Fenobate Cap 200 mg' },
        { name: 'Glinta Tab 5 mg' },
        { name: 'Glinta-M Tab 2.5/500' },
        { name: 'Glinta-M Tab 2.5/850' },
        { name: 'Glinta Plus Tab 10 mg' },
        { name: 'Glinta Plus Tab 25 mg' },
        { name: 'Glicron CR Cap 30 mg' },
        { name: 'Glicron Tab 80 mg' },
        { name: 'Nitroren SR Tab 2.6 mg' },
        { name: 'Novelip Tab 180 mg' },
        { name: 'Ostan Plus Tab 50 mg' },
        { name: 'Ostan Tab 25 mg' },
        { name: 'Ostan Tab 50 mg' },
        { name: 'Phenocept 500 mg' },
        { name: 'Pendoril Tab 2 mg' },
        { name: 'Pendoril Tab 4 mg' },
        { name: 'Pendoril Plus Tab 4 mg' },
        { name: 'Pendoril Plus Tab 4 mg' },
        { name: 'Plagrin Plus Tab 75 mg' },
        { name: 'Plagrin Tab 75 mg' },
        { name: 'Rolip Tab 10 mg' },
        { name: 'Rolip Tab 20 mg' },
        { name: 'Rolip Tab 5 mg' },
        { name: 'Rezor Max Tab 5 mg' },
        { name: 'Rezor Tab 20 mg' },
        { name: 'Sitacret M Tab 500 mg' },
        { name: 'Telpro Max Tab 40 mg' },
        { name: 'Telpro Max Tab 80 mg' },
        { name: 'Telpro Plus Tab 40 mg' },
        { name: 'Telpro Plus Tab 80 mg' },
        { name: 'Telpro Tab 20 mg' },
        { name: 'Telpro Tab 40 mg' },
        { name: 'Telpro Tab 80 mg' },
        { name: 'Taven Tab 10 mg' },
        { name: 'Taven Tab 20 mg' },
        { name: 'Taven EZ Tab 20 mg' },
        { name: 'Taven EZ Tab 10 mg' },
        { name: 'Trizedon MR Tab 35 mg' },
        { name: 'Uritone Tab 20 mg' },
    ].sort((a, b) => a.name.localeCompare(b.name));

    const purnavaItems = [
        { name: 'Aliksir Cap 500  mg' },
        { name: 'Espirar Cap' },
        { name: 'Ginera Cap 500  mg' },
        { name: 'Good Gut Cap' },
        { name: 'JeeBee 120  mg' },
        { name: 'Lactohil Powder' },
        { name: 'Nutrilina Cap 500  mg' },
        { name: 'Pregcare Powder' },
    ].sort((a, b) => a.name.localeCompare(b.name));

    const itemsMap = {
        Cardiac: cardiacItems,
        Purnava: purnavaItems,
        General: generalItems
        // ... add more as needed
    };

    const currentItems = itemsMap[activeTab] || itemsMap["General"] || [];

    // const currentItems = activeTab === 'Cardiac' ? cardiacItems : generalItems;

    return (
        <div className='mx-3'>
            {/* Tabs */}
            <div className='flex gap-3 my-4'>
                <button
                    className={`btn ${activeTab === 'Cardiac' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('Cardiac')}
                >
                    Cardiac
                </button>
                <button
                    className={`btn ${activeTab === 'General' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('General')}
                >
                    General
                </button>
                <button
                    className={`btn ${activeTab === 'Purnava' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('Purnava')}
                >
                    Purnava
                </button>
            </div>

            <h2 className='text-lg font-medium'>{activeTab} Items</h2>
            <div className='my-2'>
                <hr />
            </div>

            <div>
                {currentItems.map(item => (
                    <div key={item.name} className='grid grid-cols-4 items-center gap-2'>
                        <p className='col-span-2'>{item.name}</p>
                        <input
                            className='border border-green-200 text-center py-3 px-2 rounded-lg'
                            type="number"
                            value={values[item.name] || ''}
                            onChange={(e) => handleChange(e, item.name)}
                            min="1"
                        />
                        <button
                            className={`btn text-white rounded-xl ${values[item.name] ? 'bg-purple-300' : 'bg-gray-300 cursor-not-allowed'}`}
                            disabled={!values[item.name]}
                            onClick={() => handleSelect(item.name, activeTab)}
                        >
                            Select
                        </button>
                    </div>
                ))}
            </div>

            <div className='mt-10'>
                <hr />
                <h2>Selected Items here:</h2>
                <ul>
                    {selectedItems.map((item, index) => (
                        <li key={index} className='grid grid-cols-4 items-center gap-2'>
                            <p className='col-span-2'>{item.name}</p>
                            <input
                                className='border border-green-200 py-3 px-2 rounded-lg text-center'
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleUpdateSelectedItem(e, item.name)}
                                min="1"
                            />
                        </li>
                    ))}
                </ul>
                <button className='btn bg-green-500 text-white my-3 rounded-xl' onClick={handleBuyNow}>
                    Generate Order Sheet
                </button>
            </div>
        </div>
    );
};

export default Healthcare;
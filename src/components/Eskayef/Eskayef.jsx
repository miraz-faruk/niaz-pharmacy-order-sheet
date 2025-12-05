import { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Eskayef = () => {
    const [values, setValues] = useState({});
    const [selectedItems, setSelectedItems] = useState([]);
    const [activeTab, setActiveTab] = useState('Cardiac'); // 👈 for switching tabs

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
        doc.text("Eskayef Pharmaceuticals Ltd", 10, yPosition);
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

        doc.save(`Eskayef-${activeTab.toLowerCase()}.pdf`);
    };

    // Cardiac items
    const cardiacItems = [
        { name: 'Aldorin Tab 50 mg' },
        { name: 'Amlevo Tab 2.5 mg' },
        { name: 'Amlevo Tab 5 mg' },
        { name: 'Arnis Tab 50 mg' },
        { name: 'Cardimet MR Tab 35 mg' },
        { name: 'Cardobis Tab 5 mg' },
        { name: 'Cardobis Tab 2.5 mg' },
        { name: 'Cardobis M Tab 2.5 mg' },
        { name: 'Cardobis Plus Tab 5 mg' },
        { name: 'Cardobis Plus Tab 2.5 mg' },
        { name: 'Cardon Tab 50 mg' },
        { name: 'Cardon Tab 25 mg' },
        { name: 'CardoPlus Tab 50 mg' },
        { name: 'Cifibet Tab 100 mg' },
        { name: 'Creston Tab 10 mg' },
        { name: 'Creston Tab 5 mg' },
        { name: 'Dezide Tab 50 mg' },
        { name: 'Dialon Tab 1 mg' },
        { name: 'Dialon Tab 2 mg' },
        { name: 'Dialon Tab 3 mg' },
        { name: 'Duoliv Tab 10 mg' },
        { name: 'Duoliv Tab 5 mg' },
        { name: 'Edenil Tab 20 mg' },
        { name: 'Emazid Tab 10 mg' },
        { name: 'Emazid Tab 25 mg' },
        { name: 'Emazid L Tab 25 mg' },
        { name: 'Emazid L Tab 10 mg' },
        { name: 'Emazid M Tab 2.5/500 mg' },
        { name: 'Emazid M Tab 5/500 mg' },
        { name: 'Ethinor Tab 5 mg' },
        { name: 'Glikazid Tab 80 mg' },
        { name: 'Glikazid MR Tab 30 mg' },
        { name: 'Glikazid MR Tab 60 mg' },
        { name: 'GTN Spray 400 mg' },
        { name: 'GTN SR Tab 2.6 mg' },
        { name: 'Ligazid Tab 5 mg' },
        { name: 'Ligazid M Tab 2.5/500 mg' },
        { name: 'Ligazid M Tab 2.5/850 mg' },
        { name: 'Ligazid M Tab 2.5/1000 mg' },
        { name: 'Lipicon Tab 10 mg' },
        { name: 'Lipicon Tab 20 mg' },
        { name: 'Lipicon EZ Tab 10 mg' },
        { name: 'Lipicon EZ Tab 20 mg' },
        { name: 'Losita Tab 10 mg' },
        { name: 'Losita Tab 5 mg' },
        { name: 'Noclog Tab 75 mg' },
        { name: 'Noclog Plus Tab 150 mg' },
        { name: 'Olmesta Tab 10 mg' },
        { name: 'Olmesta Tab 20 mg' },
        { name: 'Olmesta Tab 40 mg' },
        { name: 'Olmesta M Tab 20 mg' },
        { name: 'Olmesta M Tab 40 mg' },
        { name: 'Olmesta Plus Tab 20 mg' },
        { name: 'Rivarox Tab 10 mg' },
        { name: 'Rivarox Tab 2.5 mg' },
        { name: 'Sentix Tab 0.5 mg' },
        { name: 'Sentix Tab 1 mg' },
        { name: 'Sidopin Tab 5 mg' },
        { name: 'Sidoplus Tab 25 mg' },
        { name: 'Sidoplus Tab 50 mg' },
        { name: 'Sitazid M Tab 500 mg' },
        { name: 'Tems Tab 40 mg' },
        { name: 'Tems Tab 80 mg' },
        { name: 'Tems Tab 20 mg' },
        { name: 'Tems A Tab 40 mg' },
        { name: 'Tems A Tab 80 mg' },
        { name: 'Tems Plus Tab 40 mg' },
        { name: 'Tems Plus Tab 80 mg' },
        { name: 'Tenoxim Tab 20 mg' },
        { name: 'Tibonor Tab 2.5 mg' },
        { name: 'Tojak Tab 5 mg' }
    ].sort((a, b) => a.name.localeCompare(b.name));

    // General items
    const generalItems = [
        { name: 'Alben Suspension' },
        { name: 'Alben-DS Tab 400 mg' },
        { name: 'Amboten Syp' },
        { name: 'Augment Tab 375 mg' },
        { name: 'Augment Tab 625 mg' },
        { name: 'Augment Tab 1000 mg' },
        { name: 'Biltin Tab 10 mg' },
        { name: 'Biltin Tab 20 mg' },
        { name: 'Biltin OS' },
        { name: 'Caridol Tab 250 mg' },
        { name: 'Cloron Tab 2 mg' },
        { name: 'Cloron Tab 0.5 mg' },
        { name: 'Cloron Tab 1 mg' },
        { name: 'CoracaD-C Tab 1000 mg' },
        { name: 'Cortider Cream 1%' },
        { name: 'Danamet Cap 100 mg' },
        { name: 'Danamet Cap 200 mg' },
        { name: 'Dexpofen Syp' },
        { name: 'Dexpoten Plus Syp' },
        { name: 'Dilator Tab 10 mg' },
        { name: 'Dinafex Suspension' },
        { name: 'Dinafex Tab 120 mg' },
        { name: 'Dumax Tab 30 mg' },
        { name: 'Dumax Tab 60 mg' },
        { name: 'Elmood Tab 45 mg' },
        { name: 'Esoral Tab 40 mg' },
        { name: 'Esoral Cap 40 mg' },
        { name: 'Esoral Cap 20 mg' },
        { name: 'Esoral Tab 20 mg' },
        { name: 'Esoral MUPS Tab 20 mg' },
        { name: 'Esoral MUPS Tab 40 mg' },
        { name: 'Etorix Tab 90 mg' },
        { name: 'Etorix Tab 120 mg' },
        { name: 'Etorix Tab 60 mg' },
        { name: 'Facid Tab 250 mg' },
        { name: 'Facid Oint' },
        { name: 'Facid Cream' },
        { name: 'Facid BT Cream' },
        { name: 'Facid HC Cream' },
        { name: 'Fenobac Tab 10 mg' },
        { name: 'Feofol Cap 150 mg' },
        { name: 'Feofol-Cl Cap 50 mg' },
        { name: 'Feozin Tab 5 mg' },
        { name: 'Fericit Tab 210 mg' },
        { name: 'Flucloxin Suspension' },
        { name: 'Flucloxin Cap 250 mg' },
        { name: 'Flucloxin Cap 500 mg' },
        { name: 'Folimax Tab 15 mg' },
        { name: 'Folimax Tab 5 mg' },
        { name: 'Gasnil Pediatric Drop' },
        { name: 'Gastid (Orange Flavor) Suspension' },
        { name: 'Gastrum Suspension' },
        { name: 'Hi-C Syp' },
        { name: 'Indus Tab 50 mg' },
        { name: 'Hunny Syp' },
        { name: 'Juci Powder 500 mg' },
        { name: 'Juci Diet Powder 500 mg' },
        { name: 'Kefuclav Tab 250 mg' },
        { name: 'Kefuclav Tab 500 mg' },
        { name: 'Kefuclav Suspension 70 ml' },
        { name: 'Kilmax Tab 500 mg' },
        { name: 'Licnil Lotion 0.5%' },
        { name: 'Losectil Powder 40 mg' },
        { name: 'Losectil Cap 20 mg' },
        { name: 'Losectil Cap 40 mg' },
        { name: 'Losectil Powder 20 mg' },
        { name: 'Losectil Cap 10 mg' },
        { name: 'Losectil MUPS Tab 40 mg' },
        { name: 'Losectil MUPS Tab 20 mg' },
        { name: 'Losectil V Cap 20 mg' },
        { name: 'Lulizol Cream 10 gm' },
        { name: 'Lulizol Cream 20 gm' },
        { name: 'Lulizol Lotion 50 gm' },
        { name: 'Lumona Tab 10 mg' },
        { name: 'Lumona FT 4 mg' },
        { name: 'Lumona FT 5 mg' },
        { name: 'Mig Tab 2.5 mg' },
        { name: 'Mig Tab 5 mg' },
        { name: 'Mig Tab 10 mg' },
        { name: 'Milam Tab 7.5 mg' },
        { name: 'Miraten Syp' },
        { name: 'Mycofin Tab 250 mg' },
        { name: 'Nabumet Tab 500 mg' },
        { name: 'Nabumet Tab 750 mg' },
        { name: 'Napdas Tab 500 mg' },
        { name: 'Naprox Tab 250 mg' },
        { name: 'Naprox Tab 500 mg' },
        { name: 'Naprox Plus Tab 375 mg' },
        { name: 'Naprox Plus Tab 500 mg' },
        { name: 'Norium Tab 5 mg' },
        { name: 'Norium Tab 10 mg' },
        { name: 'NRG Powder' },
        { name: 'NRG Powder Orange' },
        { name: 'Oradin Tab 10 mg' },
        { name: 'Oradin Suspension' },
        { name: 'Osticare Tab 750 mg' },
        { name: 'Ostocal C Tab 1000 mg' },
        { name: 'Ostocal D 30 Tab 500 mg' },
        { name: 'Ostocal D 20 Tab 500 mg' },
        { name: 'Ostocal DX Tab 600 mg' },
        { name: 'Ostocal G Tab 500 mg' },
        { name: 'Ostocal GX Tab 600 mg' },
        { name: 'Ostocal JR Tab 250 mg' },
        { name: 'Ostocal M Tab' },
        { name: 'Ostocal Vita Tab' },
        { name: 'Paino Tab 100 mg' },
        { name: 'Perosa Cream 5%' },
        { name: 'PG Cap 50 mg' },
        { name: 'PG Cap 75 mg' },
        { name: 'PG Cap 25 mg' },
        { name: 'PG Cap 150 mg' },
        { name: 'PG CR Tab 82.5 mg' },
        { name: 'PG CR Tab 165 mg' },
        { name: 'Pikos Tab 10 mg' },
        { name: 'Pikos Syp' },
        { name: 'Phytocal D Tab 500 mg' },
        { name: 'Phytocal DX Tab 600 mg' },
        { name: 'Quinox Tab 500 mg' },
        { name: 'Quinox DS Suspension' },
        { name: 'Rabifast Tab 20 mg' },
        { name: 'Reelife Tab 5 mg' },
        { name: 'Reelife DS Tab 10 mg' },
        { name: 'Ridon Tab 10 mg' },
        { name: 'Ridon EG' },
        { name: 'Roxim Cap 200 mg' },
        { name: 'Roxim Cap 400 mg' },
        { name: 'Roxim Suspension 50 ml' },
        { name: 'Sensit Tab' },
        { name: 'SK-cef Cap 500 mg' },
        { name: 'SK Mox Tab 500 mg' },
        { name: 'Solbion Tab' },
        { name: 'Solvit-B Tab' },
        { name: 'Solvit-M Tab' },
        { name: 'Sulidac Tab 200 mg' },
        { name: 'SuperItra Cap 65 mg' },
        { name: 'Tamen Tab 500 mg' },
        { name: 'Tamen Syp 60 ml' },
        { name: 'Tamen Turbo Tab' },
        { name: 'Tamen XR Tab 665 mg' },
        { name: 'Telazine Tab 1 mg' },
        { name: 'Telazine Tab 5 mg' },
        { name: 'Topibet CL Oint' },
        { name: 'Topiclo S Oint' },
        { name: 'Toti Tab 1 mg' },
        { name: 'Toti Syp' },
        { name: 'Trioclav Tab' },
        { name: 'Tufnil Tab 200 mg' },
        { name: 'Tulac OS' },
        { name: 'Tuscof Syp' },
        { name: 'Urokit Tab 1080 mg' },
        { name: 'Urokit Plus OS' },
        { name: 'Valenty Tab 10 mg' },
        { name: 'Valenty Tab 20 mg' },
        { name: 'Vini Tab 20 mg' },
        { name: 'Voltagel Gel 10 gm ' },
        { name: 'Voltagel Gel 50 gm ' },
        { name: 'Xinc Tab 20 mg' },
        { name: 'Xinc Syp' },
        { name: 'Xinc B Tab' },
        { name: 'Xinc B Syp' },
        { name: 'Xinc OT Tab' },
        { name: 'Zatral Tab 10 mg' },
        { name: 'Zeefol-CI Cap' },
        { name: 'Zithrox Tab 500 mg' },
        { name: 'Zofra OS 50 ml' },
        { name: 'Zofra ODT Tab 4 mg' },
        { name: 'Zofra ODT Tab 8 mg' },
    ].sort((a, b) => a.name.localeCompare(b.name));

    const currentItems = activeTab === 'Cardiac' ? cardiacItems : generalItems;

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
                    {selectedItems
                        .slice() // make a copy (to avoid mutating original state)
                        .sort((a, b) => a.name.localeCompare(b.name)) // sort alphabetically
                        .map((item, index) => (
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

export default Eskayef;
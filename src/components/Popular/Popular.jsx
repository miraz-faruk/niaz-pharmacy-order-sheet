import { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Popular = () => {
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
        doc.text("Popular Pharmaceuticals Ltd", 10, yPosition);
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

        doc.save(`Popular-${activeTab.toLowerCase()}.pdf`);
    };

    // Cardiac items
    const cardiacItems = [
        { name: 'Amlovas AT' },
        { name: 'Betacor 5 mg' },
        { name: 'Cilnivas 5 mg' },
        { name: 'Cilnivas 10 mg' },
        { name: 'Hypophos 667 mg' },
        { name: 'Nitrovas SR 2.6 mg' },
        { name: 'Olmevas 20 mg' },
        { name: 'Olmevas 40 mg' },
        { name: 'Olmevas AM 5/20' },
        { name: 'Olmevas AM 5/40' },
        { name: 'Olmevas HZ' },
        { name: 'Ramil 1.25 mg' },
        { name: 'Ramil 2.5 mg' },
        { name: 'Ramil 5 mg' },
        { name: 'Sodicarb 600 mg' },
        { name: 'Sodiclor 300 mg' },
        { name: 'Sodiclor 600 mg' },
        { name: 'Spirocard 25 mg' },
        { name: 'Spirocard 50 mg' },
        { name: 'Spirocard 100 mg' },
        { name: 'Spirocard Plus' },
        { name: 'Telmivas 40 mg' },
        { name: 'Telmivas 80 mg' },
        { name: 'Telmivas 20 mg' },
    ].sort((a, b) => a.name.localeCompare(b.name));

    // General items
    const generalItems = [
        { name: 'Anzet Tab' },
        { name: 'B126 Tab' },
        { name: 'Bilastin Oral Solution 60 ml' },
        { name: 'Bilastin Tab 20 mg' },
        { name: 'Bilastin Kids Tab 10 mg' },
        { name: 'Bonigen Tab' },
        { name: 'Clavurox Tab 250 mg' },
        { name: 'Clavurox Tab 500 mg' },
        { name: 'Colacap Cap 40 mg' },
        { name: 'Combiderm Cream 15 gm' },
        { name: 'Dexogut Cap 30 mg' },
        { name: 'Dexogut Cap 60 mg' },
        { name: 'Domilux Tab 10 mg' },
        { name: 'Ebatin Syp 30 ml' },
        { name: 'Ebatin Tab 10 mg' },
        { name: 'Ebatin Fast Tab 10 mg' },
        { name: 'Elagolic Tab 150 mg' },
        { name: 'Elagolic Tab 200 mg' },
        { name: 'Gavisco Suspension 200 ml' },
        { name: 'Gemiflox Tab 320 mg' },
        { name: 'Itolux Tab 50 mg' },
        { name: 'Kalcoral kit Tab' },
        { name: 'Kalcoral-C Tab' },
        { name: 'Kalcoral-D Tab' },
        { name: 'Kalcoral-DX Tab' },
        { name: 'Kalcoral-K Tab' },
        { name: 'Laxopic Tab 10 mg' },
        { name: 'Laxopic Oral Solution 50 ml' },
        { name: 'Laxopride Tab 1 mg' },
        { name: 'Laxopride Tab 2 mg' },
        { name: 'Lindac Tab 100 mg' },
        { name: 'Lindac Tab 200 mg' },
        { name: 'M-lucas Tab 4 mg' },
        { name: 'M-lucas Tab 5 mg' },
        { name: 'M-lucas Tab 10 mg' },
        { name: 'Migalin Tab 2.5 mg' },
        { name: 'Migalin Tab 5 mg' },
        { name: 'Migalin Tab 10 mg' },
        { name: 'Moxibac Tab 15 mg' },
        { name: 'N-Sol Nasal Drop' },
        { name: 'Nabumax Tab 500 mg' },
        { name: 'Nabumax Tab 750 mg' },
        { name: 'Nabumax Tab 1000 mg' },
        { name: 'Naspro Plus Tab 375 mg' },
        { name: 'Naspro Plus Tab 500 mg' },
        { name: 'Obecol Tab 5 mg' },
        { name: 'Obecol Tab 10 mg' },
        { name: 'Pegalin Cap 25 mg' },
        { name: 'Pegalin Cap 50 mg' },
        { name: 'Pegalin Cap 75 mg' },
        { name: 'Pegalin Cap 100 mg' },
        { name: 'Pegalin Cap 150 mg' },
        { name: 'Pegalin ER Tab 82.5 mg' },
        { name: 'Pegalin ER Tab 165 mg' },
        { name: 'Pegalin ER Tab 330 mg' },
        { name: 'Progut Tab 20 mg' },
        { name: 'Progut Cap 20 mg' },
        { name: 'Progut Cap 40 mg' },
        { name: 'Progut MUPS Tab 20 mg' },
        { name: 'Progut MUPS Tab 40 mg' },
        { name: 'Rabigut Tab 20 mg' },
        { name: 'Toramax Tab 10 mg' },
        { name: 'Vonomax Tab 20 mg' },
        { name: 'Vonomax Tab 10 mg' },
        { name: 'Vonomax Duo Tab' },
        { name: 'Vonomax Trio Tab' },
        { name: 'Zemicef Cap 200 mg' },
        { name: 'Zemicef Cap 400 mg' },
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

export default Popular;
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
        { name: 'Anzet Tablet' },
        { name: 'B126 Tablet' },
        { name: 'Bilastin Oral Solution' },
        { name: 'Bilastin Tablet' },
        { name: 'Bilastin Kids Tablet' },
        { name: 'Bonigen Tablet' },
        { name: 'Clavurox Tablet' },
        { name: 'Clavurox Tablet' },
        { name: 'Colacap Capsule' },
        { name: 'Combiderm Cream' },
        { name: 'Dexogut Capsule' },
        { name: 'Dexogut Capsule' },
        { name: 'Domilux Tablet' },
        { name: 'Ebatin Syrup' },
        { name: 'Ebatin Tablet' },
        { name: 'Ebatin Fast Tablet' },
        { name: 'Elagolic Tablet' },
        { name: 'Elagolic Tablet' },
        { name: 'Gavisco Suspension' },
        { name: 'Gemiflox Tablet' },
        { name: 'Itolux Tablet' },
        { name: 'Kalcoral kit Tablet' },
        { name: 'Kalcoral-C Tablet' },
        { name: 'Kalcoral-D Tablet' },
        { name: 'Kalcoral-DX Tablet' },
        { name: 'Kalcoral-K Tablet' },
        { name: 'Laxopic Tablet' },
        { name: 'Laxopic Oral Solution' },
        { name: 'Laxopride Tablet' },
        { name: 'Laxopride Tablet' },
        { name: 'Lindac Tablet' },
        { name: 'Lindac Tablet' },
        { name: 'M-lucas Chewable Tablet' },
        { name: 'M-lucas Chewable Tablet' },
        { name: 'M-lucas Tablet' },
        { name: 'Migalin Tablet' },
        { name: 'Migalin Tablet' },
        { name: 'Migalin Tablet' },
        { name: 'Moxibac Tablet' },
        { name: 'N-Sol Nasal Drop' },
        { name: 'Nabumax Tablet' },
        { name: 'Nabumax Tablet' },
        { name: 'Naspro Plus Tablet' },
        { name: 'Naspro Plus Tablet' },
        { name: 'Obecol Tablet' },
        { name: 'Obecol Tablet' },
        { name: 'Pegalin Capsule' },
        { name: 'Pegalin Capsule' },
        { name: 'Pegalin Capsule' },
        { name: 'Pegalin ER Tablet' },
        { name: 'Pegalin ER Tablet' },
        { name: 'Progut Tablet' },
        { name: 'Progut Capsule' },
        { name: 'Progut Capsule' },
        { name: 'Progut MUPS Tablet' },
        { name: 'Progut MUPS Tablet' },
        { name: 'Rabigut Tablet' },
        { name: 'Toramax Tablet' },
        { name: 'Vonomax Tablet' },
        { name: 'Vonomax Tablet 10 mg' },
        { name: 'Vonomax Duo Tablet' },
        { name: 'Vonomax Trio Tablet' },
        { name: 'Zemicef Capsule' },
        { name: 'Zemicef Capsule' },
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
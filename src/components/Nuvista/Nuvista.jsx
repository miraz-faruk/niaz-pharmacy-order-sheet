import { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Nuvista = () => {
    const [values, setValues] = useState({});
    const [selectedItems, setSelectedItems] = useState([]);

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

        doc.setFontSize(20);
        doc.setTextColor('Black');
        doc.text("Niaz Pharmacy", 10, yPosition);
        yPosition += 10;

        const date = new Date().toLocaleDateString();
        doc.setFontSize(12);
        doc.text(`Date: ${date}`, 200, 10, { align: 'right' });

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text("Nuvista Pharma", 10, yPosition);
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
            doc.text(item.name, 10, yPosition);
            const quantityWidth = doc.getTextWidth(item.quantity.toString());
            const quantityX = 105 - quantityWidth;
            doc.text(item.quantity.toString(), quantityX, yPosition);
            yPosition += 10;
        });

        doc.save('Nuvista Pharma.pdf');
    };

    const items = [
        { name: 'Allygest Tablet 5 mg' },
        { name: 'Cortiflo Tablet 6 mg' },
        { name: 'Deca-Durabolin Inj.50 mg' },
        { name: 'Delanzo 30mg Capsule' },
        { name: 'Dinogest Tablet 2 mg' },
        { name: 'Dydron F.C. Tablet 10mg' },
        { name: 'Elisa F.C. Tablet' },
        { name: 'Freemax F.C. Tablet 100 mg' },
        { name: 'Linda-S DS Inj 10' },
        { name: 'Lynes Tablet' },
        { name: 'Marvelon Tablet' },
        { name: 'Microlon Tablet' },
        { name: 'Norestin Tablet 5 mg' },
        { name: 'Oradexon Tablet 0.5 mg' },
        { name: 'Orgatril Tablet 5 mg' },
        { name: 'Ovestin Tablet 1 mg' },
        { name: 'Ovostat Gold Tablet' },
        { name: 'Roxadex Injection 5 mg' },
        { name: 'Thyronor 25' },
        { name: 'Tibilon Tablet 2.5 mg' },
        { name: 'Traxyl Capsule 500 mg' },
        { name: 'Visceralgine F.C. Tablet 50 mg' },
        { name: 'Zoleta F.C. Tablet 2.5 mg' },
        { name: 'Thyronor 12.50' },
        { name: 'Thyronor 50' },
        { name: 'Thyronor 75' },
        { name: 'Thyronor 100' },

        { name: 'Decalin VT' },
        { name: 'Nuliza Cream' },
        { name: 'Magnox 365 Tablet' },
        { name: 'Sagdon 10 Tablet' }
    ].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className='mx-3'>
            <div className='my-2'><hr /></div>
            <div>
                {items.map(item => (
                    <div key={item.name} className='grid grid-cols-4 items-center gap-2'>
                        <p className='col-span-2'>{item.name}</p>
                        <input
                            className='border border-green-200 text-center py-3 px-2 rounded-lg'
                            type="number"
                            value={values[item.name] || ''}
                            onChange={(e) => handleChange(e, item.name)}
                            min="0"
                        />
                        <button
                            className={`btn text-white rounded-xl ${parseInt(values[item.name]) > 0 ? 'bg-purple-300' : 'bg-gray-300 cursor-not-allowed'}`}
                            disabled={!parseInt(values[item.name])}
                            onClick={() => handleSelect(item.name, item.type)}
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
                                min="0"
                            />
                        </li>
                    ))}
                </ul>
                <button className='btn my-5 bg-blue-500 text-white text-xl' onClick={handleBuyNow}>
                    Generate Order Sheet
                </button>
            </div>
        </div>
    );
};

export default Nuvista;
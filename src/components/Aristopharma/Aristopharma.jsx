import { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Aristopharma = () => {
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
        doc.text("Aristopharma", 10, yPosition);
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

        doc.save('Aristopharma.pdf');
    };

    // Sort items alphabetically
    const items = [
        { name: 'Agoxin Tab' },
        { name: 'Ancor-2.5' },
        { name: 'Ancor-5' },
        { name: 'Ancor-10' },
        { name: 'Ancor-A 2.5/5' },
        { name: 'Ancor Plus-2.5' },
        { name: 'Ancor Plus-5' },
        { name: 'Cilnipin 5' },
        { name: 'Cilnipin 10' },
        { name: 'Clocard 75mg' },
        { name: 'Clocard-A' },
        { name: 'Duoblock 5/20' },
        { name: 'Duoblock 5/40' },
        { name: 'Empaglif 10' },
        { name: 'Empaglif 25' },
        { name: 'Empaglif-M 5/500' },
        { name: 'Gluconor 1' },
        { name: 'Gluconor 2' },
        { name: 'Glucomet 500' },
        { name: 'Glucomet 500 XR' },
        { name: 'Glucomet 750 XR' },
        { name: 'Glucomet 850' },
        { name: 'Glucozid 80' },
        { name: 'Glucozid MR 30' },
        { name: 'Glucozid MR 60' },
        { name: 'Gluvan 50' },
        { name: 'Gluvan Plus 500' },
        { name: 'Gluvan Plus 850' },
        { name: 'Lacicard-2' },
        { name: 'Lacicard-4' },
        { name: 'Limpa 5/10' },
        { name: 'Limpa 5/25' },
        { name: 'Linaglip 5' },
        { name: 'Linaglip-M 2.5/500' },
        { name: 'Linaglip-M 2.5/850' },
        { name: 'Linaglip-M 5/1000' },
        { name: 'Lodicard 50' },
        { name: 'Lodipin-5' },
        { name: 'Maxineb 2.5' },
        { name: 'Maxineb 5' },
        { name: 'Metacard MR' },
        { name: 'Nitrocard SR' },
        { name: 'Nitrocard Spray' },
        { name: 'Osartan 50' },
        { name: 'Osartan-HZ' },
        { name: 'Pitavas 2' },
        { name: 'Ruvastin-5' },
        { name: 'Ruvastin-10' },
        { name: 'Ruvastin-20' },
        { name: 'TCL-R 10' },
        { name: 'TCL-R 20' },
        { name: 'TCL-R 40' },
        { name: 'Temcard 20' },
        { name: 'Temcard 40' },
        { name: 'Temcard 80' },
        { name: 'Temcard-A 40/5' },
        { name: 'Temcard-A 80/5' }
    ].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className='mx-3'>
            <h2 className='text-lg font-medium'>Cardiac Items</h2>
            {/* <h2>{items.length}</h2> */}
            <div className='my-2'>
                <hr />
            </div>
            <div>
                {items.map(item => (
                    <div key={item.name} className='grid grid-cols-4 items-center gap-2'>
                        <p className='col-span-2'>{item.name} <small>{item.type}</small></p>
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
                            <p className='col-span-2'>{item.name} <small>{item.type}</small></p>
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

export default Aristopharma;

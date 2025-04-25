import { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Synovia = () => {
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
        doc.text("Synovia Pharma PLC.", 10, yPosition);
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

        doc.save('Synovia Pharma.pdf');
    };

    // Sort items alphabetically
    const items = [
        { name: 'Amaryl Tab 4 mg' },
        { name: 'Amaryl Tab 1 mg' },
        { name: 'Amaryl Tab 2 mg' },
        { name: 'Amaryl Tab 3 mg' },
        { name: 'Amaryl M Tab 1 mg' },
        { name: 'Amaryl M Tab 2 mg' },
        { name: 'Avil Tab 22.7 mg' },
        { name: 'Enterogermina Suspension 2 billion' },
        { name: 'Epilim Syp 100 ml' },
        { name: 'Expres Tab 10 mg' },
        { name: 'Expres Tab 5 mg' },
        { name: 'Fimoxyclav Tab 500 mg' },
        { name: 'Fimoxyclav Tab 250 mg' },
        { name: 'Fimoxyl Cap 250 mg' },
        { name: 'Fimoxyl Cap 500 mg' },
        { name: 'Fimoxyl Suspension 100 ml' },
        { name: 'Avil Injection 45.5 mg' },
        { name: 'Flagyl Tab 400 mg' },
        { name: 'Flagyl Suspension 60 ml' },
        { name: 'Gavisyn Suspension 200 ml' },
        { name: 'Lasix Tab 40 mg' },
        { name: 'Lasix Injection 20 mg' },
        { name: 'Luzol Cream 1%' },
        { name: 'Oracyn-K Tab 250 mg' },
        { name: 'Orva Tab 10 mg' },
        { name: 'Orva Tab 20 mg' },
        { name: 'Pevisone Cream' },
        { name: 'Profenid Gel 2.5%' },
        { name: 'Profenid-CR Cap 100 mg' },
        { name: 'Qpine Tab 100 mg' },
        { name: 'RoZenon Tab 10 mg' },
        { name: 'RoZenon Tab 5 mg' },
        { name: 'Sandom Tab 10 mg' },
        { name: 'Stemetil Tab 5 mg' },
        { name: 'Telfast Tab 120 mg' },
        { name: 'Telfast Tab 180 mg' },
        { name: 'Telfast Suspension 50 ml' }
    ].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className='mx-3'>
            <div className='my-2'>
                <hr />
            </div>
            <div>
                {items.map(item => (
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
                            onClick={() => handleSelect(item.name)}
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

export default Synovia;
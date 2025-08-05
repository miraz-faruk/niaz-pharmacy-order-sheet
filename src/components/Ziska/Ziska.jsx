import { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Ziska = () => {
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
        doc.text("Ziska Pharmaceuticals Ltd.", 10, yPosition);
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

        doc.save('Ziska Pharma.pdf');
    };

    // Sort items alphabetically
    const items = [
        { name: "Ajardy Tablet 10 mg" },
        { name: "Cholcut Tablet 5 mg" },
        { name: "Cholcut Tablet 10 mg" },
        { name: "Closalic Ointment 10 gm" },
        { name: "Dementa Tablet 5 mg" },
        { name: "Dexilend Capsule 60 mg" },
        { name: "Dexilend Capsule 30 mg" },
        { name: "Domidon Tablet 10 mg" },
        { name: "Dotinor Tablet 1 mg" },
        { name: "Dotinor Tablet 0.5 mg" },
        { name: "Dricare Topical Solution 20% 50 ml" },
        { name: "Dydrogest Tablet 10 mg" },
        { name: "Gavista Suspension 200 ml" },
        { name: "Gavista DX Suspension 200 ml" },
        { name: "Kinate Tablet 50 mg" },
        { name: "Linera Tablet 5 mg" },
        { name: "Linera M Tablet 850 mg" },
        { name: "Linera M Tablet 1000 mg" },
        { name: "Linera M Tablet 500 mg" },
        { name: "Megestol Tablet 160 mg" },
        { name: "Megestol Suspension 100 ml" },
        { name: "Melatrin Cream 30 gm" },
        { name: "Mepred Tablet 4 mg" },
        { name: "Mepred Tablet 8 mg" },
        { name: "Merolin Tablet 2.5 mg" },
        { name: "Merolin Tablet 5 mg" },
        { name: "Metro Tablet 400 mg" },
        { name: "MM Kit Tablet 200 mg" },
        { name: "Nevola Tablet 100 mg" },
        { name: "Nevola Tablet 50 mg" },
        { name: "Peuli Tablet 30 mg" },
        { name: "Pink-Bismol Suspension 200 ml" },
        { name: "Relaxo Capsule 25 mg" },
        { name: "Rupin Tablet 10 mg" },
        { name: "Solupred Tablet 4 mg" },
        { name: "Solupred Tablet 8 mg" },
        { name: "Solupred Tablet 16 mg" },
        { name: "Superseas Syrup 100 ml" },
        { name: "Trugain Scalp Solution 5%" },
        { name: "Uliroid Tablet 5 mg" },
        { name: "Upanib Tablet 15 mg" },
        { name: "Xiclav Tablet 250 mg" },
        { name: "Xiclav Tablet 500 mg" }
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

export default Ziska;
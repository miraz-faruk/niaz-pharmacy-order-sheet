import { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const NiproJMI = () => {
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
        doc.text("Nipro JMI Pharmaceuticals Ltd", 10, yPosition);
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

        doc.save('Delta Pharma.pdf');
    };

    // Sort items alphabetically
    const items = [
        { name: 'Avamist Nasal Spray' },
        { name: 'Bilfast Oral Solution 40 ml' },
        { name: 'Bilfast Tablet 20 mg' },
        { name: 'Calgi-D Tablet 500 mg+200 IU' },
        { name: 'Calgi-DX Tablet 600 mg+400 IU' },
        { name: 'Diazid Tablet 80 mg' },
        { name: 'Diazid MR Tablet 60 mg' },
        { name: 'Diazid MR Tablet 30 mg' },
        { name: 'Doxiva Syp 100 ml' },
        { name: 'Doxiva Tablet 200 mg' },
        { name: 'Doxiva Tablet 400 mg' },
        { name: 'Emjenta Tablet 10 mg+5 mg' },
        { name: 'Emjenta Tablet 25 mg+5 mg' },
        { name: 'Empa Tablet 10 mg' },
        { name: 'Empa Tablet 25 mg' },
        { name: 'EmpaMet Tablet 5 mg+500 mg' },
        { name: 'EmpaMet Tablet 12.5 mg+1000 mg' },
        { name: 'EmpaMet Tablet 12.5 mg+850 mg' },
        { name: 'EmpaMet Tablet 5 mg+1000 mg' },
        { name: 'EmpaMet Tablet 12.5 mg+500 mg' },
        { name: 'Lijenta Tablet 5 mg' },
        { name: 'Lijenta-M Tablet 500 mg' },
        { name: 'Lijenta-M Tablet 850 mg' },
        { name: 'Lijenta-M Tablet 1000 mg' },
        { name: 'Losarva Tablet 50 mg' },
        { name: 'Lyrinex Capsule 50 mg' },
        { name: 'Lyrinex Capsule 75 mg' },
        { name: 'Lyrinex CR Tablet 82.5 mg' },
        { name: 'Montiva Tablet 10 mg' },
        { name: 'Pandura Tablet 0.5 mg' },
        { name: 'Pandura Tablet 1 mg' },
        { name: 'Pandura Tablet 2 mg' },
        { name: 'Rablet Tablet 20 mg' },
        { name: 'Starcal D Tablet' },
        { name: 'V3N Tablet' }
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

export default NiproJMI;
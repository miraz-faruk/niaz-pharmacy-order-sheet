import { useState } from 'react';
import jsPDF from 'jspdf';

const Aristopharma = () => {
    const [values, setValues] = useState({});
    const [selectedItems, setSelectedItems] = useState([]);

    const handleChange = (e, itemName) => {
        const value = e.target.value;
        if (!value || /^[1-9]\d*$/.test(value)) {
            setValues(prevValues => ({
                ...prevValues,
                [itemName]: value
            }));
        }
    };

    const handleSelect = (itemName, itemType) => {
        setSelectedItems(prevItems => {
            const itemExists = prevItems.find(item => item.name === itemName);
            if (itemExists) {
                return prevItems.map(item =>
                    item.name === itemName ? { ...item, quantity: values[itemName] } : item
                );
            } else {
                return [...prevItems, { name: itemName, type: itemType, quantity: values[itemName] }];
            }
        });
    };

    const handleUpdateSelectedItem = (e, itemName) => {
        const value = e.target.value;
        if (!value || /^[1-9]\d*$/.test(value)) {
            setSelectedItems(prevItems =>
                prevItems.map(item =>
                    item.name === itemName ? { ...item, quantity: value } : item
                )
            );
        }
    };

    const handleBuyNow = () => {
        const doc = new jsPDF();
        let yPosition = 10;

        // Set header
        doc.setFontSize(20);
        doc.setTextColor('Blue');
        doc.text("Niaz Pharmacy", 10, yPosition);
        yPosition += 10;
        const date = new Date().toLocaleDateString(); // Get current date
        doc.setFontSize(12);
        doc.text(`Date: ${date}`, 10, yPosition); // Add date to PDF header
        yPosition += 10;

        // Set column headers
        doc.setFontSize(12);
        doc.setTextColor('black');
        doc.setFont('helvetica', 'bold');
        doc.text("Items Name", 10, yPosition);
        // doc.text("Type", 50, yPosition);
        doc.text("Quantity", 100, yPosition); // Adjust position as needed
        yPosition += 10;

        // Draw a line under the header
        doc.line(5, yPosition, 200, yPosition); // Adjust line length if needed
        yPosition += 10;

        // Set font for items
        doc.setFont('helvetica', 'normal');

        selectedItems.forEach(item => {
            doc.text(item.name, 10, yPosition);
            // doc.text(item.type, 50, yPosition); // Add item type
            doc.text(item.quantity.toString(), 100, yPosition); // Adjust position as needed
            yPosition += 10;
        });

        doc.save('Aristopharma Cardiac items.pdf');
    };


    const items = [
        { name: 'Linaglip'},
        { name: 'Linaglip-M 2.5/500'},
        { name: 'Linaglip-M 2.5/850'},
        { name: 'Linaglip-M 5/1000'},
        { name: 'Ancor-2.5'},
        { name: 'Ancor-5'},
        { name: 'Ancor-10'},
        { name: 'Ancor-A 2.5/5'},
        { name: 'Ancor Plus-2.5'},
        { name: 'Ancor Plus-5'},
        { name: 'Metacard MR'},
        { name: 'Gluvan'},
        { name: 'Gluvan Plus 500'},
        { name: 'Gluvan Plus 850'},
        { name: 'Nitrocard SR'},
        { name: 'Nitrocard'},
        { name: 'Empaglif 10'},
        { name: 'Empaglif 25'},
        { name: 'Empaglif-M 5/500'},
        { name: 'Duoblock 5/20'},
        { name: 'Duoblock 5/40'},
        { name: 'Ruvastin-5'},
        { name: 'Ruvastin-10'},
        { name: 'Ruvastin-20'},
        { name: 'TCL-R 10'},
        { name: 'TLC-R 20'},
        { name: 'TLC-R 40'},
        { name: 'Clocard'},
        { name: 'Clocard-A'}
    ].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className='mx-3'>
            <h2 className='text-lg font-medium'>Cardiac Items</h2>
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
                <button className='btn my-5 bg-blue-500 text-white text-xl' onClick={handleBuyNow}>Buy Now</button>
            </div>
        </div>
    );
};

export default Aristopharma;

import { useState } from 'react';
import jsPDF from 'jspdf';

const Radiant = () => {
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
        // doc.text("Type", 80, yPosition);
        doc.text("Quantity", 100, yPosition); // Adjust position as needed
        yPosition += 10;

        // Draw a line under the header
        doc.line(5, yPosition, 200, yPosition); // Adjust line length if needed
        yPosition += 10;

        // Set font for items
        doc.setFont('helvetica', 'normal');

        selectedItems.forEach(item => {
            doc.text(item.name, 10, yPosition);
            // doc.text(item.type, 80, yPosition); // Add item type
            doc.text(item.quantity.toString(), 100, yPosition); // Adjust position as needed
            yPosition += 10;
        });

        doc.save('Radiant Pharmaceuticals.pdf');
    };


    const items = [
        { name: 'Acos Tab 500mg'},
        { name: 'Acteria 4 billion'},
        { name: 'ATOZ Premium Tab'},
        { name: 'ATOZ Senior Tab'},
        { name: 'Avenac Tab 100mg'},
        { name: 'Coralcal-D Tab 500mg'},
        { name: 'Coralcal-DX Tab 600mg'},
        { name: 'Coralcal Vita Tab 600mg'},
        { name: 'Efodio Tab 10mg'},
        { name: 'Exium Cap 20mg'},
        { name: 'Exium Cap 40mg'},
        { name: 'Exium MUPS Tab 20mg'},
        { name: 'Exium MUPS Tab 40mg'},
        { name: 'Fabetor Tab 120mg'},
        { name: 'Fabetor Tab 60mg'},
        { name: 'Fabetor Tab 90mg'},
        { name: 'Fastel Tab 120mg'},
        { name: 'Fastel Tab 180mg'},
        { name: 'Feeliz Tab 12.5mg'},

        { name: 'Carticare Tab 250mg'},
        { name: 'Carticare Max Tab 750mg'},
        { name: 'Carticare TS Tab'},
        { name: 'Dormicum Tab 7.5mg'},
        { name: 'Eggcal-D Tab 500mg'},
        { name: 'Eggcal-DX Tab 600mg'},
        { name: 'Fylox Tab 200mg'},
        { name: 'Fylox Tab 400mg'},
        { name: 'Lexotanil Tab 3mg'},
        { name: 'Minista Tab 10mg'},
        { name: 'Prelica Cap 25mg'},
        { name: 'Prelica Cap 50mg'},
        { name: 'Prelica Cap 75mg'},
        { name: 'Prompton Cap 20mg'},
        { name: 'Raditil Tab 20mg'},
        { name: 'Raditrol Cap 0.25mcg'},

        { name: 'Vono EC Tab 10mg'},
        { name: 'Vono EC Tab 20mg'},
        { name: 'Xyflo Tab 4mg'},
        { name: 'Xyflo Tab 5mg'},
        { name: 'Xyflo Tab 10mg'},

        { name: 'Rivotril Tab 0.25mg'},
        { name: 'Rivotril Tab 0.5mg'},
        { name: 'Rivotril Tab 1mg'},
        { name: 'Rivotril Tab 2mg'},
        { name: 'Rofixim Cap 200mg'},
        { name: 'Rofixim Cap 400mg'},
        { name: 'Rofuclav Tab 250mg'},
        { name: 'Rofuclav Tab 500mg'},
        { name: 'Toradolin Tab 10mg'},

        { name: 'Naprosyn DPS 125mg'},
        { name: 'Naprosyn Tab 250mg'},
        { name: 'Naprosyn Tab 500mg'},
        { name: 'Naprosyn-Plus Tab 375mg'},
        { name: 'Naprosyn-Plus Tab 500mg'},
        { name: 'Neucos-B Tab'}
    ].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className='mx-3'>
            <h2 className='text-lg font-medium'></h2>
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

export default Radiant;

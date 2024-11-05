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
        doc.text("Type", 80, yPosition);
        doc.text("Quantity", 150, yPosition); // Adjust position as needed
        yPosition += 10;

        // Draw a line under the header
        doc.line(5, yPosition, 200, yPosition); // Adjust line length if needed
        yPosition += 10;

        // Set font for items
        doc.setFont('helvetica', 'normal');

        selectedItems.forEach(item => {
            doc.text(item.name, 10, yPosition);
            doc.text(item.type, 80, yPosition); // Add item type
            doc.text(item.quantity.toString(), 150, yPosition); // Adjust position as needed
            yPosition += 10;
        });

        doc.save('Radiant Pharmaceuticals.pdf');
    };


    const items = [
        { name: 'Acos FC Tab 500mg (6s)', type: 'Tablet' },
        { name: 'Acteria Sachet 4 billion (20s)', type: 'Sachet' },
        { name: 'ATOZ Premium FC Tab (45s)', type: 'Tablet' },
        { name: 'ATOZ Senior FC Tab (45s)', type: 'Tablet' },
        { name: 'Avenac FC Tab 100mg (50s)', type: 'Tablet' },
        { name: 'Coralcal-D FC Tab 500mg/200IU (60s)', type: 'Tablet' },
        { name: 'Coralcal-DX FC Tab 600mg/400IU (50s)', type: 'Tablet' },
        { name: 'Coralcal Vita Effer Tab 600mg/4001U (16s)', type: 'Tablet' },
        { name: 'Efodio FC Tab 10mg (100s)', type: 'Tablet' },
        { name: 'Exium Cap 20mg (100s)', type: 'Capsule' },
        { name: 'Exium Cap 40mg (60s)', type: 'Capsule' },
        { name: 'Exium MUPS FC Tab 20mg (80s)', type: 'Tablet' },
        { name: 'Exium MUPS FC Tab 40mg (40s)', type: 'Tablet' },
        { name: 'Fabetor FC Tab 120mg (20s)', type: 'Tablet' },
        { name: 'Fabetor FC Tab 60mg (50s)', type: 'Tablet' },
        { name: 'Fabetor FC Tab 90mg (30s)', type: 'Tablet' },
        { name: 'Fastel FC Tab 120mg (50s)', type: 'Tablet' },
        { name: 'Fastel FC Tab 180mg (30s)', type: 'Tablet' },
        { name: 'Feeliz FC Tab 12.5mg/5mg (60s)', type: 'Tablet' },

        { name: 'Carticare FC Tab 250mg/200mg (30s)', type: 'Tablet' },
        { name: 'Carticare Max FB Tab 750mg/50mg (36s)', type: 'Tablet' },
        { name: 'Carticare TS FC Tab (20s)', type: 'Tablet' },
        { name: 'Dormicum FC Tab 7.5mg (30s)', type: 'Tablet' },
        { name: 'Eggcal-D FC Tab 500mg/200IU (30s)', type: 'Tablet' },
        { name: 'Eggcal-DX FC Tab 600mg/400IU (30s)', type: 'Tablet' },
        { name: 'Fylox Tab 200mg (50s)', type: 'Tablet' },
        { name: 'Fylox Tab 400mg (30s)', type: 'Tablet' },
        { name: 'Lexotanil Tab 3mg (70s)', type: 'Tablet' },
        { name: 'Minista Tab 10mg (30s)', type: 'Tablet' },
        { name: 'Prelica Cap 25mg (30s)', type: 'Capsule' },
        { name: 'Prelica Cap 50mg (50s)', type: 'Capsule' },
        { name: 'Prelica Cap 75mg (30s)', type: 'Capsule' },
        { name: 'Prompton Cap 20mg (100s)', type: 'Capsule' },
        { name: 'Raditil FC Tab 20mg (50s)', type: 'Tablet' },
        { name: 'Raditrol Cap 0.25mcg (30s)', type: 'Capsule' },
        
        { name: 'Vono EC Tab 10mg (30s)', type: 'Tablet' },
        { name: 'Vono EC Tab 20mg (30s)', type: 'Tablet' },
        { name: 'Xyflo Chew Tab 4mg (30s)', type: 'Tablet' },
        { name: 'Xyflo Chew Tab 5mg (30s)', type: 'Tablet' },
        { name: 'Xyflo FC Tab 10mg (30s)', type: 'Tablet' },

        { name: 'Rivotril Tab 0.25mg (50s)', type: 'Tablet' },
        { name: 'Rivotril Tab 0.5mg (80s)', type: 'Tablet' },
        { name: 'Rivotril Tab 1 mg (70s)', type: 'Tablet' },
        { name: 'Rivotril Tab 2mg (60s)', type: 'Tablet' },
        { name: 'Rofixim Cap 200mg (10s)', type: 'Capsule' },
        { name: 'Rofixim Cap 400mg (10s)', type: 'Capsule' },
        { name: 'Rofuclav FC Tab 250mg/62.5mg (14s)', type: 'Tablet' },
        { name: 'Rofuclav FC Tab 500mg/125mg (14s)', type: 'Tablet' },
        { name: 'Toradolin FC Tab 10mg (20s)', type: 'Tablet' },

        { name: 'Naprosyn DPS 125mg/5ml (50ml)', type: 'Syrup' },
        { name: 'Naprosyn Tab 250mg (50s)', type: 'Tablet' },
        { name: 'Naprosyn Tab 500mg (50s)', type: 'Tablet' },
        { name: 'Naprosyn-Plus Tab 375mg/20mg (50s)', type: 'Tablet' },
        { name: 'Naprosyn-Plus Tab 500mg/20mg (40s)', type: 'Tablet' },
        { name: 'Neucos-B FC Tab (50s)', type: 'Tablet' }
    ];

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

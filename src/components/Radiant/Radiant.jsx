import { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Radiant = () => {
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
            doc.text("Radiant Pharmaceuticals", 10, yPosition);
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
    
            doc.save('Radiant Pharmaceuticals.pdf');
        };

    const items = [
        { name: 'Acos 500mg Tab' },
        { name: 'Acteria 4 billion' },
        { name: 'ATOZ Premium Tab' },
        { name: 'ATOZ Senior Tab' },
        { name: 'Avenac Tab 100mg' },
        { name: 'Coralcal-D Tab 500mg' },
        { name: 'Coralcal-DX Tab 600mg' },
        { name: 'Coralcal Vita Tab 600mg' },
        { name: 'Efodio Tab 10mg' },
        { name: 'Exium Cap 20mg' },
        { name: 'Exium Cap 40mg' },
        { name: 'Exium MUPS Tab 20mg' },
        { name: 'Exium MUPS Tab 40mg' },
        { name: 'Fabetor Tab 120mg' },
        { name: 'Fabetor Tab 60mg' },
        { name: 'Fabetor Tab 90mg' },
        { name: 'Fastel Tab 120mg' },
        { name: 'Fastel Tab 180mg' },
        { name: 'Feeliz Tab 12.5mg' },

        { name: 'Carticare Tab' },
        { name: 'Carticare Max Tab 750mg' },
        { name: 'Carticare TS Tab' },
        { name: 'Dormicum Tab 7.5mg' },
        { name: 'Eggcal-D Tab 500mg' },
        { name: 'Eggcal-DX Tab 600mg' },
        { name: 'Fylox Tab 200mg' },
        { name: 'Fylox Tab 400mg' },
        { name: 'Lexotanil Tab 3mg' },
        { name: 'Minista Tab 10mg' },
        { name: 'Prelica Cap 25mg' },
        { name: 'Prelica Cap 50mg' },
        { name: 'Prelica Cap 75mg' },
        { name: 'Prompton Cap 20mg' },
        { name: 'Raditil Tab 20mg' },
        { name: 'Raditrol Cap 0.25mcg' },

        { name: 'Vono EC Tab 10mg' },
        { name: 'Vono EC Tab 20mg' },
        { name: 'Xyflo Tab 4mg' },
        { name: 'Xyflo Tab 5mg' },
        { name: 'Xyflo Tab 10mg' },

        { name: 'Rivotril Tab 0.25mg' },
        { name: 'Rivotril Tab 0.5mg' },
        { name: 'Rivotril Tab 1mg' },
        { name: 'Rivotril Tab 2mg' },
        { name: 'Rofixim Cap 200mg' },
        { name: 'Rofixim Cap 400mg' },
        { name: 'Rofuclav Tab 250mg' },
        { name: 'Rofuclav Tab 500mg' },
        { name: 'Toradolin Tab 10mg' },

        { name: 'Naprosyn DPS 125mg' },
        { name: 'Naprosyn Tab 250mg' },
        { name: 'Naprosyn Tab 500mg' },
        { name: 'Naprosyn-Plus Tab 375mg' },
        { name: 'Naprosyn-Plus Tab 500mg' },
        { name: 'Neucos-B Tab' },

        { name: 'Prelica CR 82.5 Tab' },
        { name: 'Acos Syp' },
        { name: 'Alkalna 600 Tab' },
        { name: 'Carlina 5 Tab' },
        { name: 'Carlina M 2.5/500 Tab' },
        { name: 'Triginal MR Tab' },
        { name: 'Radiglip-M 500mg Tab' },
        { name: 'Radiglip-M 1000mg Tab' },
        { name: 'Lizid 400mg Tab' },
        { name: 'Lizid 600mg Tab' },
        { name: 'Frenvas 20mg Tab' },
        { name: 'Gavirad Syp' },
        { name: 'Duovas 40mg Tab' },
        { name: 'Duovas 20mg Tab' },
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
                <button className='btn my-5 bg-blue-500 text-white text-xl' onClick={handleBuyNow}>Generate Order Sheet</button>
            </div>
        </div>
    );
};

export default Radiant;

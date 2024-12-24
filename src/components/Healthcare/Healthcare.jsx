import { useState } from 'react';
import jsPDF from 'jspdf';

const Healthcare = () => {
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
        doc.setTextColor('Black');
        doc.text("Niaz Pharmacy", 10, yPosition);
        yPosition += 10;
        const date = new Date().toLocaleDateString(); // Get current date
        doc.setFontSize(12);
        doc.text(`Date: ${date}`, 200, 10, { align: 'right' }); // Add date to PDF header
        yPosition += 5;

        // Set column headers
        doc.setFontSize(12);
        doc.setTextColor('black');
        doc.setFont('helvetica', 'bold');
        doc.text("Items Name", 10, yPosition);
        doc.text("Quantity", 105, yPosition, { align: 'center' }); // Adjust position as needed
        yPosition += 10;

        // Draw a line under the header
        doc.line(5, yPosition, 200, yPosition); // Adjust line length if needed
        yPosition += 10;

        // Set font for items
        doc.setFont('helvetica', 'normal');

        selectedItems.forEach(item => {
            doc.text(item.name, 10, yPosition);

            // Calculate position for quantity to be right-aligned
            const quantityWidth = doc.getTextWidth(item.quantity.toString());
            const quantityX = 105 - quantityWidth; // Right-align the quantity
            doc.text(item.quantity.toString(), quantityX, yPosition); // Right-aligned quantity
            yPosition += 10;
        });

        doc.save('Healthcare Pharmaceuticals Ltd.pdf');
    };

    // Sort items alphabetically
    const items = [
        { name: 'Alcet syp' },
        { name: 'Alcet tab' },
        { name: 'Angenta tab' },
        { name: 'Betafix 2.5' },
        { name: 'Betafix 5' },
        { name: 'Aeron ft 4' },
        { name: 'Aeron ft 5' },
        { name: 'Aeron ft 10' },
        { name: 'Combicard' },
        { name: 'Clonatril .5' },
        { name: 'Clonatril 1' },
        { name: 'Clonatril 2' },
        { name: 'D vine 40000' },
        { name: 'D vine syp' },
        { name: 'Esita 5' },
        { name: 'Esita 10' },
        { name: 'Emistat 4' },
        { name: 'Emistat 8' },
        { name: 'Emistat syp' },
        { name: 'Furotril 250' },
        { name: 'Furotril 500' },
        { name: 'Furotril 250 plus' },
        { name: 'Furotril 500 plus' },
        { name: 'Furotril plus syp' },
        { name: 'Anulid 400' },
        { name: 'Anulid 600' },
        { name: 'Denver 200' },
        { name: 'Denver 400' },
        { name: 'Denver 50 ml syp' },
        { name: 'Denver ds syp' },
        { name: 'Lyric 25' },
        { name: 'Lyric 50' },
        { name: 'Lyric 75' },
        { name: 'Lyric sr' },
        { name: 'Sergel 20' },
        { name: 'Sergel 40' },
        { name: 'Sergel mupp 20' },
        { name: 'Sergel mupp 40' },
        { name: 'Renovit' },
        { name: 'Rocal d' },
        { name: 'Rocal d vita' },
        { name: 'Rocal m' },
        { name: 'Rocal m vita' },
        { name: 'Rozith 250' },
        { name: 'Rozith 500' },
        { name: 'Rozith 50 ml syp' },
        { name: 'Santogen' },
        { name: 'Nitrin sr' },
        { name: 'Ternilla 100' },
        { name: 'Ternilla sr' },
        { name: 'Napryn 250' },
        { name: 'Napryn 500' },
        { name: 'Zoventa 200' },
        { name: 'Zoventa 400' },
        { name: 'Reef d' },
        { name: 'Reef dx' },
        { name: 'Evania 10' },
        { name: 'Evania m 500' },
        { name: 'Silinor m 500' },
        { name: 'Icentin 5' },
        { name: 'Icentin m 500' },
        { name: 'Dysis 80' },
        { name: 'Dysis plus' },
        { name: 'Glymin XR' },
        { name: 'Vestar mr' },
        { name: 'Viset tab' },
        { name: 'Viset syp' },
        { name: 'Danilo 120' },
        { name: 'Danilo 90' },
        { name: 'Candinil 50' },
        { name: 'Candinil 150' },
        { name: 'Candinil syp' },
        { name: 'Pogo syp' },
        { name: 'Slimfast' },
        { name: 'Vorifast 50' },
        { name: 'Vorifast 200' },
    ].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className='mx-3'>
            <h2 className='text-lg font-medium'>Healthcare Pharmaceuticals Ltd.</h2>
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

export default Healthcare;
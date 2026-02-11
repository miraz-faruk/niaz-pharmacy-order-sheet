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
        doc.text("Radiant Pharmaceuticals Ltd.", 10, yPosition);
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

        doc.save('Radiant Pharmaceuticals.pdf');
    };

    const items = [
        { name: 'Acos Tab 500 mg' },
        { name: 'Acteria 4 billion' },
        { name: 'Acos Syp' },
        { name: 'Alkalna Tab 600 mg' },
        { name: 'Acteria Kids' },
        { name: 'ATOZ Premium Tab' },
        { name: 'ATOZ Senior Tab' },
        { name: 'Avenac Tab 100 mg' },
        { name: 'Carticare Tab' },
        { name: 'Carticare Max Tab 750 mg' },
        { name: 'Carticare TS Tab' },
        { name: 'Carlina Tab 5 mg' },
        { name: 'Carlina M Tab 2.5/500' },
        { name: 'Coralcal-D Tab 500 mg' },
        { name: 'Coralcal-DX Tab 600 mg' },
        { name: 'Coralcal Vita Tab 600 mg' },
        { name: 'Dormicum Tab 7.5 mg' },
        { name: 'Duovas Tab 40 mg' },
        { name: 'Duovas Tab 20 mg' },
        { name: 'Efodio Tab 10 mg' },
        { name: 'Exium Cap 20 mg' },
        { name: 'Exium Cap 40 mg' },
        { name: 'Exium MUPS Tab 20 mg' },
        { name: 'Exium MUPS Tab 40 mg' },
        { name: 'Eggcal-D Tab 500 mg' },
        { name: 'Eggcal-DX Tab 600 mg' },
        { name: 'Fabetor Tab 120 mg' },
        { name: 'Fabetor Tab 60 mg' },
        { name: 'Fabetor Tab 90 mg' },
        { name: 'Fastel Tab 120 mg' },
        { name: 'Fastel Tab 180 mg' },
        { name: 'Feeliz Tab 12.5 mg' },
        { name: 'Fylox Tab 200 mg' },
        { name: 'Fylox Tab 400 mg' },
        { name: 'Frenvas Tab 20 mg' },
        { name: 'Gavirad Syp' },
        { name: 'Lexotanil Tab 3 mg' },
        { name: 'Lizid Tab 400 mg' },
        { name: 'Lizid Tab 600 mg' },
        { name: 'Minista Tab 10 mg' },
        { name: 'Naprosyn DPS 125 mg' },
        { name: 'Naprosyn Tab 250 mg' },
        { name: 'Naprosyn Tab 500 mg' },
        { name: 'Naprosyn-Plus Tab 375 mg' },
        { name: 'Naprosyn-Plus Tab 500 mg' },
        { name: 'Neucos-B Tab' },
        { name: 'Prelica Cap 25 mg' },
        { name: 'Prelica Cap 50 mg' },
        { name: 'Prelica Cap 75 mg' },
        { name: 'Prompton Cap 20 mg' },
        { name: 'Prelica CR Tab 82.5 mg' },
        { name: 'Raditil Tab 20 mg' },
        { name: 'Radiglip-M Tab 500 mg' },
        { name: 'Radiglip-M Tab 1000 mg' },
        { name: 'Raditrol Cap 0.25 mg' },
        { name: 'Rivotril Tab 0.25 mg' },
        { name: 'Rivotril Tab 0.5 mg' },
        { name: 'Rivotril Tab 1 mg' },
        { name: 'Rivotril Tab 2 mg' },
        { name: 'Rofixim Cap 200 mg' },
        { name: 'Rofixim Cap 400 mg' },
        { name: 'Rofuclav Tab 250 mg' },
        { name: 'Rofuclav Tab 500 mg' },
        { name: 'Toradolin Tab 10 mg' },
        { name: 'Triginal MR Tab' },
        { name: 'Vono EC Tab 10 mg' },
        { name: 'Vono EC Tab 20 mg' },
        { name: 'Xyflo Tab 4 mg' },
        { name: 'Xyflo Tab 5 mg' },
        { name: 'Xyflo Tab 10 mg' },
        { name: 'Galvus Met Tab 500 mg' },
        { name: 'Galvus Met Tab 850 mg' },
        { name: 'Voltalin D Tab' },
        { name: 'Voltalin SR Tab' },
        { name: 'Voltalin Supp 12.5 mg' },
        { name: 'Voltalin Supp 25 mg' },
        { name: 'Voltalin Supp 50 mg' },
        { name: 'Sandocal Tab 500 mg' },
        { name: 'Sandocal D Tab' },
        { name: 'Servipep Tab 20 mg' },
        { name: 'Servipep Tab 40 mg' },
        { name: 'Vass 10' },
        { name: 'Azyth 500 mg' },
        { name: 'Serolux 50 mg' },
        { name: 'Vaxtin 100 mg' },
        { name: 'Epnil 0.5 mg' },
        { name: 'Epnil 1 mg' },
        { name: 'Epnil 2 mg' },
        { name: 'Tegretol Tab 200 mg' },
        { name: 'Tegretol CR Tab 200 mg' },
        { name: 'Entresto 50 mg' },
        { name: 'Probitor 20 mg' },
        { name: 'Tofranil 25 mg' },
        { name: 'Xionil 3 mg' },
        { name: 'Mitosan 40 mg' },
        { name: 'Mitosan 80 mg' },
        { name: 'Ludiomil Tab' },
        { name: 'Exforge 10/160' }
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
                    {selectedItems
                        .slice() // make a copy (to avoid mutating original state)
                        .sort((a, b) => a.name.localeCompare(b.name)) // sort alphabetically
                        .map((item, index) => (
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

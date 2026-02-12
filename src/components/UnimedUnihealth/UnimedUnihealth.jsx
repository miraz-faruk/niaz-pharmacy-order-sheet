import { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const UnimedUnihealth = () => {
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
        doc.text("Unimed Unihealth Pharmaceuticals Ltd.", 10, yPosition);
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

        doc.save('Unimed Unihealth Pharmaceuticals Ltd.pdf');
    };

    // Sort items alphabetically
    const items = [
        { name: 'Alfumax ER Tablet 10 mg' },
        { name: 'Arthrosin TS Tablet 750 mg + 600 mg' },
        { name: 'Bactoderm Ointment 2% 15 gm' },
        { name: 'Budetide Suspension' },
        { name: 'Candistin Ear Drop' },
        { name: 'Citra- K Oral Solution 200 ml' },
        { name: 'Citra - K Tablet 1080 mg' },
        { name: 'Co - dopa Tablet 100 mg' },
        { name: 'Corangi Tablet 10 mg' },
        { name: 'Corestin Tablet 5 mg' },
        { name: 'Corestin Tablet 10 mg' },
        { name: 'Demelon Capsule 3 mg' },
        { name: 'Demelon Capsule 1.5 mg' },
        { name: 'Destin Tablet 5 mg' },
        { name: 'Destin Syrup 60 ml' },
        { name: 'Dexit Tablet' },
        { name: 'Duphaston Tablet 10 mg' },
        { name: 'Dydroton Tablet 25 mg' },
        { name: 'Dysnov Tablet 10 mg' },
        { name: 'Dytor Tablet 5 mg' },
        { name: 'Dytor Tablet 2.5 mg' },
        { name: 'Edysta Tablet 5 mg' },
        { name: 'Edysta Tablet 2.5 mg' },
        { name: 'Edysta Tablet 10 mg' },
        { name: 'Formatide Inhalation Capsule 200 mg' },
        { name: 'Gastrocon - A Suspension 200 ml' },
        { name: 'Gastrocon - DA Suspension 200 ml' },
        { name: 'Gastrocon - R Suspension 200 ml' },
        { name: 'Hairgain Scalp Solution 5 % 60 ml' },
        { name: 'Hairgain Scalp Solution 2 % 60 ml' },
        { name: 'Itrader SB Capsule 65 mg' },
        { name: 'Klabid Tablet 500 mg' },
        { name: 'Klabid Suspension 70 ml' },
        { name: 'Lulicure Cream 1 % 30 gm' },
        { name: 'MaxOmega Capsule 1000 mg' },
        { name: 'Myrica Capsule 25 mg' },
        { name: 'Myrica Capsule 50 mg' },
        { name: 'Myrica Capsule 75 mg' },
        { name: 'Nabuflex Tablet 750 mg' },
        { name: 'Nabuflex Tablet 500 mg' },
        { name: 'Nature - E Capsule 200 IU' },
        { name: 'Nature - E Capsule 400 IU' },
        { name: 'Nebicard Tablet 2.5 mg' },
        { name: 'Nebicard Tablet 5 mg' },
        { name: 'NeuVital Tablet' },
        { name: 'NexCap Capsule 20 mg' },
        { name: 'NexCap Capsule 40 mg' },
        { name: 'Nexcital Tablet 5 mg' },
        { name: 'Nexcital Tablet 10 mg' },
        { name: 'Nexpro MUPS Tablet 20 mg' },
        { name: 'Nexpro MUPS Tablet 40 mg' },
        { name: 'Nitro SR Tablet 2.6 mg' },
        { name: 'Nizoder Shampoo 2 % 120 ml' },
        { name: 'Nizoder Cream 2 % 30 gm' },
        { name: 'Novotin Capsule 1000 mg' },
        { name: 'Novotin Capsule 5000 mg' },
        { name: 'Novotin Capsule 2500 mg' },
        { name: 'Novotin Capsule 10000 mcg' },
        { name: 'Nutrifol Capsule 400 mg' },
        { name: 'Okical - D Tablet' },
        { name: 'Okical - DX Tablet' },
        { name: 'Oral - C Mouthwash 0.2 % 125 ml' },
        { name: 'Ovoshel - D Tablet' },
        { name: 'Ovoshel - DX Tablet' },
        { name: 'Oxigel Topical Gel 2.5 % 20 gm' },
        { name: 'Oxycol Tablet 150 mg' },
        { name: 'Oxycol Tablet 300 mg' },
        { name: 'Parkifen Tablet 2 mg' },
        { name: 'Parkifen Tablet 5 mg' },
        { name: 'Pediavit Syrup 100 ml' },
        { name: 'Pladex Tablet 75 mg' },
        { name: 'Pladex - A Tablet 150 mg' },
        { name: 'Prazopress ER Tablet 2.5 mg' },
        { name: 'Prazopress ER Tablet 5 mg' },
        { name: 'Predixa Tablet 4 mg' },
        { name: 'Predixa Tablet 8 mg' },
        { name: 'Predixa Tablet 16 mg' },
        { name: 'Provair Tablet 10 mg' },
        { name: 'Provair ODT Tablet 4 mg' },
        { name: 'Provair ODT Tablet 5 mg' },
        { name: 'Pulmodox Tablet 400 mg' },
        { name: 'Pulmodox Syrup 100 ml' },
        { name: 'Pulmodox Tablet 200 mg' },
        { name: 'Rapasin Capsule 4 mg' },
        { name: 'Rapasin Capsule 8 mg' },
        { name: 'Retigel Topical Gel 0.05 % 20 gm' },
        { name: 'Rhinomist Nasal Spray' },
        { name: 'Risdon Tablet 1 mg' },
        { name: 'Risdon Tablet 2 mg' },
        { name: 'Risdon Tablet 4 mg' },
        { name: 'Rupahist Tablet 10 mg' },
        { name: 'Sacutan Tablet 50 mg' },
        { name: 'Sacutan Tablet 100 mg' },
        { name: 'Sacutan Tablet 200 mg' },
        { name: 'Stacor Tablet 10 mg' },
        { name: 'TelAmlo Tablet 40 mg' },
        { name: 'TelAmlo Tablet 80 mg' },
        { name: 'Telcardis Tablet 40 mg' },
        { name: 'Telcardis Tablet 80 mg' },
        { name: 'Telcardis Plus Tablet 40 mg' },
        { name: 'Telcardis Plus Tablet 80 mg' },
        { name: 'Telfin Tablet 250 mg' },
        { name: 'Telfin Cream 1 % 30 gm' },
        { name: 'Umactin BD Capsule 100 mg' },
        { name: 'Unix - C Lotion 60 ml' },
        { name: 'Urodart Capsule 0.5 mg' },
        { name: 'Uromax Capsule 0.4 mg' },
        { name: 'Uromax - D Capsule' },
        { name: 'Utramal Retard Tablet 50 mg' },
        { name: 'Utrobin Tablet 5 mg' },
        { name: 'Utrobin Tablet 10 mg' },
        { name: 'Veserc Tablet 8 mg' },
        { name: 'Veserc Tablet 16 mg' },
        { name: 'Viscotin Tablet 600 mg' },
        { name: 'Waxsol Ear Drop 0.5 %' },
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
                    {selectedItems
                        .slice() // make a copy (to avoid mutating original state)
                        .sort((a, b) => a.name.localeCompare(b.name)) // sort alphabetically
                        .map((item, index) => (
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

export default UnimedUnihealth;
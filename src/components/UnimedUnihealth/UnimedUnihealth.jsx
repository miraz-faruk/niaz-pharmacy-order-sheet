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
        { name: 'Alfumax ER Tab 10 mg' },
        { name: 'Arthrosin TS Tab 750 mg + 600 mg' },
        { name: 'Bactoderm Oint 2% 15 gm' },
        { name: 'Budetide Suspension' },
        { name: 'Candistin Ear Drop' },
        { name: 'Citra- K Oral Solution 200 ml' },
        { name: 'Citra - K Tab 1080 mg' },
        { name: 'Co - dopa Tab 100 mg' },
        { name: 'Corangi Tab 10 mg' },
        { name: 'Corestin Tab 5 mg' },
        { name: 'Corestin Tab 10 mg' },
        { name: 'Demelon Cap 3 mg' },
        { name: 'Demelon Cap 1.5 mg' },
        { name: 'Destin Tab 5 mg' },
        { name: 'Destin Syp 60 ml' },
        { name: 'Dexit Tab' },
        { name: 'Duphaston Tab 10 mg' },
        { name: 'Dydroton Tab 25 mg' },
        { name: 'Dysnov Tab 10 mg' },
        { name: 'Dytor Tab 5 mg' },
        { name: 'Dytor Tab 2.5 mg' },
        { name: 'Edysta Tab 5 mg' },
        { name: 'Edysta Tab 2.5 mg' },
        { name: 'Edysta Tab 10 mg' },
        { name: 'Formatide Inhalation Cap 200 mg' },
        { name: 'Gastrocon - A Suspension 200 ml' },
        { name: 'Gastrocon - DA Suspension 200 ml' },
        { name: 'Gastrocon - R Suspension 200 ml' },
        { name: 'Hairgain Scalp Solution 5 % 60 ml' },
        { name: 'Hairgain Scalp Solution 2 % 60 ml' },
        { name: 'Itrader SB Cap 65 mg' },
        { name: 'Klabid Tab 500 mg' },
        { name: 'Klabid Suspension 70 ml' },
        { name: 'Lulicure Cream 1 % 30 gm' },
        { name: 'MaxOmega Cap 1000 mg' },
        { name: 'Myrica Cap 25 mg' },
        { name: 'Myrica Cap 50 mg' },
        { name: 'Myrica Cap 75 mg' },
        { name: 'Nabuflex Tab 750 mg' },
        { name: 'Nabuflex Tab 500 mg' },
        { name: 'Nature - E Cap 200 IU' },
        { name: 'Nature - E Cap 400 IU' },
        { name: 'Nebicard Tab 2.5 mg' },
        { name: 'Nebicard Tab 5 mg' },
        { name: 'NeuVital Tab' },
        { name: 'NexCap Cap 20 mg' },
        { name: 'NexCap Cap 40 mg' },
        { name: 'Nexcital Tab 5 mg' },
        { name: 'Nexcital Tab 10 mg' },
        { name: 'Nexpro MUPS Tab 20 mg' },
        { name: 'Nexpro MUPS Tab 40 mg' },
        { name: 'Nitro SR Tab 2.6 mg' },
        { name: 'Nizoder Shampoo 2 % 120 ml' },
        { name: 'Nizoder Cream 2 % 30 gm' },
        { name: 'Novotin Cap 1000 mg' },
        { name: 'Novotin Cap 5000 mg' },
        { name: 'Novotin Cap 2500 mg' },
        { name: 'Novotin Cap 10000 mcg' },
        { name: 'Nutrifol Cap 400 mg' },
        { name: 'Okical - D Tab' },
        { name: 'Okical - DX Tab' },
        { name: 'Oral - C Mouthwash 0.2 % 125 ml' },
        { name: 'Ovoshel - D Tab' },
        { name: 'Ovoshel - DX Tab' },
        { name: 'Oxigel Topical Gel 2.5 % 20 gm' },
        { name: 'Oxycol Tab 150 mg' },
        { name: 'Oxycol Tab 300 mg' },
        { name: 'Parkifen Tab 2 mg' },
        { name: 'Parkifen Tab 5 mg' },
        { name: 'Pediavit Syp 100 ml' },
        { name: 'Pladex Tab 75 mg' },
        { name: 'Pladex - A Tab 150 mg' },
        { name: 'Prazopress ER Tab 2.5 mg' },
        { name: 'Prazopress ER Tab 5 mg' },
        { name: 'Predixa Tab 4 mg' },
        { name: 'Predixa Tab 8 mg' },
        { name: 'Predixa Tab 16 mg' },
        { name: 'Provair Tab 10 mg' },
        { name: 'Provair ODT Tab 4 mg' },
        { name: 'Provair ODT Tab 5 mg' },
        { name: 'Pulmodox Tab 400 mg' },
        { name: 'Pulmodox Syp 100 ml' },
        { name: 'Pulmodox Tab 200 mg' },
        { name: 'Rapasin Cap 4 mg' },
        { name: 'Rapasin Cap 8 mg' },
        { name: 'Retigel Topical Gel 0.05 % 20 gm' },
        { name: 'Rhinomist Nasal Spray' },
        { name: 'Risdon Tab 1 mg' },
        { name: 'Risdon Tab 2 mg' },
        { name: 'Risdon Tab 4 mg' },
        { name: 'Rupahist Tab 10 mg' },
        { name: 'Sacutan Tab 50 mg' },
        { name: 'Sacutan Tab 100 mg' },
        { name: 'Sacutan Tab 200 mg' },
        { name: 'Stacor Tab 10 mg' },
        { name: 'TelAmlo Tab 40 mg' },
        { name: 'TelAmlo Tab 80 mg' },
        { name: 'Telcardis Tab 40 mg' },
        { name: 'Telcardis Tab 80 mg' },
        { name: 'Telcardis Plus Tab 40 mg' },
        { name: 'Telcardis Plus Tab 80 mg' },
        { name: 'Telfin Tab 250 mg' },
        { name: 'Telfin Cream 1 % 30 gm' },
        { name: 'Umactin BD Cap 100 mg' },
        { name: 'Unix - C Lotion 60 ml' },
        { name: 'Urodart Cap 0.5 mg' },
        { name: 'Uromax Cap 0.4 mg' },
        { name: 'Uromax - D Cap' },
        { name: 'Utramal Retard Tab 50 mg' },
        { name: 'Utrobin Tab 5 mg' },
        { name: 'Utrobin Tab 10 mg' },
        { name: 'Veserc Tab 8 mg' },
        { name: 'Veserc Tab 16 mg' },
        { name: 'Viscotin Tab 600 mg' },
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
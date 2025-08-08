import { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Healthcare = () => {
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
        doc.text("Healthcare Pharmaceuticals Ltd.", 10, yPosition);
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

        doc.save('Healthcare Pharmaceuticals.pdf');
    };

    // Sort items alphabetically
    const items = [
        { name: 'Alcet Syp' },
        { name: 'Alcet Tab' },
        { name: 'Angenta Tab' },
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
        { name: 'D vine Syp' },
        { name: 'Esita 5' },
        { name: 'Esita 10' },
        { name: 'Emistat 4' },
        { name: 'Emistat 8' },
        { name: 'Emistat Syp' },
        { name: 'Furotril 250' },
        { name: 'Furotril 500' },
        { name: 'Furotril 250 plus' },
        { name: 'Furotril 500 plus' },
        { name: 'Furotril plus Syp' },
        { name: 'Anulid 400' },
        { name: 'Anulid 600' },
        { name: 'Denver 200' },
        { name: 'Denver 400' },
        { name: 'Denver 50 ml Syp' },
        { name: 'Denver DS Syp' },
        { name: 'Lyric 25' },
        { name: 'Lyric 50' },
        { name: 'Lyric 75' },
        { name: 'Lyric CR 82.5mg' },
        { name: 'Sergel 20' },
        { name: 'Sergel 40' },
        { name: 'Sergel MUPS 20' },
        { name: 'Sergel MUPS 40' },
        { name: 'Renovit' },
        { name: 'Rocal D' },
        { name: 'Rocal D Vita' },
        { name: 'Rocal M' },
        { name: 'Rocal M Vita' },
        { name: 'Rozith 250' },
        { name: 'Rozith 500' },
        { name: 'Rozith 50 ml Syp' },
        { name: 'Santogen' },
        { name: 'Nitrin SR Tab' },
        { name: 'Nitrin Spray' },
        { name: 'Ternilla 100' },
        { name: 'Ternilla SR' },
        { name: 'Napryn 250mg' },
        { name: 'Napryn 500mg' },
        { name: 'Zoventa 200' },
        { name: 'Zoventa 400' },
        { name: 'Reef D' },
        { name: 'Reef DX' },
        { name: 'Evania M 500' },
        { name: 'Silinor M 500' },
        { name: 'Icentin 5' },
        { name: 'Icentin M 500mg' },
        { name: 'Dysis 80' },
        { name: 'Dysis plus' },
        { name: 'Glymin XR' },
        { name: 'Viset Tab' },
        { name: 'Viset Syp' },
        { name: 'Danilo 120' },
        { name: 'Danilo 90' },
        { name: 'Candinil 50' },
        { name: 'Candinil 150' },
        { name: 'Candinil Syp' },
        { name: 'Pogo Syp' },
        { name: 'Slimfast' },
        { name: 'Vorifast 50' },
        { name: 'Vorifast 200' },
        { name: 'Zeropain 10mg' },
        { name: 'Zilas 20mg' },
        { name: 'Xelpid 10mg' },
        { name: 'Xelpid 20mg' },
        { name: 'Xelpid 40mg' },
        { name: 'Xelcard 5mg' },
        { name: 'Xelcard 10mg' },
        { name: 'Vifas Syp' },
        { name: 'Vectra 8mg' },
        { name: 'Vectra 16mg' },
        { name: 'Vestar MR' },
        { name: 'Tinactin Cream' },
        { name: 'Tamisol MR Capsule' },
        { name: 'Solivo 500mg' },
        { name: 'Solivo 375mg' },
        { name: 'Spectazole N Cream' },
        { name: 'Rovast 5mg' },
        { name: 'Rovast 10mg' },
        { name: 'Rovast 20mg' },
        { name: 'Rosela 10mg' },
        { name: 'Replet 75mg' },
        { name: 'Replet PLUS' },
        { name: 'Ransys 10mg' },
        { name: 'Ransys 20mg' },
        { name: 'Ransys 40mg' },
        { name: 'Ransys AM 5/20mg' },
        { name: 'Ransys AM 5/40mg' },
        { name: 'Ransys Plus' },
        { name: 'Prenat-CI' },
        { name: 'Opal 20mg' },
        { name: 'Nexovas 5mg' },
        { name: 'Nexovas 10mg' },
        { name: 'Myorel 5mg' },
        { name: 'Myorel 10mg' },
        { name: 'Lexopil' },
        { name: 'Isentin M 1000mg' },
        { name: 'Isentin M 850mg' },
        { name: 'Flowrap 4mg' },
        { name: 'Evaglip 25/5mg' },
        { name: 'Evaglip 10/5mg' },
        { name: 'Evania 25mg' },
        { name: 'Evania 10mg' },
        { name: 'Dystolic 2.5mg' },
        { name: 'Dystolic 5mg' },
        { name: 'Edvila 50mg' },
        { name: 'Edvila-M 500mg' },
        { name: 'Edvila-M 850mg' },
        { name: 'Betafix Plus 2.5mg' },
        { name: 'Betafix Plus 5mg' },
        { name: 'Acecard 5mg' },
        { name: 'Acecard 2.5mg' },
        { name: 'Abicon Max Suspension' },
        { name: 'Abicon Plus Suspension' },
        { name: 'Abicon Suspension' },
        { name: 'Actilac Oral Solution' },
        { name: 'Betmira ER 25mg' },
        { name: 'Betmira ER 50mg' },
        { name: 'Delpark 5mg' },
        { name: 'Delpark 2mg' },
        { name: 'Glemep 2mg' },
        { name: 'Jaknib 5mg' },
        { name: 'Sante Tab' },
        { name: 'TR Care Eye Drop' },
        { name: 'Zoli 0.05% N/D' },
        { name: 'Zoli 0.025% N/D' },

        { name: 'Denvar Powder 30 ml' },
        { name: 'Denvar Powder 40 ml' },
        { name: 'Denvar Powder 50 ml' },
        { name: 'Denvar Powder 75 ml' },
        { name: 'Tgdrop Tab 100 mg' },
        { name: 'Sizonil Tab 1 mg' },
        { name: 'Sizonil Tab 5 mg' },
        { name: 'Skilox Cap 250 mg' },
        { name: 'Skilox Cap 500 mg' },
        { name: 'Rovast Tab 20 mg' },
        { name: 'Rocal Jr Tab 250 mg' },
        { name: 'Glymin Tab 500 mg' },
        { name: 'Glymin Tab 850 mg' },
        { name: 'Emistat Injection' },
        { name: 'Betaval N Ointment' },
        { name: 'Betafix AM Tab 5 mg' },
        { name: 'Andep Tab 50 mg' }
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
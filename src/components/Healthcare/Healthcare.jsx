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
        { name: 'Aeron ft 4' },
        { name: 'Aeron ft 5' },
        { name: 'Aeron ft 10' },
        { name: 'Anulid 400' },
        { name: 'Anulid 600' },
        { name: 'Acecard 5 mg' },
        { name: 'Acecard 2.5 mg' },
        { name: 'Abicon Max Suspension' },
        { name: 'Abicon Plus Suspension' },
        { name: 'Abicon Suspension' },
        { name: 'Actilac OS' },
        { name: 'Andep Tab 50  mg' },
        { name: 'Betafix 2.5' },
        { name: 'Betafix 5' },
        { name: 'Betafix Plus 2.5 mg' },
        { name: 'Betafix Plus 5 mg' },
        { name: 'Betmira ER 25 mg' },
        { name: 'Betmira ER 50 mg' },
        { name: 'Betaval N Ointment' },
        { name: 'Betafix AM Tab 5  mg' },
        { name: 'Combicard' },
        { name: 'Clonatril .5' },
        { name: 'Clonatril 1' },
        { name: 'Clonatril 2' },
        { name: 'Candinil 50' },
        { name: 'Candinil 150' },
        { name: 'Candinil Syp' },
        { name: 'D vine 40000' },
        { name: 'D vine Syp' },
        { name: 'Denver 200' },
        { name: 'Denver 400' },
        { name: 'Denver 50 ml Syp' },
        { name: 'Denver DS Syp' },
        { name: 'Dystolic 2.5 mg' },
        { name: 'Dystolic 5 mg' },
        { name: 'Dysis 80' },
        { name: 'Dysis plus' },
        { name: 'Danilo 120' },
        { name: 'Danilo 90' },
        { name: 'Delpark 5 mg' },
        { name: 'Delpark 2 mg' },
        { name: 'Denvar Powder 30 ml' },
        { name: 'Denvar Powder 40 ml' },
        { name: 'Denvar Powder 50 ml' },
        { name: 'Denvar Powder 75 ml' },
        { name: 'Esita 5' },
        { name: 'Esita 10' },
        { name: 'Emistat 4' },
        { name: 'Emistat 8' },
        { name: 'Emistat Syp' },
        { name: 'Evania M 500' },
        { name: 'Evaglip 25/5 mg' },
        { name: 'Evaglip 10/5 mg' },
        { name: 'Evania 25 mg' },
        { name: 'Evania 10 mg' },
        { name: 'Edvila 50 mg' },
        { name: 'Edvila-M 500 mg' },
        { name: 'Edvila-M 850 mg' },
        { name: 'Emistat Inj' },
        { name: 'Furotril 250' },
        { name: 'Furotril 500' },
        { name: 'Furotril 250 Plus' },
        { name: 'Furotril 500 Plus' },
        { name: 'Furotril Plus Syp' },
        { name: 'Flowrap 4 mg' },
        { name: 'Glymin XR' },
        { name: 'Glemep 2 mg' },
        { name: 'Glymin Tab 500 mg' },
        { name: 'Glymin Tab 850 mg' },
        { name: 'Icentin 5' },
        { name: 'Icentin M 500 mg' },
        { name: 'Isentin M 1000 mg' },
        { name: 'Isentin M 850 mg' },
        { name: 'Jaknib 5 mg' },
        { name: 'Lexopil' },
        { name: 'Lyric 25' },
        { name: 'Lyric 50' },
        { name: 'Lyric 75' },
        { name: 'Lyric CR 82.5 mg' },
        { name: 'Myorel 5 mg' },
        { name: 'Myorel 10 mg' },
        { name: 'Nitrin SR Tab' },
        { name: 'Nitrin Spray' },
        { name: 'Napryn 250 mg' },
        { name: 'Napryn 500 mg' },
        { name: 'Nexovas 5 mg' },
        { name: 'Nexovas 10 mg' },
        { name: 'NFT Cap 100  mg' },
        { name: 'Nepitan Tab 50  mg' },
        { name: 'Nepitan Tab 100  mg' },
        { name: 'Opal 20 mg' },
        { name: 'Pogo Syp' },
        { name: 'Prenat-CI' },
        { name: 'Renovit' },
        { name: 'Rocal D' },
        { name: 'Rocal D Vita' },
        { name: 'Rocal M' },
        { name: 'Rocal M Vita' },
        { name: 'Rozith 250' },
        { name: 'Rozith 500' },
        { name: 'Rozith 50 ml Syp' },
        { name: 'Reef D' },
        { name: 'Reef DX' },
        { name: 'Rovast 5 mg' },
        { name: 'Rovast 10 mg' },
        { name: 'Rovast 20 mg' },
        { name: 'Rosela 10 mg' },
        { name: 'Replet 75 mg' },
        { name: 'Replet PLUS' },
        { name: 'Ransys 10 mg' },
        { name: 'Ransys 20 mg' },
        { name: 'Ransys 40 mg' },
        { name: 'Ransys AM 5/20 mg' },
        { name: 'Ransys AM 5/40 mg' },
        { name: 'Ransys Plus' },
        { name: 'Rovast Tab 20  mg' },
        { name: 'Rocal Jr Tab 250  mg' },
        { name: 'Sergel 20' },
        { name: 'Sergel 40' },
        { name: 'Sergel MUPS 20' },
        { name: 'Sergel MUPS 40' },
        { name: 'Santogen' },
        { name: 'Silinor M 500' },
        { name: 'Slimfast' },
        { name: 'Solivo 500 mg' },
        { name: 'Solivo 375 mg' },
        { name: 'Spectazole N Cream' },
        { name: 'Sante Tab' },
        { name: 'Sizonil Tab 1  mg' },
        { name: 'Sizonil Tab 5  mg' },
        { name: 'Skilox Cap 250  mg' },
        { name: 'Skilox Cap 500  mg' },
        { name: 'Ternilla 100' },
        { name: 'Ternilla SR' },
        { name: 'Tinactin Cream' },
        { name: 'Tamisol MR Capsule' },
        { name: 'TR Care Eye Drop' },
        { name: 'Tgdrop Tab 100  mg' },
        { name: 'Teana Tab 20  mg' },
        { name: 'Teana Tab 40  mg' },
        { name: 'Teana Tab 80  mg' },
        { name: 'Teana AM Tab 5/40  mg' },
        { name: 'Teana AM Tab 5/80  mg' },
        { name: 'Teana Plus Tab 40/12.5  mg' },
        { name: 'Teana Plus Tab 80/12.5  mg' },
        { name: 'Viset Tab' },
        { name: 'Viset Syp' },
        { name: 'Vorifast 50' },
        { name: 'Vorifast 200' },
        { name: 'Vifas Syp' },
        { name: 'Vectra 8 mg' },
        { name: 'Vectra 16 mg' },
        { name: 'Vestar MR' },
        { name: 'Xelpid 10 mg' },
        { name: 'Xelpid 20 mg' },
        { name: 'Xelpid 40 mg' },
        { name: 'Xelcard 5 mg' },
        { name: 'Xelcard 10 mg' },
        { name: 'Zoventa 200' },
        { name: 'Zoventa 400' },
        { name: 'Zeropain 10 mg' },
        { name: 'Zilas 20 mg' },
        { name: 'Zoli 0.05% N/D' },
        { name: 'Zoli 0.025% N/D' },
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
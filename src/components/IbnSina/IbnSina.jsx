import { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const IbnSina = () => {
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
        doc.text("IbnSina Pharmaceuticals Ltd.", 10, yPosition);
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

        doc.save('IbnSina.pdf');
    };

    // Sort items alphabetically
    const items = [
        { name: "Antanil Suspension 200 ml" },
        { name: "Antanil Chewable Tab 250/400" },
        { name: "Antanil Plus Suspension 200 ml" },
        { name: "Bactin Tab 500 mg" },
        { name: "Betacin-N Eye Drop" },
        { name: "Bilamin Tab 20 mg" },
        { name: "Bilamin Kids Tab 10 mg" },
        { name: "Bilamin OS 60 ml" },
        { name: "Cefixim Cap 400 mg" },
        { name: "Cefixim Cap 200 mg" },
        { name: "Cinarzin Tab 15 mg" },
        { name: "Cinarzin Plus Tab 20/40" },
        { name: "Cloram Eye Oint 1%" },
        { name: "Cloram Eye Drop 0.5%" },
        { name: "CoralTab Tab" },
        { name: "CoralTab-DX Tab" },
        { name: "Colostat Tab 10 mg" },
        { name: "Colostat Tab 20 mg" },
        { name: "Dexlan Cap 30 mg" },
        { name: "Dexlan Cap 60 mg" },
        { name: "Dexon Eye Drop 0.1%" },
        { name: "Dopadon Tab 10 mg" },
        { name: "Fexomin Tab 120 mg" },
        { name: "Fungin-B Cream 10 gm" },
        { name: "Gavisol Suspension" },
        { name: "Gemitab Tab 320 mg" },
        { name: "Junivit Syp 100 ml" },
        { name: "Ketof Tab 100 ml" },
        { name: "Linax Tab 5 mg" },
        { name: "Linax Plus Tab 2.5/500" },
        { name: "Linax Plus Tab 2.5/850" },
        { name: "Linax Plus Tab 2.5/1000" },
        { name: "Luly Cream 1% 20 gm" },
        { name: "Lytex Syp 100 ml" },
        { name: "Meroclav Tab 250 mg" },
        { name: "Meroclav Tab 500 mg" },
        { name: "Metsina Tab 400 mg" },
        { name: "Metsina Suspension 60 ml" },
        { name: "Montex Tab 10 mg" },
        { name: "Montex Chewable Tab 5 mg" },
        { name: "Montex Chewable Tab 4 mg" },
        { name: "Moodnor Tab 10 mg" },
        { name: "Neocort Oint" },
        { name: "Neuralgin Tab" },
        { name: "Neurega Cap 25 mg" },
        { name: "Neurega Cap 50 mg" },
        { name: "Neurega Cap 75 mg" },
        { name: "Nupralgin Plus Tab 375/20" },
        { name: "Nupralgin Plus Tab 500/20" },
        { name: "Olmedip Tab 5/20" },
        { name: "Olmedip Tab 5/40" },
        { name: "Remood Tab" },
        { name: "Ribosina Tab 5 mg" },
        { name: "Romycin Cap 250 mg" },
        { name: "Romycin Tab 500 mg" },
        { name: "Sinamin Tab 4 mg" },
        { name: "Sinamin Syp 100 ml" },
        { name: "Taglimet Tab 50/1000" },
        { name: "Taglimet Tab 50/500" },
        { name: "Terbinox Tab 250 mg" },
        { name: "Terbinox Cream 1% 10 gm" },
        { name: "Tetrasina Cap 250 mg" },
        { name: "Tetrasina Cap 500 mg" },
        { name: "Xorel Cap 20 mg" },
        { name: "Xorel Tab 20 mg" },
        { name: "Xorel MUPS Tab 20 mg" }
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

export default IbnSina;
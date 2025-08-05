import { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Opsonin = () => {
    const [values, setValues] = useState({});
    const [selectedItems, setSelectedItems] = useState([]);
    const [activeTab, setActiveTab] = useState('Cardiac'); // 👈 for switching tabs

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
        doc.text("Opsonin Pharma Limited", 10, yPosition);
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

        doc.save(`Opsonin-${activeTab.toLowerCase()}.pdf`);
    };

    // Cardiac items
    const cardiacItems = [
        { name: "Bislol" },
        { name: "Bislol Max" },
        { name: "Bislol Plus" },
        { name: "Nitrofix" },
        { name: "Cardex" },
        { name: "Cildip" },
        { name: "Antoris" },
        { name: "Ramacee" },
        { name: "Telemitan" },
        { name: "Telemitan Max" },
        { name: "Telemitan Plus" },
        { name: "Clonatas" },
        { name: "Clonet" },
        { name: "Avas" },
        { name: "Frusin" },
        { name: "Frusin Plus" },
        { name: "Bopam" },
        { name: "Larb" },
        { name: "Larb Plus" },
        { name: "Caldron" },
        { name: "Hypen SR" },
        { name: "Peromal" },
        { name: "Centon" },
        { name: "Amocal" },
        { name: "Amocal AT" },
        { name: "Rotor" },
        { name: "Olsart" },
        { name: "Olsart Plus" },
        { name: "Nebilol" },
        { name: "Unadus M" },
        { name: "Unadus" },
        { name: "Ulidus" },
        { name: "Sitadus" },
        { name: "Sitadus M" },
        { name: "Met" },
        { name: "Glizid" },
        { name: "Glims" }
    ].sort((a, b) => a.name.localeCompare(b.name));

    // CNS items
    const CNSItems = [
        { name: "Amilin Plus Tab 12.5/5 mg" },
        { name: "Amilin Tab 10 mg" },
        { name: "Amilin Tab 25 mg" },
        { name: "Queta Tab 25 mg" },
        { name: "Queta Tab 100 mg" },
        { name: "Queta Tab 200 mg" },
        { name: "Queta XR Tab 100 mg" },
        { name: "Queta XR Tab 300 mg" },
        { name: "Risperdex Tab 1 mg" },
        { name: "Risperdex Tab 2 mg" },
        { name: "Risperdex Tab 4 mg" },
        { name: "Lurasid Tab 20 mg" },
        { name: "Lurasid Tab 40 mg" },
        { name: "Olzap Tab 5 mg" },
        { name: "Olzap Tab 10 mg" },
        { name: "Halop Tab 5 mg" },
        { name: "Aripen Tab 10 mg" },
        { name: "Aripen Tab 15 mg" },
        { name: "Opsonil Tab 50 mg" },
        { name: "Opsonil Injection 50 mg/2 ml" },
        { name: "Bopam Tab 3 mg" },
        { name: "Fluxit Tab" },
        { name: "Citalex Tab 5 mg" },
        { name: "Citalex Tab 10 mg" },
        { name: "AlpraX Tab 0.25 mg" },
        { name: "AlpraX Tab 0.5 mg" },
        { name: "AlpraX XR Tab 1 mg" },
        { name: "AlpraX XR Tab 2 mg" },
        { name: "Epam Tab 5 mg" },
        { name: "Zispin Tab 7.5 mg" },
        { name: "Zispin Tab 30 mg" },
        { name: "Xinplax DR Cap 20 mg" },
        { name: "Xinplax DR Cap 30 mg" },
        { name: "Xinplax DR Cap 60 mg" },
        { name: "Midolam Tab 7.5 mg" },
        { name: "Midolam Injection 1 mg/ml" },
        { name: "Midolam Injection 15 mg/3 ml" },
        { name: "Juvain Tab 800 mg" },
        { name: "Juvain Syp 100 ml" },
        { name: "Caviton Tab 5 mg" },
        { name: "Tripar Tab 1 mg" },
        { name: "Tripar Tab 2 mg" },
        { name: "Tripar Tab 5 mg" },
        { name: "Tripar Syp 50 ml" },
        { name: "Kdrin Tab 5 mg" },
        { name: "Kdrin Injection 10 mg/2 ml" },
        { name: "Convules CR Tab 300 mg" },
        { name: "Convules CR Tab 500 mg" },
        { name: "Levefix Tab 250 mg" },
        { name: "Levefix Oral Solution 50 ml" },
        { name: "Carlev Tab 110 mg" },
        { name: "Carlev CR Tab 250 mg" },
        { name: "Carlev Tab 275 mg" },
        { name: "Encarlev Tab 100 mg" },
        { name: "Encarlev Tab 150 mg" },
        { name: "Cazep Tab 200 mg" },
        { name: "Cazep Suspension 100 ml" },
        { name: "Emer Tab 30 mg" },
        { name: "Emer Tab 60 mg" },
        { name: "Emer Elixir 100 ml" },
        { name: "Lamo Tab 25 mg" },
        { name: "Lamo Tab 50 mg" },
        { name: "Topimax Tab 20 mg" },
        { name: "Topimax Tab 50 mg" },
        { name: "Minium Tab 5 mg" },
        { name: "Minium Tab 10 mg" },
        { name: "Arain Tab 200 mg" },
        { name: "Almitan Tab 6.25 mg" },
        { name: "Pifen Tab 0.5 mg" },
        { name: "Pifen Tab 1 mg" },
        { name: "Pifen Tab 5 mg" },
        { name: "Vergon Tab 5 mg" },
        { name: "Vergon Injection 12.5 mg/ml" },
        { name: "Cinaryl Plus Tab 20/40 mg" },
        { name: "Cinaryl Tab 15 mg" }
    ].sort((a, b) => a.name.localeCompare(b.name));

    // Dermatology items
    const dermatologyItems = [
        { name: "Terbin Tab 250 mg" },
        { name: "Terbin Cream 15 gm" },
        { name: "Terbin Oral Granules 125 mg" },
        { name: "Vorinox Tab 50 mg" },
        { name: "Vorinox Tab 200 mg" },
        { name: "Ketocon Shampoo 100 ml" },
        { name: "Ketocon Tab 200 mg" },
        { name: "Sertacon Cream 2%" },
        { name: "Flucon Cap 50 mg" },
        { name: "Flucon Cap 150 mg" },
        { name: "Flucon Cap 200 mg" },
        { name: "Flucon PFS 35 ml" },
        { name: "Ecozol Cream 1% 30 gm" },
        { name: "Ecozol Cream 1%" },
        { name: "Trimazole Cream 20 gm" },
        { name: "Trimazole Lotion 20 gm" },
        { name: "H-Trimazole Cream 10 gm" },
        { name: "Unigal Cream 10 gm" },
        { name: "Unigal HC Cream 10 gm" },
        { name: "Xyloken Spray 10 ml" },
        { name: "Xyloken Spray 50 ml" },
        { name: "Haloxa Ointment 20 gm" },
        { name: "Betason Cream 10 gm" },
        { name: "Betason Ointment 10 gm" },
        { name: "Ectason Cream 10 gm" },
        { name: "Ectason Ointment 10 gm" },
        { name: "Dermex NN Cream 20 gm" },
        { name: "Dermex S Cream 10 gm" },
        { name: "Dermex Cream 10 gm" },
        { name: "Dermex Ointment 10 gm" },
        { name: "Fucicort Ointment 20 gm" },
        { name: "Xyril Tab 10 mg" },
        { name: "Xyril Tab 25 mg" },
        { name: "Xyril Syp 100 ml" },
        { name: "Lorix Cream 30 gm" },
        { name: "Lorix Plus Lotion 60 ml" },
        { name: "Clindab Gel 15 gm" },
        { name: "Doxin Cap 50 mg" },
        { name: "Doxin Cap 100 mg" },
        { name: "Dormobam Ointment 10 gm" },
        { name: "Neocin Ointment 10 gm" },
        { name: "Neocin Powder 5 gm" },
        { name: "Silvet Cream 25 gm" },
        { name: "Vasojod Tab 500 mg" },
        { name: "Vasojod Tab 1 gm" },
        { name: "M-3 Pediatric Oral Solution 100 ml" },
        { name: "Folic-Z Tab 5 mg" },
        { name: "Folic-Z Tab 20 mg" },
        { name: "Encidot Cap 500 mg" },
        { name: "Encidot Cap 250 mg" },
        { name: "Oxytocin Injection 5 IU" },
        { name: "Provental Inhaler HFA 100 mcg" },
        { name: "Flovira-F Nasal Spray 125 mcg" },
        { name: "Flovira-F Nasal Spray 250 mcg" },
        { name: "Snofas Nasal Spray" },
        { name: "Zeltas Nasal Spray" },
        { name: "Flunat Nasal Spray" },
        { name: "Cidlex Nasal Spray" },
        { name: "Xylomet Nasal Spray" },
        { name: "Pulmolin Syp 100 ml" },
        { name: "Pulmolin Inhaler" },
        { name: "Purilin Tab 1 mg" },
        { name: "Purilin Syp 100 ml" },
        { name: "Candibac Ear Drops 5 ml" },
        { name: "Alistin DT Dispersible Tab 600 mg" },
        { name: "Doxorin Syp 100 ml" },
        { name: "Doxorin Tab 30 mg" },
        { name: "Dezacot Tab 24 mg" },
        { name: "Dezacot PFS 60 mg" },
        { name: "Ebanex Tab 10 mg" },
        { name: "Ebanex Oral Solution 50 ml" },
        { name: "Filin Injection 125 mg" },
        { name: "Kofen Tab 10 mg" },
        { name: "Kofen Oral Solution 100 ml" },
        { name: "Unilin Syp 100 ml" },
        { name: "Unilin Pediatric Syp 100 ml" },
        { name: "Unilin Tab CR 400 mg" },
        { name: "Trilock Tab 5 mg" },
        { name: "Trilock Tab 4 mg" }
    ].sort((a, b) => a.name.localeCompare(b.name));

    const itemsMap = {
        Cardiac: cardiacItems,
        CNS: CNSItems,
        Derma: dermatologyItems
        // ... add more as needed
    };

    const currentItems = itemsMap[activeTab] || itemsMap["Cardiac"] || [];

    return (
        <div className='mx-3'>
            {/* Tabs */}
            <div className='flex gap-3 my-4'>
                <button
                    className={`btn ${activeTab === 'Cardiac' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('Cardiac')}
                >
                    Cardiac
                </button>
                <button
                    className={`btn ${activeTab === 'CNS' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('CNS')}
                >
                    CNS
                </button>
                <button
                    className={`btn ${activeTab === 'Derma' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('Derma')}
                >
                    Dermatology
                </button>
            </div>

            <h2 className='text-lg font-medium'>{activeTab} Items</h2>
            <div className='my-2'>
                <hr />
            </div>

            <div>
                {currentItems.map(item => (
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
                            onClick={() => handleSelect(item.name, activeTab)}
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

export default Opsonin;
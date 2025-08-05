import { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Aristopharma = () => {
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
        doc.text("Aristopharma Ltd.", 10, yPosition);
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

        doc.save(`Aristopharma-${activeTab.toLowerCase()}.pdf`);
    };

    // Cardiac items
    const cardiacItems = [
        { name: 'Agoxin Tab' },
        { name: 'Ancor-2.5' },
        { name: 'Ancor-5' },
        { name: 'Ancor-10' },
        { name: 'Ancor-A 2.5/5' },
        { name: 'Ancor Plus-2.5' },
        { name: 'Ancor Plus-5' },
        { name: 'Cilnipin 5' },
        { name: 'Cilnipin 10' },
        { name: 'Clocard 75mg' },
        { name: 'Clocard-A' },
        { name: 'Duoblock 5/20' },
        { name: 'Duoblock 5/40' },
        { name: 'Empaglif 10' },
        { name: 'Empaglif 25' },
        { name: 'Empaglif-M 5/500' },
        { name: 'Gluconor 1' },
        { name: 'Gluconor 2' },
        { name: 'Glucomet 500' },
        { name: 'Glucomet 500 XR' },
        { name: 'Glucomet 750 XR' },
        { name: 'Glucomet 850' },
        { name: 'Glucozid 80' },
        { name: 'Glucozid MR 30' },
        { name: 'Glucozid MR 60' },
        { name: 'Gluvan 50' },
        { name: 'Gluvan Plus 500' },
        { name: 'Gluvan Plus 850' },
        { name: 'Lacicard-2' },
        { name: 'Lacicard-4' },
        { name: 'Limpa 5/10' },
        { name: 'Limpa 5/25' },
        { name: 'Linaglip 5' },
        { name: 'Linaglip-M 2.5/500' },
        { name: 'Linaglip-M 2.5/850' },
        { name: 'Linaglip-M 5/1000' },
        { name: 'Lodicard 50' },
        { name: 'Lodipin-5' },
        { name: 'Maxineb 2.5' },
        { name: 'Maxineb 5' },
        { name: 'Metacard MR' },
        { name: 'Nitrocard SR' },
        { name: 'Nitrocard Spray' },
        { name: 'Osartan 50' },
        { name: 'Osartan-HZ' },
        { name: 'Pitavas 2' },
        { name: 'Ruvastin-5' },
        { name: 'Ruvastin-10' },
        { name: 'Ruvastin-20' },
        { name: 'TCL-R 10' },
        { name: 'TCL-R 20' },
        { name: 'TCL-R 40' },
        { name: 'Temcard 20' },
        { name: 'Temcard 40' },
        { name: 'Temcard 80' },
        { name: 'Temcard-A 40/5' },
        { name: 'Temcard-A 80/5' }
    ].sort((a, b) => a.name.localeCompare(b.name));

    // General items
    const generalItems = [
        { name: 'A-Mycin Lotion' },
        { name: 'AREDS Cap' },
        { name: 'Acliz Plus Tab' },
        { name: 'Acliz Tab' },
        { name: 'Afrin Drop 0.025%' },
        { name: 'Afrin Drop 0.05%' },
        { name: 'Anfree Tab' },
        { name: 'Apetiz Syp' },
        { name: 'Apetiz Tab' },
        { name: 'Apuldon Tab' },
        { name: 'Aristo D3 Cap 20000 IU' },
        { name: 'Aristo D3 Cap 40000 IU' },
        { name: 'Aristo D3 Inj 200000 IU/ml' },
        { name: 'Aristo D3 Tab 2000 IU' },
        { name: 'Aristo Gold Tab' },
        { name: 'Aristo Kid Syp' },
        { name: 'Aristo Mom Tab' },
        { name: 'Aristo Silver Tab' },
        { name: 'Aristocort Cream' },
        { name: 'Aristocort Oint' },
        { name: 'Aristocort Plus Cream' },
        { name: 'Aristoderm Cream' },
        { name: 'Aroflo Inhaler' },
        { name: 'Arotril Tab 0.5mg' },
        { name: 'Arotril Tab 1mg' },
        { name: 'Arotril Tab 2mg' },
        { name: 'Arotrix Cream 5%' },
        { name: 'Avolac Syp 100ml' },
        { name: 'Avolac Syp 200ml' },
        { name: 'Axim CV Syp' },
        { name: 'Axim CV Tab 250mg' },
        { name: 'Axim CV Tab 500mg' },
        { name: 'Axim Tab 500mg' },
        { name: 'Axofen Syp 30mg' },
        { name: 'Axofen Tab 120mg' },
        { name: 'AZ Syp 20ml' },
        { name: 'AZ Tab 500mg' },
        { name: 'Beclovan Tab 10mg' },
        { name: 'Beclovan Tab 5mg' },
        { name: 'Calbon D Tab 500mg' },
        { name: 'Canalia Cap 30mg' },
        { name: 'Canalia Cap 60mg' },
        { name: 'Caspa Tab 200mg' },
        { name: 'Caspa Tab 50mg' },
        { name: 'Clinex Lotion 1%' },
        { name: 'Clinex Plus Topical Gel' },
        { name: 'Clobesol Cream 10gm' },
        { name: 'Clobesol Oint 10gm' },
        { name: 'Clobesol SA Oint 10gm' },
        { name: 'Contine Tab 200mg' },
        { name: 'Contine Tab 400mg' },
        { name: 'Cortisol Syp 50ml' },
        { name: 'Cortisol Tab 10mg' },
        { name: 'Cortisol Tab 5mg' },
        { name: 'Dermocin Oint' },
        { name: 'Dicliz Plus Tab 10mg' },
        { name: 'Dicliz Plus Tab 20mg' },
        { name: 'Diprosal Lotion 0.05%' },
        { name: 'Docopa Syp 100ml' },
        { name: 'Docopa Tab 200mg' },
        { name: 'Docopa Tab 400mg' },
        { name: 'Emep Cap 20mg' },
        { name: 'Emep Cap 40mg' },
        { name: 'Emep MUPS Tab 20mg' },
        { name: 'Emep MUPS Tab 40mg' },
        { name: 'Erdon TR Cap 100mg' },
        { name: 'Febux Tab 40mg' },
        { name: 'Flacort Syp 60ml' },
        { name: 'Flacort Tab 24mg' },
        { name: 'Flacort Tab 6mg' },
        { name: 'Flumetanol Drop 1% 5ml' },
        { name: 'Flutica Cream 0.05%' },
        { name: 'Flutica Spray' },
        { name: 'Fossical-D Tab 500mg IU' },
        { name: 'Fossical-DX Tab 600mg IU' },
        { name: 'Fusidate H Cream 2% 10gm' },
        { name: 'Hepaximin Tab 200mg' },
        { name: 'Hepaximin Tab 550mg' },
        { name: 'Ipec-Plus Tab' },
        { name: 'Ipec-Super Cap' },
        { name: 'Itopa-50 Tab' },
        { name: 'Ketozol Shampoo 2%' },
        { name: 'Luiz Cream 1%' },
        { name: 'Maxicon Syp 200ml' },
        { name: 'Maxineb Tab 2.5mg' },
        { name: 'Maxineb Tab 5mg' },
        { name: 'Mecol Tab' },
        { name: 'Mervan SR Tab 200mg' },
        { name: 'Mervan Tab 100mg' },
        { name: 'Mirovan Tab 10mg' },
        { name: 'Mirovan Tab 2.5mg' },
        { name: 'Mirovan Tab 5mg' },
        { name: 'Montril Flash Tab 4mg' },
        { name: 'Montril Tab 10mg' },
        { name: 'Montril Tab 5mg' },
        { name: 'Mycon Gel 2% 15gm' },
        { name: 'Neobion Inj 100mg' },
        { name: 'Neobion Tab 100mg' },
        { name: 'Neso Tab 375mg' },
        { name: 'Neso Tab 500gm' },
        { name: 'Nexol Syp 100ml' },
        { name: 'Nine Seas Syp 100ml' },
        { name: 'Nitoxin Suspension 30ml' },
        { name: 'Emep Tab 20mg' },
        { name: 'Nitoxin Tab 500mg' },
        { name: 'Norzim Tab 12.5mg' },
        { name: 'Notens Tab 3mg' },
        { name: 'Omep Cap 20mg' },
        { name: 'Omep Cap 40mg' },
        { name: 'Optimox Tab 400mg' },
        { name: 'Oradol Tab 10mg' },
        { name: 'Orbuten Cap 400mg' },
        { name: 'Ovel Tab 500mg' },
        { name: 'Prostanil MR Cap 0.4mg' },
        { name: 'Rabe Tab 20mg' },
        { name: 'Rejoin-D Tab 750mg' },
        { name: 'Reumacap Cap 25mg' },
        { name: 'Reumacap SR Cap 75mg' },
        { name: 'Reumazin Tab 500mg' },
        { name: 'Rhinil Tab 10mg' },
        { name: 'Rupa Syp 60ml' },
        { name: 'Rupa Tab 10mg' },
        { name: 'Siloflo Cap 4mg' },
        { name: 'Siloflo Cap 8mg' },
        { name: 'Solifen Tab 5mg' },
        { name: 'Soneta Cream 0.1% 5gm' },
        { name: 'Soneta Oint 0.1% 5gm' },
        { name: 'Stafen Syp 100ml' },
        { name: 'Stafen Tab 1mg' },
        { name: 'Terbifin Cream 1% 10gm' },
        { name: 'Terbifin Tab 250mg' },
        { name: 'Veralgin Tab 50mg' },
        { name: 'Vitazin Syp' },
        { name: 'Vonofix Tab 10mg' },
        { name: 'Vonofix Tab 20mg' },
        { name: 'Xicotil Tab 20mg' },
        { name: 'Xpa XR Tab 665mg' },
        { name: 'ZnF Tab 5mg' },
        { name: 'Zofen Tab 0.5mg' },
        { name: 'Goodback L Syp'},
        { name: 'Goodback SB Cap'},
        { name: 'Goodback 3S Cap'},
        { name: 'A-Fix 50 ml Syp'},
        { name: 'Ariscon Suspension'},
        { name: 'Fosibon-DK Tab'},
    ].sort((a, b) => a.name.localeCompare(b.name));

    const currentItems = activeTab === 'Cardiac' ? cardiacItems : generalItems;

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
                    className={`btn ${activeTab === 'General' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('General')}
                >
                    General
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

export default Aristopharma;
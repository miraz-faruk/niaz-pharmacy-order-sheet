import { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Healthcare = () => {
    const [values, setValues] = useState({});
    const [selectedItems, setSelectedItems] = useState([]);
    const [activeTab, setActiveTab] = useState('General'); // 👈 for switching tabs

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
        doc.text("Renata Limited", 10, yPosition);
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

        doc.save('Renata Limited.pdf');
    };

    // Sort items alphabetically
    const generalItems = [
        { name: 'Algin Inj' },
        { name: 'Algin Syp 50 ml' },
        { name: 'Algin Tab 50 mg' },
        { name: 'Alkanon DT Tab 1000mg' },
        { name: 'Alkanon Tab 500mg' },
        { name: 'Alkanon Tab 750mg' },
        
        { name: 'Androcap Cap 40mg' },
        { name: 'Angela Tab 1mg' },
        { name: 'Beconex Syp 100 ml' },
        { name: 'Beconex Syp 200 ml' },
        { name: 'Becosules Gold Cap' },

        
        { name: 'Bredicon Tab 0.075mg' },
        { name: 'Cabolin Tab 0.5mg' },
        { name: 'Calcin-D Tab 500mg' },
        { name: 'Calcin-DX Tab 600mg' },
        { name: 'Calcin-M Tab' },
        { name: 'Calcin-O DS Tab 740mg' },
        { name: 'Calcin-O Tab 400mg' },
        
        { name: 'Cebuten Cap 400mg' },
        { name: 'Ceclofen Tab 100mg' },
        { name: 'Cilma Tab 10mg' },
        { name: 'Cilma Tab 5mg' },
        { name: 'Conasyd Cream 1% 10 gm' },
        { name: 'Coralcin-D Tab 500mg' },
        { name: 'Coralcin-DX 15 Tab' },
        { name: 'Coralcin-DX 30 Tab' },
        { name: 'Danzol Cap 100mg' },
        { name: 'Danzol Cap 200mg' },
        { name: 'Decaren Cap 100mg' },
        { name: 'Decaren Cap 60mg' },
        { name: 'Delentin Suspension 50 ml' },
        { name: 'Deltasone Syp 50 ml' },
        { name: 'Deltasone Tab 10mg' },
        { name: 'Deltasone Tab 20mg' },
        { name: 'Deltasone Tab 5mg' },
        { name: 'Denixil Tab 0.25mg' },
        { name: 'Denixil Tab 0.5mg' },
        { name: 'Denixil Tab 1mg' },
        { name: 'Denixil Tab 2mg' },
        { name: 'Desolon Tab 0.03mg' },

        { name: 'Domiren Pediatric Drop 5 ml' },
        { name: 'Domiren Suspension 60 ml' },
        { name: 'Domiren Tab 10mg' },
        { name: 'Doxicap Cap 100mg' },
        { name: 'Dysmen Tab 500mg' },
        { name: 'E-Gel DS Cap 400 IU' },
        { name: 'Eazy Jelly Topical Gel 50 gm' },
        { name: 'Emcon 1' },
        { name: 'Erythrox Suspension 125mg 100 ml' },
        { name: 'Escilex Tab 10mg' },
        { name: 'Escilex Tab 5mg' },
        { name: 'Estracon Tab 0.625mg' },
        { name: 'Estracon Vaginal Cream 0.0625% 15 gm' },
        { name: 'Fenadin Suspension 30 ml' },
        { name: 'Fenadin Suspension 50 ml' },
        { name: 'Fenadin Tab 120mg' },
        { name: 'Fenadin Tab 180mg' },
        { name: 'Fenadin Tab 60mg' },

        { name: 'Ferix-V Cap' },
        { name: 'Flontin Suspension 250mg 60 ml' },
        { name: 'Flontin Tab 500mg' },
        { name: 'Flustar Cap 250mg' },
        { name: 'Flustar Cap 500mg' },
        { name: 'Flustar Suspension 125mg 100 ml' },
        { name: 'Folinic Tab 5mg' },
        { name: 'Furocef Suspension 125mg 70 ml' },
        { name: 'Furocef Tab 250mg' },
        { name: 'Furocef Tab 500mg' },
        { name: 'Furoclav Suspension 125mg 70 ml' },
        { name: 'Furoclav Tab 250mg' },
        { name: 'Furoclav Tab 500mg' },
        { name: 'GABA-P Cap 25mg' },
        { name: 'GABA-P Cap 50mg' },
        { name: 'GABA-P Cap 75mg' },
        { name: 'Gaba Tab 300mg' },
        { name: 'Gaba-P CR Tab 165mg' },
        { name: 'Gaba-P CR Tab 330mg' },
        { name: 'Gaba-P CR Tab 82.5mg' },
        { name: 'Gestrenol Tab 5mg' },
        { name: 'Giane Tab 35' },


        { name: 'Gynova Tab 2mg' },
        { name: 'Honycol Syp' },
        { name: 'Kiddi Syp 100 ml' },
        { name: 'Letrol Tab 2.5mg' },
        { name: 'Levoking Tab 500mg' },
        { name: 'Linez Tab 400mg' },
        { name: 'Linez Tab 600mg' },
        { name: 'Lucan-R Cap 50mg' },
        { name: 'Lucan-R Suspension 50mg' },
        { name: 'Lucent Cap 0.25mg' },
        { name: 'Luliren Cream 1% 10 gm' },
        { name: 'Luliren Cream 1% 20 gm' },
        { name: 'Maxipass Cap 0.4mg' },
        { name: 'Maxpro Cap 20mg' },
        { name: 'Maxpro Cap 40mg' },
        { name: 'Maxpro MUPS Tab 20mg' },
        { name: 'Maxpro MUPS Tab 40mg' },
        { name: 'Maxpro Tab 20mg' },
        { name: 'Maxpro Tab 40mg' },
        { name: 'Menorest Tab 2.5mg' },
        { name: 'Microgest Cap 100mg' },
        { name: 'Microgest Cap 200mg' },
        { name: 'Myosit Plus Tab 150mg' },
        { name: 'Myosit Tab 750mg' },
        { name: 'Nebiren Tab 2.5mg' },
        { name: 'Nebiren Tab 5mg' },
        { name: 'Neogest Tab 2mg' },
        { name: 'Neurobest Inj 3 ml' },
        { name: 'Neurobest Tab' },

        { name: 'Normanal Tab 500mg' },
        { name: 'Normens Tab 5mg' },
        { name: 'Norry Tab 3mg' },
        { name: 'Novelon Lite Tab 3mg' },
        { name: 'Novelon Tab 3mg' },
        { name: 'Odmon Chewable Tab 5mg' },
        { name: 'Odmon Tab 10mg' },
        { name: 'Odmon Tab 4mg' },
        { name: 'Opexa Tab 20mg' },
        { name: 'Orcef Cap 200mg' },
        { name: 'Orcef Cap 400mg' },
        { name: 'Orcef DS Suspension 200mg' },
        { name: 'Orcef Suspension 50mg' },
        { name: 'Orcef Suspension 70mg' },
        { name: 'Orcef Tab 200mg' },
        { name: 'Orcef Tab 400mg' },
        
        { name: 'Ovulet Tab 100mg' },
        { name: 'Ovulet Tab 50mg' },
        { name: 'Plagrin Plus Tab 75mg' },
        { name: 'Plagrin Tab 75mg' },
        { name: 'Polycef Cap 250mg' },
        { name: 'Polycef Cap 500mg' },
        { name: 'Prazole Cap 20mg' },
        { name: 'Pulmino Tab 200mg' },
        { name: 'Regumen Tab 0.05mg' },
        { name: 'Renxit Tab 0.5mg' },
        { name: 'Rephaston Tab 10mg' },
        
        { name: 'Rolac Tab 10mg' },

        { name: 'Salburen Inhaler 100mg' },
        { name: 'Saltica Inhalation Cap 50mg' },
        { name: 'Saltica Inhaler 25mg' },
        { name: 'Sperid Tab 1mg' },
        { name: 'Sperid Tab 2mg' },
        { name: 'Sperid Tab 4mg' },
        { name: 'Stark Tab 10mg' },
        
        { name: 'Terbimax Cream 1% 10 gm' },
        { name: 'Terbimax Tab 250mg' },
        { name: 'Thyrox Tab 100mg' },
        { name: 'Thyrox Tab 12.5mg' },
        { name: 'Thyrox Tab 25mg' },
        { name: 'Thyrox Tab 50mg' },
        { name: 'Thyrox Tab 75mg' },
        { name: 'Tigover Tab 10mg' },
        { name: 'Tigover Tab 5mg' },
        { name: 'Tolter Tab 2mg' },
        { name: 'Topmate Tab 25mg' },
        { name: 'Topmate Tab 50mg' },
        { name: 'Totifen Syp 100 ml' },
        { name: 'Totifen Tab 1mg' },
        { name: 'Tritin Tab 100mg' },

        { name: 'Trulax Syp 100 ml' },
        { name: 'Ulfix Suspension 200 ml' },

        { name: 'VCAP VS' },
        { name: 'Valporin CR Tab 200mg' },
        { name: 'Valporin CR Tab 300mg' },
        { name: 'Valporin CR Tab 500mg' },
        { name: 'Vomiren Cap 0.5mg' },
        { name: 'Vomiren Tab 0.5mg' },
        { name: 'Voxamin Tab 100mg' },
        { name: 'Voxamin Tab 50mg' },
        { name: 'Xamic Cap 500mg' },
        { name: 'Xamic Tab 650mg' },
        { name: 'Zithrin Tab 500mg' },
        { name: 'Zodef Suspension 60 ml' },
        { name: 'Zodef Tab 24mg' },
        { name: 'Zodef Tab 6mg' },
        
        { name: "Lactohil Powder" },
        { name: "Pregcare" },
        { name: "Nutrilina" },
        { name: "GoodGut" },
        { name: "JeeBee" },
        { name: "Espirar" },
        { name: "Criptin Tab" }
    ].sort((a, b) => a.name.localeCompare(b.name));

    const cardiacItems = [
        { name: 'Alphapress Tab 1mg' },
        { name: 'Alphapress Tab 2mg' },
        { name: 'Alphapress XR Tab 2.5mg' },
        { name: 'Alphapress XR Tab 5mg' },
        { name: 'Antogin ER Tab 500 mg' },
        { name: "Azisan Tablet 40 mg" },
        { name: "Azisan Plus 40/12.5 mg" },
        { name: 'Bigmet Tab 500mg' },
        { name: 'Bigmet Tab 850mg' },
        { name: 'Bigmet XR Tab 500mg' },
        { name: 'Bisoren M Tab 2.5mg' },
        { name: 'Bisoren Plus Tab 2.5mg' },
        { name: 'Bisoren Plus Tab 5mg' },
        { name: 'Bisoren Tab 2.5mg' },
        { name: 'Bisoren Tab 5mg' },
        { name: 'Cardipin Plus Tab 50mg' },
        { name: 'Cardipin Tab 5mg' },
        { name: 'Cilma Tab 5mg' },
        { name: 'Cilma Tab 10mg' },
        { name: 'Diampa M Tab 500mg' },
        { name: 'Diampa Tab 10mg' },
        { name: 'Diampa Tab 25mg' },
        { name: 'Entrovas Tab 50mg' },
        { name: 'Entrovas Tab 100mg' },
        { name: 'Entrovas Tab 200mg' },
        { name: 'Fenobate Cap 200mg' },
        { name: 'Glinta Tab 5mg' },
        { name: 'Glinta-M Tab 2.5/500mg' },
        { name: 'Glinta-M Tab 2.5/850mg' },
        { name: 'Glinta Plus Tab 10mg' },
        { name: 'Glinta Plus Tab 25mg' },
        { name: 'Glicron CR Cap 30mg' },
        { name: 'Glicron Tab 80mg' },
        { name: 'Nitroren SR Tab 2.6mg' },
        { name: 'Novelip Tab 180mg' },
        { name: 'Ostan Plus Tab 50mg' },
        { name: 'Ostan Tab 25mg' },
        { name: 'Ostan Tab 50mg' },
        { name: 'Phenocept 500mg' },
        { name: 'Pendoril Tab 2mg' },
        { name: 'Pendoril Tab 4mg' },
        { name: 'Pendoril Plus Tab 4mg' },
        { name: 'Pendoril Plus Tab 4mg' },
        { name: 'Rolip Tab 10mg' },
        { name: 'Rolip Tab 20mg' },
        { name: 'Rolip Tab 5mg' },
        { name: 'Rezor Max Tab 5mg' },
        { name: 'Rezor Tab 20mg' },
        { name: 'Sitacret M Tab 500mg' },
        { name: 'Telpro Max Tab 40mg' },
        { name: 'Telpro Max Tab 80mg' },
        { name: 'Telpro Plus Tab 40mg' },
        { name: 'Telpro Plus Tab 80mg' },
        { name: 'Telpro Tab 20mg' },
        { name: 'Telpro Tab 40mg' },
        { name: 'Telpro Tab 80mg' },
        { name: 'Taven Tab 10mg' },
        { name: 'Taven Tab 20mg' },
        { name: 'Taven EZ Tab 20mg' },
        { name: 'Taven EZ Tab 10mg' },
        { name: 'Trizedon MR Tab 35mg' },
        { name: 'Uritone Tab 20mg' },
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

export default Healthcare;
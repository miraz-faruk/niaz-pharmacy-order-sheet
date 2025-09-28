import { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const DrugInternational = () => {
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
        doc.text("Drug International Ltd.", 10, yPosition);
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

        doc.save('Drug International.pdf');
    };

    // Sort items alphabetically
    const items = [
        { name: 'Acepril Tab 10 mg' },
        { name: 'Acepril Tab 5 mg' },
        { name: 'Acetor Tab 25 mg' },
        { name: 'Albasine Tab 30 mg' },
        { name: 'Amlocard Tab 5 mg' },
        { name: 'Amlocard Tab 10 mg' },
        { name: 'Amlocard Plus Tab 25 mg' },
        { name: 'Amlocard Plus Tab 50 mg' },
        { name: 'Angicard Tab 0.5 mg' },
        { name: 'Apit Tab 160 mg' },
        { name: 'Apit Tab 40 mg' },
        { name: 'Apit Suspension 200 mg' },
        { name: 'Aslor Tab 5 mg' },
        { name: 'Asta King Cap 2 mg' },
        { name: 'Asta King Cap 4 mg' },
        { name: 'Azimex Tab 250 mg' },
        { name: 'Azimex Tab 500 mg' },
        { name: 'Azimex Suspension 15 ml' },
        { name: 'Azimex Syp 30 ml' },
        { name: 'Azimex Syp 50 ml' },
        { name: 'Bacmax Tab 10 mg' },
        { name: 'Bacmax Tab 5 mg' },
        { name: 'Benzac Cream 4% 15 gm' },
        { name: 'Betaloc Tab 50 mg' },
        { name: 'Betaloc Tab 25 mg' },
        { name: 'Betaloc-XR Tab 100 mg' },
        { name: 'Betaloc-XR Tab 50 mg' },
        { name: 'Betavate-CL Oint 10 gm' },
        { name: 'Betavate-N Cream 10 gm' },
        { name: 'Biloba Cap 60 mg' },
        { name: 'Bufen-SR Cap 300 mg' },
        { name: 'Butibac Cap 400 mg' },
        { name: 'Butibac Suspension 60 ml' },
        { name: 'Caldil-OT Tab 400 mg' },
        { name: 'Caldil-Plus Tab 500 mg' },
        { name: 'Camiton Tab 5 mg' },
        { name: 'Cardiron Tab 200 mg' },
        { name: 'Cardizem Tab 30 mg' },
        { name: 'Cardizem Tab 60 mg' },
        { name: 'Cardizem SR Tab 90 mg' },
        { name: 'Cardizem SR Tab 120 mg' },
        { name: 'Champion Cream 15 gm' },
        { name: 'Ciprocort 10 ml E/D' },
        { name: 'Ciprozid Suspension 60 ml' },
        { name: 'Ciprozid-DS Tab 500 mg' },
        { name: 'Clarin Tab 500 mg' },
        { name: 'Clarin Tab 250 mg' },
        { name: 'Clavuran Tab 100 mg' },
        { name: 'Clavuran Tab 200 mg' },
        { name: 'Clopid Tab 75 mg' },
        { name: 'Clopid-AS Tab 75 mg' },
        { name: 'Cod Liver Oil Cap' },
        { name: 'Combomax Cap' },
        { name: 'Cosec Cap 20 mg' },
        { name: 'Cosec Cap 40 mg' },
        { name: 'Cosec-MUPS Tab 20 mg' },
        { name: 'Cosec-MUPS Tab 40 mg' },
        { name: 'D-Cap Cap 40000 IU' },
        { name: 'D-Cap Cap 20000 IU' },
        { name: 'D-Cap Cap 800 IU' },
        { name: 'D-Cap Cap 2000 IU' },
        { name: 'D-Cap Cap 1000 IU' },
        { name: 'D-Dopa Tab 110 mg' },
        { name: 'D-Fen Tab 0.5 mg' },
        { name: 'D-Fen Tab 1.5 mg' },
        { name: 'D-Sefa Cap 500 mg' },
        { name: 'D-Toin Tab 100 mg' },
        { name: 'Dalatic Cap 300 mg' },
        { name: 'Demoxiclave Suspension 100 ml' },
        { name: 'Demoxiclave Tab 625 mg' },
        { name: 'Demoxiclave Tab 375 mg' },
        { name: 'Demoxiclave Tab 1000 mg' },
        { name: 'Demoxil Cap 500 mg' },
        { name: 'Depomed Tab 8 mg' },
        { name: 'Devas Syp 100 ml' },
        { name: 'Dezco Tab 6 mg' },
        { name: 'Dialiptin Tab 50 mg' },
        { name: 'Dialiptin-M Tab 500 mg' },
        { name: 'Dialiptin-M Tab 850 mg' },
        { name: 'Dicaltrol Cap' },
        { name: 'Dicaltrol Plus Tab' },
        { name: 'Dicef Cap 500 mg' },
        { name: 'Dicef Cap 250 mg' },
        { name: 'Diconten Tab' },
        { name: 'Dicot Cream 1% 10 gm' },
        { name: 'Difans Syp 100 ml' },
        { name: 'Dimerol Tab 80 mg' },
        { name: 'Dimerol MR Tab 30 mg' },
        { name: 'Dimerol MR Tab 60 mg' },
        { name: 'Dipa Tab 10 mg' },
        { name: 'Diproxen Tab 500 mg' },
        { name: 'Diproxen CR Tab 500 mg' },
        { name: 'Diretic Tab 20 mg' },
        { name: 'Diretic-DS Tab 40 mg' },
        { name: 'Disartan Tab 40 mg' },
        { name: 'Disartan Tab 20 mg' },
        { name: 'Divastin Tab 40 mg' },
        { name: 'Divastin Tab 20 mg' },
        { name: 'Divastin Tab 10 mg' },
        { name: 'Dlac OS 100 ml' },
        { name: 'Dlac OS 200 ml' },
        { name: 'Doxoma Tab 400 mg' },
        { name: 'Doxoma Tab 200 mg' },
        { name: 'Doxoma Syp 100 ml' },
        { name: 'Dsec Cap 30 mg' },
        { name: 'Dsec Cap 60 mg' },
        { name: 'Dutamax Cap 0.5 mg' },
        { name: 'E-Cap Cap 600 IU' },
        { name: 'E-Cap Cap 200 IU' },
        { name: 'E-Cap Cap 400 IU' },
        { name: 'E-Cap Plus Cap' },
        { name: 'Emparol Tab 25 mg' },
        { name: 'Emparol Tab 10 mg' },
        { name: 'Emparol-L Tab 10 mg' },
        { name: 'Emparol-M Tab 500 mg' },
        { name: 'Entavir Tab 1 mg' },
        { name: 'Entavir Tab 0.5 mg' },
        { name: 'F-Son Nasal Spray' },
        { name: 'Famotid Tab 20 mg' },
        { name: 'Famotid Suspension 40 mg' },
        { name: 'Famotid Tab 40 mg' },
        { name: 'Faxan Tab 550 mg' },
        { name: 'Faxan Tab 200 mg' },
        { name: 'Fenat Eye Drop 5 ml' },
        { name: 'Fenat Tab 1 mg' },
        { name: 'Fenat Syp 100 ml' },
        { name: 'Fenatrol Tab 145 mg' },
        { name: 'Ferozi Cap 150 mg' },
        { name: 'Ferozi-CI Cap 50 mg' },
        { name: 'Fexofast Tab 120 mg' },
        { name: 'Fexofast Tab 180 mg' },
        { name: 'Fexofast Suspension 50 ml' },
        { name: 'Floxalone Tab 400 mg' },
        { name: 'Floxalone Eye Drop 5 ml' },
        { name: 'Floxalone-DX Eye Drop 5 ml' },
        { name: 'Flunac Suspension 35 ml' },
        { name: 'Flunac Cap 150 mg' },
        { name: 'Flunac Cap 50 mg' },
        { name: 'Flupen Cap 250 mg' },
        { name: 'Flupen Suspension 125 mg' },
        { name: 'Flupen Cap 500 mg' },
        { name: 'Foly Tab 5 mg' },
        { name: 'Foly Tab 15 mg' },
        { name: 'Fuclav Tab 500 mg' },
        { name: 'Fuclav Tab 250 mg' },
        { name: 'Fuclav Tab 125 mg' },
        { name: 'Fuclav Suspension 70 ml' },
        { name: 'Furex Tab 250 mg' },
        { name: 'Furex Tab 500 mg' },
        { name: 'Furex Suspension 70 ml' },
        { name: 'Fusibac-H Cream 10 gm' },
        { name: 'Gavinor Suspension' },
        { name: 'Gelcin Tab 320 mg' },
        { name: 'Glucotin Max Tab 750 mg' },
        { name: 'Glucotin Plus Tab 250 mg' },
        { name: 'Gynomix VS' },
        { name: 'Hepanor Cap 70 mg' },
        { name: 'Hepanor Cap 140 mg' },
        { name: 'Indapa-SR Tab 1.5 mg' },
        { name: 'Leroid Tab 50 mg' },
        { name: 'Letrozol Tab 2.5 mg' },
        { name: 'Levoflox Tab 500 mg' },
        { name: 'Levoflox Tab 750 mg' },
        { name: 'Levoflox Eye Drop 5 ml' },
        { name: 'Licerin Cream 5% 15 gm' },
        { name: 'Limpet Tab 1 mg' },
        { name: 'Limpet Tab 2 mg' },
        { name: 'Limpet Tab 3 mg' },
        { name: 'Limpet Tab 4 mg' },
        { name: 'Limpet-M Tab 2 mg' },
        { name: 'Limpet-M Tab 1 mg' },
        { name: 'Linarol Tab 5 mg' },
        { name: 'Linarol-M Tab 500 mg' },
        { name: 'Linarol-M Tab 850 mg' },
        { name: 'Linarol-M Tab 1000 mg' },
        { name: 'Lorat Tab 10 mg' },
        { name: 'Losardil Tab 25 mg' },
        { name: 'Losardil Tab 50 mg' },
        { name: 'Losardil Tab 100 mg' },
        { name: 'Losardil 100/12.5 Tab' },
        { name: 'Losardil 100/25 Tab' },
        { name: 'Losardil 25/12.5 Tab' },
        { name: 'Losardil 50/12.5 Tab' },
        { name: 'Luzoca Cream 1% 10 gm' },
        { name: 'M-Kast Tab 10 mg' },
        { name: 'M-Kast Tab 4 mg' },
        { name: 'M-Kast Tab 5 mg' },
        { name: 'M-Son Nasal Spray' },
        { name: 'Madhuvas Syp 100 ml' },
        { name: 'Magolin Tab 5 mg' },
        { name: 'Mecolin Tab 500 mg' },
        { name: 'Meth Tab 10 mg' },
        { name: 'Meverine SR Cap 200 mg' },
        { name: 'Meverine Tab 135 mg' },
        { name: 'Micoderm Cream 10 gm' },
        { name: 'Micoderm Oral Gel 15 gm' },
        { name: 'Micoderm-HC Cream 10 gm' },
        { name: 'Migon Tab 10 mg' },
        { name: 'Migon Tab 5 mg' },
        { name: 'Miotrol Tab 2.5 mg' },
        { name: 'Monocard-SR Cap 50 mg' },
        { name: 'Muron Oint 2% 10 gm' },
        { name: 'Mycofree Cream 1% 15 gm' },
        { name: 'Mycofree Tab 250 mg' },
        { name: 'Mydipin Tab 10 mg' },
        { name: 'Mydipin Tab 5 mg' },
        { name: 'Mylastin Tab 20 mg' },
        { name: 'Napsec Tab 375 mg' },
        { name: 'Napsec Tab 500 mg' },
        { name: 'Nebifast Tab 2.5 mg' },
        { name: 'Nebifast Tab 5 mg' },
        { name: 'Neuropen Tab 300 mg' },
        { name: 'Nidocard Retard Tab 2.6 mg' },
        { name: 'Nidocard Retard Tab 6.4 mg' },
        { name: 'Nidocard Spray' },
        { name: 'Nifecap Cap 10 mg' },
        { name: 'Nofenac Tab 100 mg' },
        { name: 'Nomosic Tab 50 mg' },
        { name: 'Nopain Tab 25 mg' },
        { name: 'Nopain Tab 50 mg' },
        { name: 'Novirax Tab 400 mg' },
        { name: 'Oflacin Tab 200 mg' },
        { name: 'Oflacin Tab 400 mg' },
        { name: 'Olmetic Plus Tab 20 mg' },
        { name: 'Olmetic Tab 20 mg' },
        { name: 'OMG-3 Cap 1000 mg' },
        { name: 'Oramet Tab 500 mg' },
        { name: 'Oramet Tab 850 mg' },
        { name: 'Oramet-SR Tab 1000 mg' },
        { name: 'Oramet-SR Tab 500 mg' },
        { name: 'Ornid Tab 500 mg' },
        { name: 'Padi-D OS 15 ml' },
        { name: 'Pair Tab 10 mg' },
        { name: 'Pansec Tab 20 mg' },
        { name: 'Pansec Tab 40 mg' },
        { name: 'Paridon Suspension 100 ml' },
        { name: 'Paridon Tab 10 mg' },
        { name: 'Prelin Cap 25 mg' },
        { name: 'Prelin Cap 50 mg' },
        { name: 'Prelin Cap 75 mg' },
        { name: 'Primacap Cap 1000 mg' },
        { name: 'Primacap Cap 500 mg' },
        { name: 'Prolacto Cap 4 billion' },
        { name: 'Pronex Cap 20 mg' },
        { name: 'Pronex Cap 40 mg' },
        { name: 'Pronex Tab 20 mg' },
        { name: 'Pronex Tab 40 mg' },
        { name: 'Pronex-MUPS Tab 20 mg' },
        { name: 'Pronex-MUPS Tab 40 mg' },
        { name: 'Prostam Cap 0.4 mg' },
        { name: 'Rabesec Tab 20 mg' },
        { name: 'Ramicard Tab 1.25 mg' },
        { name: 'Ramicard Tab 2.5 mg' },
        { name: 'Ramicard Tab 5 mg' },
        { name: 'Ratinol Forte Cap 50000 IU' },
        { name: 'Relitch Rectal Oint 15 mg' },
        { name: 'Resco Tab 1 mg' },
        { name: 'Resco Tab 2 mg' },
        { name: 'Rhinocort Nasal Spray' },
        { name: 'Rostatin Tab 10 mg' },
        { name: 'Rostatin Tab 20 mg' },
        { name: 'Rostatin Tab 5 mg' },
        { name: 'Seacal-D Tab 500 mg' },
        { name: 'Seacal-DX Tab 600 mg' },
        { name: 'Semecon Pediatric Drop 20 ml' },
        { name: 'Sertal Tab 25 mg' },
        { name: 'Sertal Tab 50 mg' },
        { name: 'Silofast Cap 4 mg' },
        { name: 'Silofast Cap 8 mg' },
        { name: 'Sliptin Tab 25 mg' },
        { name: 'Sliptin Tab 50 mg' },
        { name: 'Sliptin-M ER Tab 1000 mg' },
        { name: 'Sliptin-M ER Tab 500 mg' },
        { name: 'Sliptin-M Tab 1000 mg' },
        { name: 'Sliptin-M Tab 500 mg' },
        { name: 'Sparonex Tab 200 mg' },
        { name: 'Spirucap Cap 500 mg' },
        { name: 'SPLAC OS 100 ml' },
        { name: 'SPLAC Tab 10 mg' },
        { name: 'Sudac Tab 100 mg' },
        { name: 'Sudac Tab 200 mg' },
        { name: 'Supra-B Tab' },
        { name: 'Supra-Z Syp 100 ml' },
        { name: 'Supracod Syp' },
        { name: 'Supravit-G Cap' },
        { name: 'Supravit-M Cap' },
        { name: 'Supravit-PN Cap' },
        { name: 'Supravit-S Cap' },
        { name: 'T-Cef Cap 200 mg' },
        { name: 'T-Cef Cap 400 mg' },
        { name: 'T-Cef DS Suspension 50 ml' },
        { name: 'T-Cef Pediatric Drop 21 ml' },
        { name: 'T-Cef Pediatric Drop 50 ml' },
        { name: 'T-Cef Suspension 30 ml' },
        { name: 'T-Fovir Tab 300 mg' },
        { name: 'Telmicard 5/40 Tab' },
        { name: 'Telmicard 5/80 Tab' },
        { name: 'Telmicard Tab 40 mg' },
        { name: 'Telmicard Tab 80 mg' },
        { name: 'Tenobis Plus Tab 2.5 mg' },
        { name: 'Tenobis Plus Tab 5 mg' },
        { name: 'Tenobis Tab 2.5 mg' },
        { name: 'Tenobis Tab 5 mg' },
        { name: 'Tenobis-A Tab 2.5 mg' },
        { name: 'Texa Eye Drop 5 ml' },
        { name: 'Theovent-SR Tab 300 mg' },
        { name: 'Thyvy Syp 100 ml' },
        { name: 'Tifal Syp 100 ml' },
        { name: 'Tiga Tab 90 mg' },
        { name: 'Tocit Tab 5 mg' },
        { name: 'Tocit XR Tab 11 mg' },
        { name: 'Trialon Cream 0.1% 10 gm' },
        { name: 'Trialon Inj 40 ml' },
        { name: 'Trialon Nasal Spray' },
        { name: 'Trialon Oral Paste 0.1% 10 gm' },
        { name: 'Trimet-MR Tab 35 mg' },
        { name: 'Ursolic Tab 150 mg' },
        { name: 'Ursolic Tab 300 mg' },
        { name: 'Venocid Tab 10 mg' },
        { name: 'Venocid Tab 20 mg' },
        { name: 'Ventil Inhaler' },
        { name: 'Ventil Plus Inhaler' },
        { name: 'Visonium Tab 50 mg' },
        { name: 'Vorizol Tab 200 mg' },
        { name: 'Vorizol Tab 50 mg' },
        { name: 'Ziton Syp 100 ml' }
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

export default DrugInternational;
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
        { name: 'Acepril Tablet 10 mg' },
        { name: 'Acepril Tablet 5 mg' },
        { name: 'Acetor Tablet 25 mg' },
        { name: 'Albasine Tablet 30 mg' },
        { name: 'Amlocard Tablet 5 mg' },
        { name: 'Amlocard Tablet 10 mg' },
        { name: 'Amlocard Plus Tablet 25 mg' },
        { name: 'Amlocard Plus Tablet 50 mg' },
        { name: 'Angicard Tablet 0.5 mg' },
        { name: 'Apit Tablet 160 mg' },
        { name: 'Apit Tablet 40 mg' },
        { name: 'Apit Suspension 200 mg' },
        { name: 'Aslor Tablet 5 mg' },
        { name: 'Asta King Capsule 2 mg' },
        { name: 'Asta King Capsule 4 mg' },
        { name: 'Azimex Tablet 250 mg' },
        { name: 'Azimex Tablet 500 mg' },
        { name: 'Azimex Suspension 15 ml' },
        { name: 'Azimex Syp 30 ml' },
        { name: 'Azimex Syp 50 ml' },
        { name: 'Bacmax Tablet 10 mg' },
        { name: 'Bacmax Tablet 5 mg' },
        { name: 'Benzac Cream 4% 15 gm' },
        { name: 'Betaloc Tablet 50 mg' },
        { name: 'Betaloc Tablet 25 mg' },
        { name: 'Betaloc-XR Tablet 100 mg' },
        { name: 'Betaloc-XR Tablet 50 mg' },
        { name: 'Betavate-CL Ointment 10 gm' },
        { name: 'Betavate-N Cream 10 gm' },
        { name: 'Biloba Capsule 60 mg' },
        { name: 'Bufen-SR Capsule 300 mg' },
        { name: 'Butibac Capsule 400 mg' },
        { name: 'Butibac Suspension 60 ml' },
        { name: 'Caldil-OT Tablet 400 mg' },
        { name: 'Caldil-Plus Tablet 500 mg' },
        { name: 'Camiton Tablet 5 mg' },
        { name: 'Cardiron Tablet 200 mg' },
        { name: 'Cardizem Tablet 30 mg' },
        { name: 'Cardizem Tablet 60 mg' },
        { name: 'Cardizem SR Tablet 90 mg' },
        { name: 'Cardizem SR Tablet 120 mg' },
        { name: 'Champion Cream 15 gm' },
        { name: 'Ciprocort 10 ml' },
        { name: 'Ciprozid Suspension 60 ml' },
        { name: 'Ciprozid-DS Tablet 500 mg' },
        { name: 'Clarin Tablet 500 mg' },
        { name: 'Clarin Tablet 250 mg' },
        { name: 'Clavuran Tablet 100 mg' },
        { name: 'Clavuran Tablet 200 mg' },
        { name: 'Clopid Tablet 75 mg' },
        { name: 'Clopid-AS Tablet 75 mg' },
        { name: 'Cod Liver Oil Capsule' },
        { name: 'Combomax Capsule' },
        { name: 'Cosec Capsule 20 mg' },
        { name: 'Cosec Capsule 40 mg' },
        { name: 'Cosec-MUPS Tablet 20 mg' },
        { name: 'Cosec-MUPS Tablet 40 mg' },
        { name: 'D-Cap Capsule 40000 IU' },
        { name: 'D-Cap Capsule 20000 IU' },
        { name: 'D-Cap Capsule 800 IU' },
        { name: 'D-Cap Capsule 2000 IU' },
        { name: 'D-Cap Capsule 1000 IU' },
        { name: 'D-Dopa Tablet 110 mg' },
        { name: 'D-Fen Tablet 0.5 mg' },
        { name: 'D-Fen Tablet 1.5 mg' },
        { name: 'D-Sefa Capsule 500 mg' },
        { name: 'D-Toin Tablet 100 mg' },
        { name: 'Dalatic Capsule 300 mg' },
        { name: 'Demoxiclave Suspension 100 ml' },
        { name: 'Demoxiclave Tablet 500 mg' },
        { name: 'Demoxiclave Tablet 250 mg' },
        { name: 'Demoxiclave Tablet 875 mg' },
        { name: 'Demoxil Capsule 500 mg' },
        { name: 'Depomed Tablet 8 mg' },
        { name: 'Devas Syrup 100 ml' },
        { name: 'Dezco Tablet 6 mg' },
        { name: 'Dialiptin Tablet 50 mg' },
        { name: 'Dialiptin-M Tablet 500 mg' },
        { name: 'Dialiptin-M Tablet 850 mg' },
        { name: 'Dicaltrol Capsule' },
        { name: 'Dicaltrol Plus Tablet' },
        { name: 'Dicef Capsule 500 mg' },
        { name: 'Dicef Capsule 250 mg' },
        { name: 'Diconten Tablet' },
        { name: 'Dicot Cream 1% 10 gm' },
        { name: 'Difans Syrup 100 ml' },
        { name: 'Dimerol Tablet 80 mg' },
        { name: 'Dimerol MR Tablet 30 mg' },
        { name: 'Dimerol MR Tablet 60 mg' },
        { name: 'Dipa Tablet 10 mg' },
        { name: 'Diproxen Tablet 500 mg' },
        { name: 'Diproxen CR Tablet 500 mg' },
        { name: 'Diretic Tablet 20 mg' },
        { name: 'Diretic-DS Tablet 40 mg' },
        { name: 'Disartan Tablet 40 mg' },
        { name: 'Disartan Tablet 20 mg' },
        { name: 'Divastin Tablet 40 mg' },
        { name: 'Divastin Tablet 20 mg' },
        { name: 'Divastin Tablet 10 mg' },
        { name: 'Dlac Oral Solution 100 ml' },
        { name: 'Dlac Oral Solution 200 ml' },
        { name: 'Doxoma Tablet 400 mg' },
        { name: 'Doxoma Tablet 200 mg' },
        { name: 'Doxoma Syrup 100 ml' },
        { name: 'Dsec Capsule 30 mg' },
        { name: 'Dsec Capsule 60 mg' },
        { name: 'Dutamax Capsule 0.5 mg' },
        { name: 'E-Cap Capsule 600 IU' },
        { name: 'E-Cap Capsule 200 IU' },
        { name: 'E-Cap Capsule 400 IU' },
        { name: 'E-Cap Plus Capsule 250 mg' },
        { name: 'Emparol Tablet 25 mg' },
        { name: 'Emparol Tablet 10 mg' },
        { name: 'Emparol-L Tablet 10 mg' },
        { name: 'Emparol-M Tablet 500 mg' },
        { name: 'Entavir Tablet 1 mg' },
        { name: 'Entavir Tablet 0.5 mg' },
        { name: 'F-Son Nasal Spray' },
        { name: 'Famotid Tablet 20 mg' },
        { name: 'Famotid Suspension 40 mg' },
        { name: 'Famotid Tablet 40 mg' },
        { name: 'Faxan Tablet 550 mg' },
        { name: 'Faxan Tablet 200 mg' },
        { name: 'Fenat Eye Drop 5 ml' },
        { name: 'Fenat Tablet 1 mg' },
        { name: 'Fenat Syrup 100 ml' },
        { name: 'Fenatrol Tablet 145 mg' },
        { name: 'Ferozi Capsule 150 mg' },
        { name: 'Ferozi-CI Capsule 50 mg' },
        { name: 'Fexofast Tablet 120 mg' },
        { name: 'Fexofast Tablet 180 mg' },
        { name: 'Fexofast Suspension 30 mg 50 ml' },
        { name: 'Floxalone Tablet 400 mg' },
        { name: 'Floxalone Eye Drop 0.5% 5 ml' },
        { name: 'Floxalone-DX Eye Drop 5 ml' },
        { name: 'Flunac Suspension 50 mg 35 ml' },
        { name: 'Flunac Capsule 150 mg' },
        { name: 'Flunac Capsule 50 mg' },
        { name: 'Flupen Capsule 250 mg' },
        { name: 'Flupen Suspension 125 mg' },
        { name: 'Flupen Capsule 500 mg' },
        { name: 'Foly Tablet 5 mg' },
        { name: 'Foly Tablet 15 mg' },
        { name: 'Fuclav Tablet 500 mg' },
        { name: 'Fuclav Tablet 250 mg' },
        { name: 'Fuclav Tablet 125 mg' },
        { name: 'Fuclav Suspension 70 ml' },
        { name: 'Furex Tablet 250 mg' },
        { name: 'Furex Tablet 500 mg' },
        { name: 'Furex Suspension 125 mg 70 ml' },
        { name: 'Fusibac-H Cream 10 gm' },
        { name: 'Gavinor Suspension' },
        { name: 'Gelcin Tablet 320 mg' },
        { name: 'Glucotin Max Tablet 750 mg' },
        { name: 'Glucotin Plus Tablet 250 mg' },
        { name: 'Gynomix VS' },
        { name: 'Hepanor Capsule 70 mg' },
        { name: 'Hepanor Capsule 140 mg' },
        { name: 'Indapa-SR Tablet 1.5 mg' },
        { name: 'Leroid Tablet 50 mg' },
        { name: 'Letrozol Tablet 2.5 mg' },
        { name: 'Levoflox Tablet 500 mg' },
        { name: 'Levoflox Tablet 750 mg' },
        { name: 'Levoflox Eye Drop 0.5% 5 ml' },
        { name: 'Licerin Cream 5% 15 gm' },
        { name: 'Limpet Tablet 1 mg' },
        { name: 'Limpet Tablet 2 mg' },
        { name: 'Limpet Tablet 3 mg' },
        { name: 'Limpet Tablet 4 mg' },
        { name: 'Limpet-M Tablet 2 mg' },
        { name: 'Limpet-M Tablet 1 mg' },
        { name: 'Linarol Tablet 5 mg' },
        { name: 'Linarol-M Tablet 500 mg' },
        { name: 'Linarol-M Tablet 850 mg' },
        { name: 'Linarol-M Tablet 1000 mg' },
        { name: 'Lorat Tablet 10 mg' },
        { name: 'Losardil Tablet 25 mg' },
        { name: 'Losardil Tablet 50 mg' },
        { name: 'Losardil Tablet 100 mg' },
        { name: 'Losardil 100/12.5 Tablet' },
        { name: 'Losardil 100/25 Tablet' },
        { name: 'Losardil 25/12.5 Tablet' },
        { name: 'Losardil 50/12.5 Tablet' },
        { name: 'Luzoca Cream 1% 10 gm' },
        { name: 'M-Kast Tablet 10 mg' },
        { name: 'M-Kast Tablet 4 mg' },
        { name: 'M-Kast Tablet 5 mg' },
        { name: 'M-Son Nasal Spray' },
        { name: 'Madhuvas Syrup 100 ml' },
        { name: 'Magolin Tablet 5 mg' },
        { name: 'Mecolin Tablet 500 mg' },
        { name: 'Meth Tablet 10 mg' },
        { name: 'Meverine SR Capsule 200 mg' },
        { name: 'Meverine Tablet 135 mg' },
        { name: 'Micoderm Cream 10 gm' },
        { name: 'Micoderm Oral Gel 15 gm' },
        { name: 'Micoderm-HC Cream 10 gm' },
        { name: 'Migon Tablet 10 mg' },
        { name: 'Migon Tablet 5 mg' },
        { name: 'Miotrol Tablet 2.5 mg' },
        { name: 'Monocard-SR Capsule 50 mg' },
        { name: 'Muron Ointment 2% 10 gm' },
        { name: 'Mycofree Cream 1% 15 gm' },
        { name: 'Mycofree Tablet 250 mg' },
        { name: 'Mydipin Tablet 10 mg' },
        { name: 'Mydipin Tablet 5 mg' },
        { name: 'Mylastin Tablet 20 mg' },
        { name: 'Napsec Tablet 375 mg' },
        { name: 'Napsec Tablet 500 mg' },
        { name: 'Nebifast Tablet 2.5 mg' },
        { name: 'Nebifast Tablet 5 mg' },
        { name: 'Neuropen Tablet 300 mg' },
        { name: 'Nidocard Retard Tablet 2.6 mg' },
        { name: 'Nidocard Retard Tablet 6.4 mg' },
        { name: 'Nidocard Spray' },
        { name: 'Nifecap Capsule 10 mg' },
        { name: 'Nofenac Tablet 100 mg' },
        { name: 'Nomosic Tablet 50 mg' },
        { name: 'Nopain Tablet 25 mg' },
        { name: 'Nopain Tablet 50 mg' },
        { name: 'Novirax Tablet 400 mg' },
        { name: 'Oflacin Tablet 200 mg' },
        { name: 'Oflacin Tablet 400 mg' },
        { name: 'Olmetic Plus Tablet 20 mg' },
        { name: 'Olmetic Tablet 20 mg' },
        { name: 'OMG-3 Capsule 1000 mg' },
        { name: 'Oramet Tablet 500 mg' },
        { name: 'Oramet Tablet 850 mg' },
        { name: 'Oramet-SR Tablet 1000 mg' },
        { name: 'Oramet-SR Tablet 500 mg' },
        { name: 'Ornid Tablet 500 mg' },
        { name: 'Padi-D Oral Solution 15 ml' },
        { name: 'Pair Tablet 10 mg' },
        { name: 'Pansec Tablet 20 mg' },
        { name: 'Pansec Tablet 40 mg' },
        { name: 'Paridon Suspension 5 mg 100 ml' },
        { name: 'Paridon Tablet 10 mg' },
        { name: 'Prelin Capsule 25 mg' },
        { name: 'Prelin Capsule 50 mg' },
        { name: 'Prelin Capsule 75 mg' },
        { name: 'Primacap Capsule 1000 mg' },
        { name: 'Primacap Capsule 500 mg' },
        { name: 'Prolacto Capsule 4 billion' },
        { name: 'Pronex Capsule 20 mg' },
        { name: 'Pronex Capsule 40 mg' },
        { name: 'Pronex Tablet 20 mg' },
        { name: 'Pronex Tablet 40 mg' },
        { name: 'Pronex-MUPS Tablet 20 mg' },
        { name: 'Pronex-MUPS Tablet 40 mg' },
        { name: 'Prostam Capsule 0.4 mg' },
        { name: 'Rabesec Tablet 20 mg' },
        { name: 'Ramicard Tablet 1.25 mg' },
        { name: 'Ramicard Tablet 2.5 mg' },
        { name: 'Ramicard Tablet 5 mg' },
        { name: 'Ratinol Forte Capsule 50000 IU' },
        { name: 'Relitch Rectal Ointment 15 mg' },
        { name: 'Resco Tablet 1 mg' },
        { name: 'Resco Tablet 2 mg' },
        { name: 'Rhinocort Nasal Spray' },
        { name: 'Rostatin Tablet 10 mg' },
        { name: 'Rostatin Tablet 20 mg' },
        { name: 'Rostatin Tablet 5 mg' },
        { name: 'Seacal-D Tablet 500 mg' },
        { name: 'Seacal-DX Tablet 600 mg' },
        { name: 'Semecon Pediatric Drop 20 ml' },
        { name: 'Sertal Tablet 25 mg' },
        { name: 'Sertal Tablet 50 mg' },
        { name: 'Silofast Capsule 4 mg' },
        { name: 'Silofast Capsule 8 mg' },
        { name: 'Sliptin Tablet 25 mg' },
        { name: 'Sliptin Tablet 50 mg' },
        { name: 'Sliptin-M ER Tablet 1000 mg' },
        { name: 'Sliptin-M ER Tablet 500 mg' },
        { name: 'Sliptin-M Tablet 1000 mg' },
        { name: 'Sliptin-M Tablet 500 mg' },
        { name: 'Sparonex Tablet 200 mg' },
        { name: 'Spirucap Capsule 500 mg' },
        { name: 'SPLAC Oral Solution 100 ml' },
        { name: 'SPLAC Tablet 10 mg' },
        { name: 'Sudac Tablet 100 mg' },
        { name: 'Sudac Tablet 200 mg' },
        { name: 'Supra-B Tablet' },
        { name: 'Supra-Z Syrup 100 ml' },
        { name: 'Supracod Syrup' },
        { name: 'Supravit-G Capsule' },
        { name: 'Supravit-M Capsule' },
        { name: 'Supravit-PN Capsule' },
        { name: 'Supravit-S Capsule' },
        { name: 'T-Cef Capsule 200 mg' },
        { name: 'T-Cef Capsule 400 mg' },
        { name: 'T-Cef DS Suspension 200 mg 50 ml' },
        { name: 'T-Cef Pediatric Drop 21 ml' },
        { name: 'T-Cef Pediatric Drop 50 ml' },
        { name: 'T-Cef Suspension 30 ml' },
        { name: 'T-Fovir Tablet 300 mg' },
        { name: 'Telmicard 5/40 Tablet' },
        { name: 'Telmicard 5/80 Tablet' },
        { name: 'Telmicard Tablet 40 mg' },
        { name: 'Telmicard Tablet 80 mg' },
        { name: 'Tenobis Plus Tablet 2.5 mg' },
        { name: 'Tenobis Plus Tablet 5 mg' },
        { name: 'Tenobis Tablet 2.5 mg' },
        { name: 'Tenobis Tablet 5 mg' },
        { name: 'Tenobis-A Tablet 2.5 mg' },
        { name: 'Texa Eye Drop 5 ml' },
        { name: 'Theovent-SR Tablet 300 mg' },
        { name: 'Thyvy Syrup 100 ml' },
        { name: 'Tifal Syrup 100 ml' },
        { name: 'Tiga Tablet 90 mg' },
        { name: 'Tocit Tablet 5 mg' },
        { name: 'Tocit XR Tablet 11 mg' },
        { name: 'Trialon Cream 0.1% 10 gm' },
        { name: 'Trialon Injection 40 ml' },
        { name: 'Trialon Nasal Spray' },
        { name: 'Trialon Oral Paste 0.1% 10 gm' },
        { name: 'Trimet-MR Tablet 35 mg' },
        { name: 'Ursolic Tablet 150 mg' },
        { name: 'Ursolic Tablet 300 mg' },
        { name: 'Venocid Tablet 10 mg' },
        { name: 'Venocid Tablet 20 mg' },
        { name: 'Ventil Inhaler' },
        { name: 'Ventil Plus Inhaler' },
        { name: 'Visonium Tablet 50 mg' },
        { name: 'Vorizol Tablet 200 mg' },
        { name: 'Vorizol Tablet 50 mg' },
        { name: 'Ziton Syrup 100 ml' }
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

export default DrugInternational;
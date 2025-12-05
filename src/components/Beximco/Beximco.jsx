import { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Beximco = () => {
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
        doc.text("Beximco Pharmaceuticals Ltd", 10, yPosition);
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

        doc.save('Beximco.pdf');
    };

    // Sort items alphabetically
    const items = [
        { name: 'Acifix Cap 20 mg' },
        { name: 'Acifix Tab 20 mg' },
        { name: 'Amdocal Tab 2.5 mg' },
        { name: 'Amdocal Tab 5 mg' },
        { name: 'Amdocal Tab 10 mg' },
        { name: 'Amdocal Plus Tab 25 mg' },
        { name: 'Amdocal Plus Tab 50 mg' },
        { name: 'Amdocal Pro Tab' },
        { name: 'Anustat Oint' },
        { name: 'Aristocal D Tab 500 mg' },
        { name: 'Aristoplex Syp 100 ml' },
        { name: 'Aristoplex Syp 200 ml' },
        { name: 'Aristovit B Tab' },
        { name: 'Aristovit M Tab' },
        { name: 'Arlin Tab 400 mg' },
        { name: 'Arlin Suspension 100 mg' },
        { name: 'Arlin Tab 600 mg' },
        { name: 'Atova Tab 40 mg' },
        { name: 'Atova Tab 20 mg' },
        { name: 'Atova Tab 10 mg' },
        { name: 'Atova EZ Tab 10/10 mg' },
        { name: 'Atova EZ Tab 20/10 mg' },
        { name: 'Atrizin Tab 10 mg' },
        { name: 'Atrizin Syp 60 ml' },
        { name: 'Atrizin Pediatric Drop 15 ml' },
        { name: 'Axodin Suspension 50 ml' },
        { name: 'Axodin Tab 180 mg' },
        { name: 'Axodin Tab 120 mg' },
        { name: 'Azithrocin Tab 500 mg' },
        { name: 'Azithrocin Suspension 15 ml' },
        { name: 'Azithrocin Suspension 30 ml' },
        { name: 'Azithrocin Suspension 50 ml' },
        { name: 'Azmasol Inhaler' },
        { name: 'Azmasol Refill' },
        { name: 'Azmasol Inhalation Cap 200 mg' },
        { name: 'Azmasol Plus Inhaler' },
        { name: 'Bactrobex Oint 2%' },
        { name: 'Becoral D Tab 500 mg' },
        { name: 'Becoral DX Tab 600 mg' },
        { name: 'Betapro Tab 2.5 mg' },
        { name: 'Betapro Tab 5 mg' },
        { name: 'Bexidal Tab 50 mg' },
        { name: 'Bexihaler Inhaler' },
        { name: 'Bexitrol F Inhaler 250 mg 120 Puff' },
        { name: 'Bexitrol F Inhalation Cap 250 mg' },
        { name: 'Bexitrol F Inhalation Cap 500 mg' },
        { name: 'Bexitrol F Inhalation Cap 100 mg' },
        { name: 'Bexitrol F Inhaler 250 mg 60 Puff' },
        { name: 'Bexitrol F Inhaler 125 mg' },
        { name: 'Bextram Gold 15 Tab' },
        { name: 'Bextram Gold 30 Tab' },
        { name: 'Bextram Kids Syp' },
        { name: 'Bextram Silver Tab' },
        { name: 'Bilexa Inhalation Cap 200 mg' },
        { name: 'Bilexa Inhalation Cap 100 mg' },
        { name: 'Billi Tab 20 mg' },
        { name: 'Billi OS' },
        { name: 'Billi Meltab Tab 10 mg' },
        { name: 'Bizoran Tab 5/40 mg' },
        { name: 'Bizoran Tab 5/20 mg' },
        { name: 'Bizoran Tab 10/20 mg' },
        { name: 'Bizoran Tab 10/40 mg' },
        { name: 'Bronkolax Syp' },
        { name: 'Buflex Tab 500 mg' },
        { name: 'Buflex Tab 1000 mg' },
        { name: 'Buflex Tab 750 mg' },
        { name: 'Buratuss Syp' },
        { name: 'Buratuss Pediatric Drop 5 mg' },
        { name: 'Burnsil Cream 1%' },
        { name: 'Calorate Tab 400 mg' },
        { name: 'Calorate Tab 740 mg' },
        { name: 'Calorate Kit Tab 400 mg' },
        { name: 'Candoral Oral Gel 2%' },
        { name: 'Cardocal Tab 5 mg' },
        { name: 'Cardocal Tab 10 mg' },
        { name: 'Carnovas Tab 10 mg' },
        { name: 'Carnovas Tab 5 mg' },
        { name: 'Carnovas Tab 2.5 mg' },
        { name: 'Carnovas HZ Tab 5 mg' },
        { name: 'Cibrate Tab 100 mg' },
        { name: 'Citicol Tab 500 mg' },
        { name: 'Cosmotrin Cream 0.025%' },
        { name: 'D-Rise Cap 20000 IU' },
        { name: 'D-Rise Tab 2000 IU' },
        { name: 'D-Rise Chewable Tab 1000 IU' },
        { name: 'D-Rise Cap 40000 IU' },
        { name: 'D-Rise Cap 50000 IU' },
        { name: 'D-Rise OS 2000 IU' },
        { name: 'D-Rise Injection 200000 IU' },
        { name: 'Decomit Nasal Spray 50 mg' },
        { name: 'Decomit Inhaler 100 mg' },
        { name: 'Decomit Inhaler 50 mg' },
        { name: 'Deflux Tab 10 mg' },
        { name: 'Deflux Pediatric Drop 5 mg' },
        { name: 'Deflux Suspension 5 mg' },
        { name: 'Deflux Meltab Tab 10 mg' },
        { name: 'Dextrim Syp 20 mg' },
        { name: 'Dextromethorphan Syp 10 mg' },
        { name: 'Diactin Tab 5 mg' },
        { name: 'Diapro Tab 80 mg' },
        { name: 'Diapro MR Tab 30 mg' },
        { name: 'Diapro MR Tab 60 mg' },
        { name: 'Diaryl Tab 1 mg' },
        { name: 'Diaryl Tab 2 mg' },
        { name: 'Diaryl Tab 3 mg' },
        { name: 'Digecid Suspension' },
        { name: 'Dilapress Tab 6.25 mg' },
        { name: 'Dinovo Tab 375 mg' },
        { name: 'Dinovo Tab 500 mg' },
        { name: 'Duvent Tab 10 mg' },
        { name: 'Duvent OS' },
        { name: 'Dynase Nasal Spray' },
        { name: 'Ecotrim Cream' },
        { name: 'Emijoy Tab 12.5 mg' },
        { name: 'Emijoy DS Tab 25 mg' },
        { name: 'Empalina Tab 10/5 mg' },
        { name: 'Empalina Tab 25/5 mg' },
        { name: 'Enaril Tab 5 mg' },
        { name: 'Evo Tab 500 mg' },
        { name: 'Exovate Cream' },
        { name: 'Exovate Oint' },
        { name: 'Exovate N Oint' },
        { name: 'Exovate N Cream' },
        { name: 'Famomax Tab 20 mg' },
        { name: 'Famomax Suspension 40 mg' },
        { name: 'Famomax Tab 40 mg' },
        { name: 'Femzole Tab 2.5 mg' },
        { name: 'Filmet Tab 200 mg' },
        { name: 'Filmet Tab 400 mg' },
        { name: 'Filmet Suspension' },
        { name: 'Fixolin Tab 200 mg' },
        { name: 'Fixolin Tab 400 mg' },
        { name: 'Fixonase Nasal Spray' },
        { name: 'Flatameal DS Suspension' },
        { name: 'Flomyst F Inhaler 10/250 mg' },
        { name: 'Flomyst F Inhaler 5/125 mg' },
        { name: 'Flubex Suspension 125 mg' },
        { name: 'Flubex Cap 500 mg' },
        { name: 'Flubex Cap 250 mg' },
        { name: 'Fosamin Powder' },
        { name: 'Frelax Emulsion' },
        { name: 'Frenxit Tab' },
        { name: 'Fungistin Suspension' },
        { name: 'Gastalfet Suspension' },
        { name: 'Gastalfet Tab 500 mg' },
        { name: 'Glipita Tab 100 mg' },
        { name: 'Glipita Tab 50 mg' },
        { name: 'Glipita M XR Tab 500 mg' },
        { name: 'Glipita M XR Tab 1000 mg' },
        { name: 'Glipita-M Tab 500 mg' },
        { name: 'Glipita-M Tab 1000 mg' },
        { name: 'Glyriva Inhalation Cap' },
        { name: 'Hemofix FZ Tab' },
        { name: 'Icykool Max Cream' },
        { name: 'Indelix SR Tab 1.5 mg' },
        { name: 'Informet Tab 850 mg' },
        { name: 'Informet Tab 500 mg' },
        { name: 'Informet XR Tab 500 mg' },
        { name: 'Intracef Cap 500 mg' },
        { name: 'Iprasol Inhaler' },
        { name: 'Iprasol Refill' },
        { name: 'Jardian Tab 25 mg' },
        { name: 'Jardian Tab 10 mg' },
        { name: 'Jardimet Tab 500 mg' },
        { name: 'Jointec Max Tab' },
        { name: 'Jointec Pro Tab' },
        { name: 'Laxjoy Syp' },
        { name: 'Laxjoy Tab 10 mg' },
        { name: 'Labeta Tab 200 mg' },
        { name: 'Lulexa Cream 10 gm' },
        { name: 'Lulexa Cream 20 gm' },
        { name: 'Melato Tab 3 mg' },
        { name: 'Melphin Suspension 50 mg' },
        { name: 'Metazine MR Tab 35 mg' },
        { name: 'Midita Tab 50 mg' },
        { name: 'Midita Tab 100 mg' },
        { name: 'Mirasol XR Tab 25 mg' },
        { name: 'Mirasol XR Tab 50 mg' },
        { name: 'Momento Tab 5 mg' },
        { name: 'Momvit Tab' },
        { name: 'Monocast Tab 10 mg' },
        { name: 'Monocast Chewable Tab 4 mg' },
        { name: 'Monocast Chewable Tab 5 mg' },
        { name: 'Mopride Tab 1 mg' },
        { name: 'Mopride Tab 2 mg' },
        { name: 'Mucomist DT Tab' },
        { name: 'Mucosol Syp' },
        { name: 'Mucosol Pediatric Drop' },
        { name: 'Napa Tab' },
        { name: 'Napa Pediatric Drop' },
        { name: 'Napa Suppository 125 mg' },
        { name: 'Napa Suppository 250 mg' },
        { name: 'Napa Suppository 500 mg' },
        { name: 'Napa Syp' },
        { name: 'Napa Extend Tab' },
        { name: 'Napa Extra Tab' },
        { name: 'Napa One Tab' },
        { name: 'Napa Rapid Tab' },
        { name: 'NapaDol Tab' },
        { name: 'Neodrop Pediatric Drop' },
        { name: 'Neofloxin Eye Drop' },
        { name: 'Neofloxin Tab 500 mg' },
        { name: 'Neofloxin Suspension' },
        { name: 'Neofloxin-D Eye Drop' },
        { name: 'Neopem Tab 150 mg' },
        { name: 'Neopem Tab 200 mg' },
        { name: 'Neosten Cream 20 gm' },
        { name: 'Neosten HC Cream 10 gm' },
        { name: 'Neosten HC Cream 20 gm' },
        { name: 'Neosten VT 200 mg' },
        { name: 'Nervalin Cap 50 mg' },
        { name: 'Nervalin Cap 75 mg' },
        { name: 'Nervalin Cap 25 mg' },
        { name: 'Nervalin CR Tab 330 mg' },
        { name: 'Nervalin CR Tab 82.5 mg' },
        { name: 'Nervalin CR Tab 165 mg' },
        { name: 'Neurocare Tab' },
        { name: 'Nevalto Tab' },
        { name: 'Nitrosol Spray' },
        { name: 'Nitrosol SR Tab 2.6 mg' },
        { name: 'Numira Tab 2.5 mg' },
        { name: 'Numira Tab 5 mg' },
        { name: 'Numira Tab 10 mg' },
        { name: 'N-Max Tab' },
        { name: 'Odrel Tab' },
        { name: 'Odrel Plus Tab' },
        { name: 'Odycin Eye Drop 0.5%' },
        { name: 'Odycin Tab 400 mg' },
        { name: 'Olmesan Tab 20 mg' },
        { name: 'Olmesan Tab 40 mg' },
        { name: 'Olmesan Tab 10 mg' },
        { name: 'Olmesan Plus Tab 20 mg' },
        { name: 'Olopan Eye Drop 0.1%' },
        { name: 'Olopan DS Eye Drop 0.2%' },
        { name: 'Olopan Pro Eye Drop 0.7%' },
        { name: 'Omastin Cap 50 mg' },
        { name: 'Omastin Cap 150 mg' },
        { name: 'Omastin Cap 200 mg' },
        { name: 'Omastin Suspension 50 mg' },
        { name: 'Onriva Inhalation Cap 75 mg' },
        { name: 'Onriva Inhalation Cap 150 mg' },
        { name: 'Onriva Plus Inhalation Cap 110 mg' },
        { name: 'Opanac Suspension 0.1%' },
        { name: 'Opanac TS Suspension 0.3%' },
        { name: 'Opton Tab 20 mg' },
        { name: 'Opton Tab 40 mg' },
        { name: 'Opton Cap 20 mg' },
        { name: 'Opton Cap 40 mg' },
        { name: 'Pacet Tab 200 mg' },
        { name: 'Pantobex Tab 20 mg' },
        { name: 'Pantobex Tab 40 mg' },
        { name: 'Pedeamin Syp 10 mg' },
        { name: 'Proceptin Cap 20 mg' },
        { name: 'Proceptin Cap 40 mg' },
        { name: 'Progavi Suspension' },
        { name: 'Prosan Tab 25 mg' },
        { name: 'Prosan Tab 50 mg' },
        { name: 'Prosan HZ Tab 50 mg' },
        { name: 'Q-Rash Oint' },
        { name: 'Recur Tab 1 mg' },
        { name: 'Relentus Tab 2 mg' },
        { name: 'REMMO Tab 20 mg' },
        { name: 'REMMO Tab 40 mg' },
        { name: 'Resolve Shampoo 2%' },
        { name: 'Rostil Tab 135 mg' },
        { name: 'Rostil SR Cap 200 mg' },
        { name: 'Rosutin Tab 5 mg' },
        { name: 'Rosutin Tab 10 mg' },
        { name: 'Rosutin Tab 20 mg' },
        { name: 'Rosutin Tab 10/5 mg' },
        { name: 'Rosutin Tab 10/20 mg' },
        { name: 'Suva I Tab' },
        { name: 'Symbion Inhalation Cap 100 mg' },
        { name: 'Symbion Inhalation Cap 200 mg' },
        { name: 'Symbion Inhaler 4.5/160 mg' },
        { name: 'Symbion Inhaler 4.5/80 mg' },
        { name: 'Tamona Tab 20 mg' },
        { name: 'Tearon Eye Drop' },
        { name: 'Tearon Fresh Eye Drop' },
        { name: 'Tearon PF Eye Drop' },
        { name: 'Telma Tab 80 mg' },
        { name: 'Telma Tab 40 mg' },
        { name: 'Telma Tab 20 mg' },
        { name: 'Telma Plus Tab 40/12.5 mg' },
        { name: 'Telmacal Tab 5/40 mg' },
        { name: 'Telmacal Tab 5/80 mg' },
        { name: 'Terbex Tab 250 mg' },
        { name: 'Terbex Cream 1%' },
        { name: 'Tigel Tab 90 mg' },
        { name: 'Tioriva Inhalation Cap 18 mg' },
        { name: 'Tofen Tab' },
        { name: 'Tofen Syp' },
        { name: 'Traneta Tab 5 mg' },
        { name: 'Traneta M Tab 500 mg' },
        { name: 'Traneta M Tab 850 mg' },
        { name: 'Traneta M Tab 1000 mg' },
        { name: 'Tribrez Inhaler' },
        { name: 'Triocim Cap 200 mg' },
        { name: 'Triocim Cap 400 mg' },
        { name: 'Triocim Suspension 100 mg 50 ml' },
        { name: 'Triocim Suspension 100 mg 30 ml' },
        { name: 'Triocim DS Suspension 200 mg' },
        { name: 'Turbocef Tab 250 mg' },
        { name: 'Turbocef Tab 500 mg' },
        { name: 'Turbocef Suspension 125 mg 70 ml' },
        { name: 'Turboclav Tab 250 mg' },
        { name: 'Turboclav Tab 500 mg' },
        { name: 'Tuspel Syp 100 ml' },
        { name: 'Tycil Cap 250 mg' },
        { name: 'Tycil Cap 500 mg' },
        { name: 'Tycil Suspension 125 mg' },
        { name: 'Tyclav Suspension' },
        { name: 'Tyclav Tab 1000 mg' },
        { name: 'Tyclav Tab 375 mg' },
        { name: 'Tyclav Tab 625 mg' },
        { name: 'Tyclav BID Suspension 50 ml' },
        { name: 'Tynisol Pediatric Drop 15 ml' },
        { name: 'Ural-K Oral Solution 200 ml' },
        { name: 'Urofi Cap 5 mg' },
        { name: 'Uroflo Cap 0.4 mg' },
        { name: 'Vibose Tab 0.2 mg' },
        { name: 'Vibose Tab 0.3 mg' },
        { name: 'Vintelix Tab 5 mg' },
        { name: 'Vintelix Tab 10 mg' },
        { name: 'Viscocid Suspension 200 ml' },
        { name: 'Vivanta Tab 50mg' },
        { name: 'Vivanta Tab 100mg' },
        { name: 'Vivis Cap' },
        { name: 'Vivori Tab 50 mg' },
        { name: 'Voligel Gel' },
        { name: 'Voligel Max Gel' },
        { name: 'Vonocab Tab 20 mg' },
        { name: 'Vonocab Tab 10 mg' },
        { name: 'Vonocab Trio Tab' },
        { name: 'Xetril Tab 0.5 mg' },
        { name: 'Xidolac Tab 10 mg' },
        { name: 'Xidolac Meltab Tab 10 mg' },
        { name: 'Zedex DS Syp 100 ml' },
        { name: 'Zolax Tab 0.25 mg' },
        { name: 'Zolax Tab 0.5 mg' },
        { name: 'Zolfin Tab 100 mg' },
        { name: 'Zymet Pro Cap 325 mg' },
        { name: 'Zopride Tab 50 mg' },
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

export default Beximco;
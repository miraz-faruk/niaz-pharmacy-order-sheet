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
        { name: 'Acifix Capsule 20 mg' },
        { name: 'Acifix Tablet 20 mg' },
        { name: 'Amdocal Tablet 2.5 mg' },
        { name: 'Amdocal Tablet 5 mg' },
        { name: 'Amdocal Tablet 10 mg' },
        { name: 'Amdocal Plus Tablet 25 mg' },
        { name: 'Amdocal Plus Tablet 50 mg' },
        { name: 'Amdocal Pro Tablet' },
        { name: 'Anustat Ointment' },
        { name: 'Aristocal D Tablet 500 mg' },
        { name: 'Aristoplex Syrup 100 ml' },
        { name: 'Aristoplex Syrup 200 ml' },
        { name: 'Aristovit B Tablet' },
        { name: 'Aristovit M Tablet' },
        { name: 'Arlin Tablet 400 mg' },
        { name: 'Arlin Suspension 100 mg' },
        { name: 'Arlin Tablet 600 mg' },
        { name: 'Atova Tablet 40 mg' },
        { name: 'Atova Tablet 20 mg' },
        { name: 'Atova Tablet 10 mg' },
        { name: 'Atova EZ Tablet 10 mg' },
        { name: 'Atova EZ Tablet 20 mg' },
        { name: 'Atrizin Tablet 10 mg' },
        { name: 'Atrizin Syrup 60 ml' },
        { name: 'Atrizin Pediatric Drop 15 ml' },
        { name: 'Axodin Suspension 50 ml' },
        { name: 'Axodin Tablet 180 mg' },
        { name: 'Axodin Tablet 120 mg' },
        { name: 'Azithrocin Tablet 500 mg' },
        { name: 'Azithrocin Suspension 15 ml' },
        { name: 'Azithrocin Suspension 30 ml' },
        { name: 'Azithrocin Suspension 50 ml' },
        { name: 'Azmasol Inhaler' },
        { name: 'Azmasol Inhaler Refill' },
        { name: 'Azmasol Inhalation Capsule 200 mg' },
        { name: 'Azmasol Plus Inhaler' },
        { name: 'Bactrobex Ointment 2%' },
        { name: 'Becoral D Tablet 500 mg' },
        { name: 'Becoral DX Tablet 600 mg' },
        { name: 'Betapro Tablet 2.5 mg' },
        { name: 'Betapro Tablet 5 mg' },
        { name: 'Bexidal Tablet 50 mg' },
        { name: 'Bexihaler Inhaler' },
        { name: 'Bexitrol F Inhaler 250 mg' },
        { name: 'Bexitrol F Inhalation Capsule 250 mg' },
        { name: 'Bexitrol F Inhalation Capsule 500 mg' },
        { name: 'Bexitrol F Inhalation Capsule 100 mg' },
        { name: 'Bexitrol F Inhaler 60 metered doses' },
        { name: 'Bexitrol F Inhaler 120 metered doses' },
        { name: 'Bexitrol F Inhaler 125 mg' },
        { name: 'Bextram Gold Tablet 15 tablet' },
        { name: 'Bextram Gold Tablet 30 Tablet' },
        { name: 'Bextram Kids Syrup' },
        { name: 'Bextram Silver Tablet' },
        { name: 'Bilexa Inhalation Capsule 200 mg' },
        { name: 'Bilexa Inhalation Capsule 100 mg' },
        { name: 'Billi Tablet 20 mg' },
        { name: 'Billi Oral Solution' },
        { name: 'Billi Meltab Tablet 10 mg' },
        { name: 'Bizoran Tablet 40 mg' },
        { name: 'Bizoran Tablet 20 mg' },
        { name: 'Bronkolax Syrup 2 mg' },
        { name: 'Buflex Tablet 500 mg' },
        { name: 'Buflex Tablet 1000 mg' },
        { name: 'Buflex Tablet 750 mg' },
        { name: 'Buratuss Syrup 7.5 mg/' },
        { name: 'Buratuss Pediatric Drop 5 mg' },
        { name: 'Burnsil Cream 1%' },
        { name: 'Calorate Tablet 400 mg' },
        { name: 'Calorate Tablet 740 mg' },
        { name: 'Calorate Kit Tablet 400 mg' },
        { name: 'Candoral Oral Gel 2%' },
        { name: 'Cardocal Tablet 5 mg' },
        { name: 'Cardocal Tablet 10 mg' },
        { name: 'Carnovas Tablet 10 mg' },
        { name: 'Carnovas Tablet 5 mg' },
        { name: 'Carnovas Tablet 2.5 mg' },
        { name: 'Carnovas HZ Tablet 5 mg' },
        { name: 'Cibrate Tablet 100 mg' },
        { name: 'Citicol Tablet 500 mg' },
        { name: 'Cosmotrin Cream 0.025%' },
        { name: 'D-Rise Capsule 20000 IU' },
        { name: 'D-Rise Tablet 2000 IU' },
        { name: 'D-Rise Chewable Tablet 1000 IU' },
        { name: 'D-Rise Capsule 40000 IU' },
        { name: 'D-Rise Capsule 50000 IU' },
        { name: 'D-Rise Oral Solution 2000 IU' },
        { name: 'D-Rise Injectable Solution (Oral & IM) 200000 IU' },
        { name: 'Decomit Nasal Spray 50 mg' },
        { name: 'Decomit Inhaler 100 mg' },
        { name: 'Decomit Inhaler 50 mg' },
        { name: 'Deflux Tablet 10 mg' },
        { name: 'Deflux Pediatric Drop 5 mg' },
        { name: 'Deflux Suspension 5 mg' },
        { name: 'Deflux Meltab Tablet 10 mg' },
        { name: 'Dextrim Syrup 20 mg' },
        { name: 'Dextromethorphan Syrup 10 mg' },
        { name: 'Diactin Tablet 5 mg' },
        { name: 'Diapro Tablet 80 mg' },
        { name: 'Diapro MR Tablet 30 mg' },
        { name: 'Diapro MR Tablet 60 mg' },
        { name: 'Diaryl Tablet 1 mg' },
        { name: 'Diaryl Tablet 2 mg' },
        { name: 'Diaryl Tablet 3 mg' },
        { name: 'Digecid Suspension' },
        { name: 'Dilapress Tablet 6.25 mg' },
        { name: 'Dinovo Tablet 375 mg' },
        { name: 'Dinovo Tablet 500 mg' },
        { name: 'Duvent Tablet 10 mg' },
        { name: 'Duvent Oral Solution' },
        { name: 'Dynase Nasal Spray' },
        { name: 'Ecotrim Cream' },
        { name: 'Emijoy Tablet 12.5 mg' },
        { name: 'Emijoy DS Tablet 25 mg' },
        { name: 'Empalina Tablet 10 mg' },
        { name: 'Empalina Tablet 25 mg' },
        { name: 'Enaril Tablet 5 mg' },
        { name: 'Evo Tablet 500 mg' },
        { name: 'Exovate Cream' },
        { name: 'Exovate Ointment' },
        { name: 'Exovate N Ointment' },
        { name: 'Exovate N Cream' },
        { name: 'Famomax Tablet 20 mg' },
        { name: 'Famomax Suspension 40 mg' },
        { name: 'Famomax Tablet 40 mg' },
        { name: 'Femzole Tablet 2.5 mg' },
        { name: 'Filmet Tablet 200 mg' },
        { name: 'Filmet Tablet 400 mg' },
        { name: 'Filmet Suspension' },
        { name: 'Fixolin Tablet 200 mg' },
        { name: 'Fixolin Tablet 400 mg' },
        { name: 'Fixonase Nasal Spray' },
        { name: 'Flatameal DS Suspension' },
        { name: 'Flomyst F Inhaler 10 mg' },
        { name: 'Flomyst F Inhaler 5 mg' },
        { name: 'Flubex Suspension 125 mg' },
        { name: 'Flubex Capsule 500 mg' },
        { name: 'Flubex Capsule 250 mg' },
        { name: 'Fosamin Powder' },
        { name: 'Frelax Emulsion' },
        { name: 'Frenxit Tablet' },
        { name: 'Fungistin Suspension' },
        { name: 'Gastalfet Suspension' },
        { name: 'Gastalfet Tablet 500 mg' },
        { name: 'Glipita Tablet 100 mg' },
        { name: 'Glipita Tablet 50 mg' },
        { name: 'Glipita M XR Tablet 500 mg' },
        { name: 'Glipita M XR Tablet 1000 mg' },
        { name: 'Glipita-M Tablet 500 mg' },
        { name: 'Glipita-M Tablet 1000 mg' },
        { name: 'Glyriva Inhalation Capsule' },
        { name: 'Hemofix FZ Tablet' },
        { name: 'Icykool Max Cream' },
        { name: 'Indelix SR Tablet 1.5 mg' },
        { name: 'Informet Tablet 850 mg' },
        { name: 'Informet Tablet 500 mg' },
        { name: 'Informet XR Tablet' },
        { name: 'Intracef Capsule 500 mg' },
        { name: 'Iprasol Inhaler' },
        { name: 'Iprasol Inhaler Refill' },
        { name: 'Jardian Tablet 25 mg' },
        { name: 'Jardian Tablet 10 mg' },
        { name: 'Jardimet Tablet' },
        { name: 'Jointec Max Tablet' },
        { name: 'Jointec Pro Tablet' },
        { name: 'Labeta Tablet 200 mg' },
        { name: 'Lulexa Cream 10 gm' },
        { name: 'Lulexa Cream 20 gm' },
        { name: 'Melato Tablet 3 mg' },
        { name: 'Melphin Suspension 50 mg' },
        { name: 'Metazine MR Tablet 35 mg' },
        { name: 'Midita Tablet 50 mg' },
        { name: 'Midita Tablet 100 mg' },
        { name: 'Mirasol XR Tablet 25 mg' },
        { name: 'Mirasol XR Tablet 50 mg' },
        { name: 'Momento Tablet 5 mg' },
        { name: 'Momvit Tablet' },
        { name: 'Monocast Tablet 10 mg' },
        { name: 'Monocast Chewable Tablet 4 mg' },
        { name: 'Monocast Chewable Tablet 5 mg' },
        { name: 'Mopride Tablet 1 mg' },
        { name: 'Mopride Tablet 2 mg' },
        { name: 'Mucomist DT Tablet' },
        { name: 'Mucosol Syrup' },
        { name: 'Mucosol Pediatric Drop' },
        { name: 'Napa Tablet' },
        { name: 'Napa Pediatric Drop' },
        { name: 'Napa Suppository 125 mg' },
        { name: 'Napa Suppository 250 mg' },
        { name: 'Napa Suppository 500 mg' },
        { name: 'Napa Syrup' },
        { name: 'Napa Extend Tablet' },
        { name: 'Napa Extra Tablet' },
        { name: 'Napa One Tablet' },
        { name: 'Napa Rapid Tablet' },
        { name: 'NapaDol Tablet' },
        { name: 'Neodrop Pediatric Drop 67 mg' },
        { name: 'Neofloxin Eye Drop 0.3%' },
        { name: 'Neofloxin Tablet 500 mg' },
        { name: 'Neofloxin Suspension 250 mg' },
        { name: 'Neofloxin-D Eye Drop' },
        { name: 'Neopem Tablet 150 mg' },
        { name: 'Neopem Tablet 200 mg' },
        { name: 'Neosten Cream 20 gm' },
        { name: 'Neosten HC Cream 10 gm' },
        { name: 'Neosten HC Cream 20 gm' },
        { name: 'Neosten VT Vaginal Tablet 200 mg' },
        { name: 'Nervalin Capsule 50 mg' },
        { name: 'Nervalin Capsule 75 mg' },
        { name: 'Nervalin Capsule 25 mg' },
        { name: 'Nervalin CR Tablet 330 mg' },
        { name: 'Nervalin CR Tablet 82.5 mg' },
        { name: 'Nervalin CR Tablet 165 mg' },
        { name: 'Neurocare Tablet' },
        { name: 'Nevalto Tablet' },
        { name: 'Nitrosol Spray' },
        { name: 'Nitrosol SR Tablet 2.6 mg' },
        { name: 'Numira Tablet 2.5 mg' },
        { name: 'Numira Tablet 5 mg' },
        { name: 'Numira Tablet 10 mg' },
        { name: 'Odrel Tablet' },
        { name: 'Odrel Plus Tablet' },
        { name: 'Odycin Eye Drop 0.5%' },
        { name: 'Odycin Tablet 400 mg' },
        { name: 'Olmesan Tablet 20 mg' },
        { name: 'Olmesan Tablet 40 mg' },
        { name: 'Olmesan Tablet 10 mg' },
        { name: 'Olmesan Plus Tablet 20 mg' },
        { name: 'Olopan Eye Drop 0.1%' },
        { name: 'Olopan DS Eye Drop 0.2%' },
        { name: 'Olopan Pro Eye Drop 0.7%' },
        { name: 'Omastin Capsule 50 mg' },
        { name: 'Omastin Capsule 150 mg' },
        { name: 'Omastin Capsule 200 mg' },
        { name: 'Omastin Suspension 50 mg' },
        { name: 'Onriva Inhalation Capsule 75 mg' },
        { name: 'Onriva Inhalation Capsule 150 mg' },
        { name: 'Onriva Plus Inhalation Capsule 110 mg' },
        { name: 'Opanac Suspension 0.1%' },
        { name: 'Opanac TS Suspension 0.3%' },
        { name: 'Opton Tablet 20 mg' },
        { name: 'Opton Tablet 40 mg' },
        { name: 'Opton Capsule 20 mg' },
        { name: 'Opton Capsule 40 mg' },
        { name: 'Pacet Tablet 200 mg' },
        { name: 'Pantobex Tablet 20 mg' },
        { name: 'Pantobex Tablet 40 mg' },
        { name: 'Pedeamin Syrup 10 mg' },
        { name: 'Proceptin Capsule 20 mg' },
        { name: 'Proceptin Capsule 40 mg' },
        { name: 'Progavi Suspension' },
        { name: 'Prosan Tablet 25 mg' },
        { name: 'Prosan Tablet 50 mg' },
        { name: 'Prosan HZ Tablet 50 mg' },
        { name: 'Q-Rash Ointment' },
        { name: 'Recur Tablet 1 mg' },
        { name: 'Relentus Tablet 2 mg' },
        { name: 'REMMO Tablet 20 mg' },
        { name: 'REMMO Tablet 40 mg' },
        { name: 'Resolve Shampoo 2%' },
        { name: 'Rostil Tablet 135 mg' },
        { name: 'Rostil SR Capsule 200 mg' },
        { name: 'Rosutin Tablet 5 mg' },
        { name: 'Rosutin Tablet 10 mg' },
        { name: 'Rosutin Tablet 20 mg' },
        { name: 'Symbion Inhalation Capsule 100 mg' },
        { name: 'Symbion Inhalation Capsule 200 mg' },
        { name: 'Symbion Inhaler 80 mg' },
        { name: 'Symbion Inhaler 160 mg' },
        { name: 'Tamona Tablet 20 mg' },
        { name: 'Tearon Eye Drop' },
        { name: 'Tearon Fresh Eye Drop' },
        { name: 'Tearon PF Eye Drop' },
        { name: 'Telma Tablet 80 mg' },
        { name: 'Telma Tablet 40 mg' },
        { name: 'Telma Tablet 20 mg' },
        { name: 'Telma Plus Tablet 12.5 mg' },
        { name: 'Telmacal Tablet 40 mg' },
        { name: 'Telmacal Tablet 80 mg' },
        { name: 'Terbex Tablet 250 mg' },
        { name: 'Terbex Cream 1%' },
        { name: 'Tigel Tablet 90 mg' },
        { name: 'Tioriva Inhalation Capsule 18 mg' },
        { name: 'Tofen Tablet' },
        { name: 'Tofen Syrup' },
        { name: 'Traneta Tablet 5 mg' },
        { name: 'Traneta M Tablet 500 mg' },
        { name: 'Traneta M Tablet 850 mg' },
        { name: 'Traneta M Tablet 1000 mg' },
        { name: 'Tribrez Inhaler' },
        { name: 'Triocim Capsule 200 mg' },
        { name: 'Triocim Capsule 400 mg' },
        { name: 'Triocim Suspension 100 mg' },
        { name: 'Triocim DS Suspension 200 mg' },
        { name: 'Turbocef Tablet 250 mg' },
        { name: 'Turbocef Tablet 500 mg' },
        { name: 'Turbocef Suspension 125 mg 70 ml' },
        { name: 'Turboclav Tablet 250 mg' },
        { name: 'Turboclav Tablet 500 mg' },
        { name: 'Tuspel Syrup 100 ml' },
        { name: 'Tycil Capsule 250 mg' },
        { name: 'Tycil Capsule 500 mg' },
        { name: 'Tycil Suspension 125 mg' },
        { name: 'Tyclav Suspension (125 mg+31.25 mg)' },
        { name: 'Tyclav Tablet 875 mg' },
        { name: 'Tyclav Tablet 250 mg' },
        { name: 'Tyclav Tablet 500 mg' },
        { name: 'Tyclav BID Suspension 50 ml' },
        { name: 'Tynisol Pediatric Drop 15 ml' },
        { name: 'Ural-K Oral Solution 200 ml' },
        { name: 'Urofi Capsule 5 mg' },
        { name: 'Uroflo Capsule 0.4 mg' },
        { name: 'Vibose Tablet 0.2 mg' },
        { name: 'Vibose Tablet 0.3 mg' },
        { name: 'Vintelix Tablet 5 mg' },
        { name: 'Vintelix Tablet 10 mg' },
        { name: 'Viscocid Suspension 200 ml' },
        { name: 'Vivanta Tablet 50mg' },
        { name: 'Vivanta Tablet 100mg' },
        { name: 'Vivis Capsule' },
        { name: 'Vivori Tablet 50 mg' },
        { name: 'Voligel Gel' },
        { name: 'Voligel Max Gel' },
        { name: 'Vonocab Tablet 20 mg' },
        { name: 'Vonocab Tablet 10 mg' },
        { name: 'Vonocab Trio Tablet' },
        { name: 'Xetril Tablet 0.5 mg' },
        { name: 'Xidolac Tablet 10 mg' },
        { name: 'Xidolac Meltab Tablet 10 mg' },
        { name: 'Zedex DS Syrup 100 ml' },
        { name: 'Zolax Tablet 0.25 mg' },
        { name: 'Zolax Tablet 0.5 mg' },
        { name: 'Zolfin Tablet 100 mg' },
        { name: 'Zymet Pro Capsule 325 mg' }
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

export default Beximco;
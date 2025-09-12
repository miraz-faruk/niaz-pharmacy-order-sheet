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
        { name: "Bislol 1.25" },
        { name: "Bislol 2.5" },
        { name: "Bislol 5" },
        { name: "Bislol 10" },
        { name: "Bislol Max 2.5" },
        { name: "Bislol Plus 2.5" },
        { name: "Bislol Plus 5" },
        { name: "Bislol Plus 10" },
        { name: "Nitrofix SR" },
        { name: "Cardex 3.125" },
        { name: "Cardex 6.25" },
        { name: "Cardex 12.5" },
        { name: "Cildip 5" },
        { name: "Cildip 10" },
        { name: "Antoris MR" },
        { name: "Ramace 1.25" },
        { name: "Ramace 2.5" },
        { name: "Ramace 5" },
        { name: "Calnor 5/20" },
        { name: "Calnor 5/40" },
        { name: "Centoxin Syp" },
        { name: "Telmitan 20" },
        { name: "Telmitan 40" },
        { name: "Telmitan 80" },
        { name: "Telmitan Max 5/40" },
        { name: "Telmitan Max 5/80" },
        { name: "Telmitan Plus 40/12.5" },
        { name: "Telmitan Plus 80/12.5" },
        { name: "Clontas" },
        { name: "Clont 75" },
        { name: "Avas 10" },
        { name: "Avas 20" },
        { name: "Avas 40" },
        { name: "Frusin Syp" },
        { name: "Frusin 40" },
        { name: "Frusin Plus 20" },
        { name: "Frusin Plus 40" },
        { name: "Larb 25" },
        { name: "Larb 50" },
        { name: "Larb 100" },
        { name: "Larb Plus 50" },
        { name: "Larb Plus 100" },
        { name: "Hypen SR" },
        { name: "Hypen Max SR" },
        { name: "Propanol 10" },
        { name: "Propanol 20" },
        { name: "Propanol 40" },
        { name: "Amocal 5" },
        { name: "Amocal AT" },
        { name: "Ropitor 5" },
        { name: "Ropitor 10" },
        { name: "Ropitor 20" },
        { name: "Olsart 20" },
        { name: "Olsart 40" },
        { name: "Olsart Plus 20" },
        { name: "Nebilol 2.5" },
        { name: "Nebilol 5" },
        { name: "Nebilol Plus 5" },
        { name: "Linadus M 2.5/500" },
        { name: "Linadus M 2.5/850" },
        { name: "Linadus M 2.5/1000" },
        { name: "Linadus M XR 5/1000" },
        { name: "Linadus 5" },
        { name: "Sitadus M 500" },
        { name: "Met 500" },
        { name: "Met 850" },
        { name: "Met XR 500" },
        { name: "Glizid 80" },
        { name: "Glizid MR 30" },
        { name: "Glizid MR 60" },
        { name: "Glims 1" },
        { name: "Glims 2" },
        { name: "Glims 3" },
        { name: "Glims 4" },
        { name: "Vildus 50" },
        { name: "Vildamet 500" },
        { name: "Vildamet 850" },
        { name: "Empadus 10" },
        { name: "Empadus 25" },
        { name: "Empadus M 5/500" },
        { name: "Empadus M 5/850" },
        { name: "Empadus M 12.5/500" },
        { name: "Empadus M ER 5/1000" },
        { name: "Emlidus 10/5" },
        { name: "Emlidus 25/5" },
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
        { name: "Queta XR Tab 50 mg" },
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
        { name: "Alprax Tab 0.25 mg" },
        { name: "Alprax Tab 0.5 mg" },
        { name: "Alprax XR Tab 1 mg" },
        { name: "Alprax XR Tab 2 mg" },
        { name: "Epam Tab 5 mg" },
        { name: "Zispin Tab 7.5 mg" },
        { name: "Zispin Tab 30 mg" },
        { name: "Xinplax DR Cap 20 mg" },
        { name: "Xinplax DR Cap 30 mg" },
        { name: "Xinplax DR Cap 60 mg" },
        { name: "Midolam Tab 7.5 mg" },
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
        { name: "Sertacon VS" },
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
        { name: "Haloxa Ointment 20 gm" },
        { name: "Betson Cream 10 gm" },
        { name: "Betson Ointment 10 gm" },
        { name: "Betson CL Ointment 10 gm" },
        { name: "Betson CL Cream 10 gm" },
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
        { name: "Clindex-D Gel 20 gm" },
        { name: "Clindex Plus Gel 15 gm" },
        { name: "Clindex Lotion" },
        { name: "Doxin Cap 50 mg" },
        { name: "Doxin Cap 100 mg" },
        { name: "Dermoban Ointment 10 gm" },
        { name: "Neocin Ointment 10 gm" },
        { name: "Folic-Z Tab" },
        { name: "Enclot Cap 500 mg" },
        { name: "Enclot Cap 250 mg" },
        { name: "Proventa Inhaler HFA 100 mcg" },
        { name: "Floriva-F Inhaler 125 mcg" },
        { name: "Floriva-F Inhaler 250 mcg" },
        { name: "Snofas Nasal Spray" },
        { name: "Zeltas Nasal Spray" },
        { name: "Fluvate Nasal Spray" },
        { name: "Ciclex Nasal Spray" },
        { name: "Xylomet Plus Nasal Spray" },
        { name: "Pulmolin Syp 60 ml" },
        { name: "Purilin Syp 60 ml" },
        { name: "Candibac Ear Drops 5 ml" },
        { name: "Alistin DT Tab 600 mg" },
        { name: "Doxorin Syp 100 ml" },
        { name: "Doxorin Tab 200 mg" },
        { name: "Doxorin Tab 400 mg" },
        { name: "Dezacot Tab 24 mg" },
        { name: "Dezacot Tab 30 mg" },
        { name: "Dezacot Tab 6 mg" },
        { name: "Dezacot Suspension 60 ml" },
        { name: "Ebanex Tab 10 mg" },
        { name: "Ebanex Oral Solution 50 ml" },
        { name: "Filin Injection 125 mg" },
        { name: "Filin Tab 100 mg" },
        { name: "Kofen Tab 10 mg" },
        { name: "Kofen Oral Solution 100 ml" },
        { name: "Unilin Syp 60 ml" },
        { name: "Unilin CR Tab 200 mg" },
        { name: "Trilock OFT 5 mg" },
        { name: "Trilock OFT 4 mg" },
        { name: "Trilock 10 mg" },
        { name: "Trilock CT 10 mg" },
        { name: "Ostoref D Tab" },
        { name: "Ostoref DX Tab" },
        { name: "Visral Tab 50 mg" },
        { name: "Visral Syp" },
        { name: "Palmicort F Nasal Spray" },
        { name: "Ciclorox Cream" },
        { name: "Ciclorox Shampoo" },
        { name: "Lulinox 10 gm" },
        { name: "Lulinox 20 gm" },
        { name: "Rolimus 0.1% Ointment" },
        { name: "Rolimus 0.03% Ointment" },
        { name: "Spinosa Topical Suspension" },
        { name: "Gynoril VS" },
        { name: "Bromode Tab 2.5 mg" },
        { name: "Bromode Tab 2.5 mg" },
        { name: "Natal-16" },
        { name: "Azonox Cap 100 mg" },
        { name: "Azonox Cap 200 mg" },
        { name: "Azonox Ultra Cap" },
        { name: "Emolia Cream" },
    ].sort((a, b) => a.name.localeCompare(b.name));

    const generalItems = [
        { name: "Acerux Suspension 70 ml" },
        { name: "Advel Suspension 100 ml" },
        { name: "Algecal C Tab" },
        { name: "Algecal C Plus Tab" },
        { name: "Algecal D Tab" },
        { name: "Algecal Dx Tab" },
        { name: "Algisum Max Suspension 200 ml" },
        { name: "Alphalok XR Tab 2.5 mg" },
        { name: "Alphalok XR Tab 5 mg" },
        { name: "Anset Tab 4 mg" },
        { name: "Anset Tab 8 mg" },
        { name: "Anset Injection" },
        { name: "Anset Oral Solution 50 ml" },
        { name: "Antrenex Tab 5 mg" },
        { name: "Arnivas Tab 50 mg" },
        { name: "Arnivas Tab 100 mg" },
        { name: "Beklo Tab 5 mg" },
        { name: "Beklo Oral Solution 100 ml" },
        { name: "Beklo Tab 10 mg" },
        { name: "Beltas Tab 20 mg" },
        { name: "Beltas Oral Solution 60 ml" },
        { name: "Beltas Kids Tab 10 mg" },
        { name: "Boxol Pediatric Drop 15 ml" },
        { name: "Boxol Syp 100 ml" },
        { name: "Boxol SR Cap 75 mg" },
        { name: "Butaret Pediatric Drop 15 ml" },
        { name: "Butaret Syp 100 ml" },
        { name: "Butaret SR Tab 50 mg" },
        { name: "Calac Tab 300 mg" },
        { name: "Calci Injection" },
        { name: "Candiflox Ear Drop" },
        { name: "Carticel Plus Tab" },
        { name: "Carticel TS Tab" },
        { name: "Caviton Tab 5 mg" },
        { name: "Ceftid Pediatric Drop 21 ml" },
        { name: "Ceftid Suspension 37.5 ml" },
        { name: "Ceftid Cap 400 mg" },
        { name: "Ceftid Cap 200 mg" },
        { name: "Ceftid DS Suspension 50 ml" },
        { name: "Ceftid Suspension 50 ml" },
        { name: "Ceftid QS Pediatric Drop 11 ml" },
        { name: "Centoxin Tab 0.25 mg" },
        { name: "Centoxin Oral Solution 60 ml" },
        { name: "Cifirate Tab 100 mg" },
        { name: "Ciprox Tab 500 mg" },
        { name: "Ciprox DS Suspension 60 ml" },
        { name: "Citalex Tab 10 mg" },
        { name: "Citalex Tab 5 mg" },
        { name: "Citin Tab 10 mg" },
        { name: "Citritol Tab" },
        { name: "Clamox Tab 625 mg" },
        { name: "Clavusef Tab 500 mg" },
        { name: "Clavusef Tab 250 mg" },
        { name: "Clavusef Tab 125 mg" },
        { name: "Clavusef Syp" },
        { name: "Clindax Cap 300 mg" },
        { name: "Clindax Cap 150 mg" },
        { name: "Clinorel Tab 100 mg" },
        { name: "Clinorel Tab 200 mg" },
        { name: "Clob Tab 10 mg" },
        { name: "Cloxin Cap 500 mg" },
        { name: "Convules CR Tab 500 mg" },
        { name: "Convules CR Tab 300 mg" },
        { name: "Convules CR Tab 200 mg" },
        { name: "Cosarin Tab" },
        { name: "Cotson Tab 10 mg" },
        { name: "Danflex Cap 50 mg" },
        { name: "Danflex Cap 25 mg" },
        { name: "Decason Tab 0.5 mg" },
        { name: "Decason Injection 5 mg" },
        { name: "Delight Cap 40000 IU" },
        { name: "Delight Cap 20000 IU" },
        { name: "Delight Injectable Solution 200000 IU" },
        { name: "Dequa VT 10 mg" },
        { name: "Diclofen Suppository 50 mg" },
        { name: "Diclofen Tab 25 mg" },
        { name: "Diclofen Tab 50 mg" },
        { name: "Diclofen Gel 1% 20 gm" },
        { name: "Diclofen Injection" },
        { name: "Diclofen Plus Injection" },
        { name: "Diclofen SR Tab 100 mg" },
        { name: "Diohes Tab 500 mg" },
        { name: "Diohes DS Tab 1000 mg" },
        { name: "Docuset Tab 120 mg" },
        { name: "Domin Pediatric Dro" },
        { name: "Domin Suspension 60 ml" },
        { name: "Domin Tab 10 mg" },
        { name: "Duralax Tab 5 mg" },
        { name: "Easium Injection 10 mg" },
        { name: "Easium Suppository 10 mg" },
        { name: "Easium Tab 5 mg" },
        { name: "Edolac Cap 300 mg" },
        { name: "Esotid Tab 20 mg" },
        { name: "Esotid Tab 40 mg" },
        { name: "Esotid Cap 20 mg" },
        { name: "Esotid Cap 40 mg" },
        { name: "Esotid MUPS Tab 40 mg" },
        { name: "Esotid MUPS Tab 20 mg" },
        { name: "Finix Tab 20 mg" },
        { name: "Finix Cap 20 mg" },
        { name: "Finix Cap 10 mg" },
        { name: "Finix HP Tab" },
        { name: "Finix MUPS Tab 20 mg" },
        { name: "Firmvit Tab" },
        { name: "Fixal Tab 120 mg" },
        { name: "Fixal Tab 180 mg" },
        { name: "Fixal Suspension 50 ml" },
        { name: "Fixal Tab 60 mg" },
        { name: "Flatulex Pediatric Drop 15 ml" },
        { name: "Flocet Tab 200 mg" },
        { name: "Flocet Tab 400 mg" },
        { name: "Flux Cap 250 mg" },
        { name: "Flux Cap 500 mg" },
        { name: "Flux Suspension 100 ml" },
        { name: "Flux DS Suspension 100 ml" },
        { name: "Folic OS 100 ml" },
        { name: "Folistar Tab 5 mg" },
        { name: "Folistar Tab 15 mg" },
        { name: "Gentin Cream 0.3% 10 gm" },
        { name: "Gentin Injection 20 mg" },
        { name: "Gentin Injection 80 mg" },
        { name: "Gestcare Tab" },
        { name: "Halop Tab 5 mg" }
    ].sort((a, b) => a.name.localeCompare(b.name));

    const itemsMap = {
        Cardiac: cardiacItems,
        CNS: CNSItems,
        Derma: dermatologyItems,
        General: generalItems
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

export default Opsonin;
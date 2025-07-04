import { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ACME = () => {
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
        doc.text("ACME Laboratories Ltd", 10, yPosition);
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

        doc.save('ACME.pdf');
    };

    // Sort items alphabetically
    const items = [
        { name: "A-B1 Tablet 100 mg" },
        { name: "A-Cal Tablet 500 mg" },
        { name: "A-Cal D Tablet 15 Tab" },
        { name: "A-Cal D Tablet 30 Tab" },
        { name: "A-Calm Tablet 50 mg" },
        { name: "A-Clox Capsule 500 mg" },
        { name: "A-Cof Syrup 100 ml" },
        { name: "A-Fenac Tablet 25 mg" },
        { name: "A-Fenac Tablet 50 mg" },
        { name: "A-Fenac Suppository 50 mg" },
        { name: "A-Fenac Suppository 50 mg" },
        { name: "A-Fenac Injection" },
        { name: "A-Fenac K Tablet 50 mg" },
        { name: "A-Fenac Plus Injection" },
        { name: "A-Fenac SR Tablet 100 mg" },
        { name: "A-Flox Capsule 250 mg" },
        { name: "A-Flox Capsule 500 mg" },
        { name: "A-Flox Suspension 100 ml" },
        { name: "A-Meb Tablet 135 mg" },
        { name: "A-Migel Oral Gel" },
        { name: "A-Phenicol Eye Drop" },
        { name: "A-Phenicol D Eye Drop" },
        { name: "A-Tetra Capsule 500 mg" },
        { name: "A-Zyme Tablet 325 mg" },
        { name: "Acemox Tablet 250 mg" },
        { name: "Aclobet Ointment" },
        { name: "Aclobet-N Ointment" },
        { name: "Aclobet-N Cream" },
        { name: "Acme's Basok Syrup 100 ml" },
        { name: "Acmina Syrup 200 ml" },
        { name: "Acmina Syrup 450 ml" },
        { name: "Airfors Inhaler 90 mcg+80 mcg" },
        { name: "Alanil Suspension 50 ml" },
        { name: "Alanil Tablet 180 mg" },
        { name: "Alanil Tablet 120 mg" },
        { name: "Alclor Pediatric Drop 15 ml" },
        { name: "Alercon Eye Drop" },
        { name: "Alercon DS Eye Drop" },
        { name: "Alia Tablet 5 mg" },
        { name: "Alodia Tablet 25 mg" },
        { name: "Alodia Tablet 12.5 mg" },
        { name: "Alovera Tablet 345 mg" },
        { name: "Amlacid Syrup 200 ml" },
        { name: "Amlacid Syrup 450 ml" },
        { name: "Amlopin Tablet 5 mg" },
        { name: "Amlopin Tablet 10 mg" },
        { name: "Amloten Tablet 5/50" },
        { name: "Amloten Tablet 5/25" },
        { name: "Angirid MR Tablet 35 mg" },
        { name: "Angist SR Tablet 2.6 mg" },
        { name: "Apitac Tablet 100 mg" },
        { name: "Arjunacard Syrup 200 ml" },
        { name: "Arkid Syrup 100 ml" },
        { name: "Arth-A Tablet 250/200" },
        { name: "Arth-A Max Tablet 750/50" },
        { name: "Arth-A TS Tablet 750/600" },
        { name: "Ascon-F Inhaler 100 mcg+6 mcg" },
        { name: "Ascon-F Inhaler 200 mcg+6 mcg" },
        { name: "Asmarid Syrup 200 ml" },
        { name: "Aximin Tablet 550 mg" },
        { name: "Aximin Tablet 200 mg" },
        { name: "Azelec Cream 20%" },
        { name: "Azin Tablet 500 mg" },
        { name: "Azin Capsule 250 mg" },
        { name: "Azin Suspension 15 ml" },
        { name: "Azin Suspension 30 ml" },
        { name: "Azin Suspension 50 ml" },
        { name: "Azolin Nasal Drop 0.025%" },
        { name: "Azolin Nasal Drop 0.05%" },
        { name: "Ben-A Chewable Tablet 400 mg" },
        { name: "Ben-A Suspension 10 ml" },
        { name: "Bet-A Ointment 20 gm" },
        { name: "Bet-A Cream 20 gm" },
        { name: "Bet-A Tablet 0.5 mg" },
        { name: "Bet-CL Cream 20 gm" },
        { name: "Bet-CG Cream 15 gm" },
        { name: "Bet-CL Ointment 20 gm" },
        { name: "Betabis Tablet 10 mg" },
        { name: "Betabis Tablet 2.5 mg" },
        { name: "Betabis Tablet 5 mg" },
        { name: "Betabis Plus Tablet 2.5/6.25" },
        { name: "Betabis Plus Tablet 5/6.25" },
        { name: "Betabis-A Tablet 2.5/5" },
        { name: "Betol Ointment" },
        { name: "Bihale Inhalation Capsule 25/200" },
        { name: "Bihale Inhalation Capsule 25/100" },
        { name: "Bilan Tablet 20 mg" },
        { name: "Bilan Oral Solution 50 ml" },
        { name: "Bilan Kids Tablet 10 mg" },
        { name: "Briva Tablet 25 mg" },
        { name: "Briva Tablet 50 mg" },
        { name: "Briva Oral Solution 50 ml" },
        { name: "Cecon Chewable Tablet 250 mg" },
        { name: "Cetisoft Capsule 10 mg" },
        { name: "Cetizin Tablet 10 mg" },
        { name: "Cinazin Tablet 15 mg" },
        { name: "Cinazin Plus Tablet 20/40" },
        { name: "Cipro-A Eye Drop 0.3%" },
        { name: "Cipro-A Tablet 250 mg" },
        { name: "Cipro-A Tablet 500 mg" },
        { name: "Cipro-A Suspension 60 ml" },
        { name: "Cipro-D Eye Drop" },
        { name: "Citrosol Oral Solution 200 ml" },
        { name: "Claricin Tablet 250 mg" },
        { name: "Claricin Suspension 60 ml" },
        { name: "Claricin Tablet 500 mg" },
        { name: "Clioquin Cream 30 gm" },
        { name: "Clotrim Cream 10 gm" },
        { name: "Clotrim Cream 20 gm" },
        { name: "Cofrid Syrup 100 ml" },
        { name: "Combo 4 Cream" },
        { name: "Coralex D Tablet 500 mg+200 IU" },
        { name: "Coralex DX Tablet 600 mg+400 IU" },
        { name: "Cortimax Tablet 24 mg" },
        { name: "Cortimax Suspension 60 ml" },
        { name: "Cortimax Tablet 6 mg" },
        { name: "Cosium Tablet 10 mg" },
        { name: "CP Suspension 50 ml" },
        { name: "CP Pediatric Drop 15 ml" },
        { name: "Crisa Ointment 2%" },
        { name: "Cystnil Tablet 150/550" },
        { name: "D-gest Tablet 10 mg" },
        { name: "Dactus Tablet 3 mg" },
        { name: "Dactus Tablet 2 mg" },
        { name: "Dactus Tablet 1 mg" },
        { name: "Daomin Tablet 850 mg" },
        { name: "Daomin Tablet 500 mg" },
        { name: "Daomin XR Tablet 1000 mg" },
        { name: "Daomin XR Tablet 500 mg" },
        { name: "Dclot Tablet 75 mg" },
        { name: "DDR Capsule 60 mg" },
        { name: "DDR Capsule 30 mg" },
        { name: "Defaz CI Capsule 50 mg+0.50 mg+61.80 mg" },
        { name: "Defrol Tablet 1000 IU" },
        { name: "Defrol Capsule 40000 IU" },
        { name: "Defrol Injectable Solution (Oral & IM) 200000 IU/ml" },
        { name: "Defrol Capsule 20000 IU" },
        { name: "Defrol OFT Flash Tablet 2000 IU" },
        { name: "Defrol OS Oral Solution 50 ml" },
        { name: "Dequadin VT 10 mg" },
        { name: "Dermupin Ointment 2%" },
        { name: "DHEA Tablet 25 mg" },
        { name: "Dirozyl Tablet 400 mg" },
        { name: "Dirozyl Suspension 60 ml" },
        { name: "Don-A Pediatric Drop" },
        { name: "Don-A Suspension 60 ml" },
        { name: "Don-A Tablet 10 mg" },
        { name: "Dophylin Tablet 400 mg" },
        { name: "Dophylin Tablet 200 mg" },
        { name: "Dophylin Syrup 100 ml" },
        { name: "Doxy-A Capsule 100 mg" },
        { name: "Droscon Tablet 3 mg+0.03 mg" },
        { name: "Dulox Tablet 20 mg" },
        { name: "Dulox Tablet 30 mg" },
        { name: "Duocard Tablet 10 mg" },
        { name: "Duocard Tablet 5 mg" },
        { name: "Easyhaler Inhaler" },
        { name: "Ecosprin Tablet 81 mg" },
        { name: "Ecosprin Tablet 75 mg" },
        { name: "Ecosprin Plus Tablet 75/75" },
        { name: "Edemide Tablet 40/50" },
        { name: "Edemide Tablet 20/50" },
        { name: "Electro-K Tablet 600 mg" },
        { name: "Elodep Tablet 5 mg" },
        { name: "Elodep Tablet 10 mg" },
        { name: "Emlino Tablet 10/5" },
        { name: "Emlino Tablet 25/5" },
        { name: "Enocam Tablet 20 mg" },
        { name: "Ertaco Cream 2%" },
        { name: "Exinil Cream" },
        { name: "Eyedew Eye Drop" },
        { name: "Eyemox Eye Drop" },
        { name: "Eyemox-D Eye Drop" },
        { name: "Ezygut Capsule 20 billion" },
        { name: "Famicef Tablet 250 mg" },
        { name: "Famicef Suspension 70 ml" },
        { name: "Famicef Tablet 500 mg" },
        { name: "Famiclav Suspension 70 ml" },
        { name: "Famiclav Tablet 500/125" },
        { name: "Famiclav Tablet 250/62.5" },
        { name: "Famodin Suspension 60 ml" },
        { name: "Famodin Tablet 20 mg" },
        { name: "Fast Tablet 500 mg" },
        { name: "Fast Suspension 60 ml" },
        { name: "Fast Suppository 500 mg" },
        { name: "Fast Suppository 250 mg" },
        { name: "Fast Suppository 125 mg" },
        { name: "Fast One Tablet 1000 mg" },
        { name: "Fast Plus Tablet 500/65" },
        { name: "Fast XR Tablet 665 mg" },
        { name: "Fastdol Tablet 325/37.5" },
        { name: "Fecilax Eff. Powder" },
        { name: "Feminor Tablet 5 mg" },
        { name: "Ferroglobin Syrup 200 ml" },
        { name: "Ferti-Q Capsule 100 mg" },
        { name: "Ferti-Q Capsule 200 mg" },
        { name: "Fezol Tablet 2.5 mg" },
        { name: "Filofer Capsule 30 mg" },
        { name: "Fix-A Pediatric Drop 21 ml" },
        { name: "Fix-A Capsule 200 mg" },
        { name: "Fix-A Suspension 37.5 ml" },
        { name: "Fix-A Suspension 50 ml" },
        { name: "Fix-A Suspension 75 ml" },
        { name: "Fix-A DS Capsule 400 mg" },
        { name: "Fix-A DS Suspension 50 ml" },
        { name: "Fix-A Max Pediatric Drop 20 ml" },
        { name: "Flatunil Pediatric Drop" },
        { name: "Fluconal Tablet 50 mg" },
        { name: "Fluconal Tablet 150 mg" },
        { name: "Fluconal Suspension 35 ml" },
        { name: "Fluticon Nasal Spray 120 metered sprays" },
        { name: "Fluzin Tablet 5 mg" },
        { name: "Fluzin Tablet 10 mg" },
        { name: "Foli Kidz Oral Solution" },
        { name: "Folic Acid 100 ml" },
        { name: "FoliHair Capsule 5000 mcg" },
        { name: "FoliHair Capsule 1000 mcg" },
        { name: "Folix Tablet 5 mg" },
        { name: "Folix Tablet 15 mg" },
        { name: "Gavisus Chewable Tablet" },
        { name: "Gavisus Suspension 200 ml" },
        { name: "Gavisus DX Suspension 200 ml" },
        { name: "Gliclid Tablet 80 mg" },
        { name: "Gliclid MR Tablet 30 mg" },
        { name: "Gliclid MR Tablet 60 mg" },
        { name: "Glifo Tablet 25 mg" },
        { name: "Glifo Tablet 10 mg" },
        { name: "Glifo-M Tablet 12.5/500" },
        { name: "Glifo-M Tablet 12.5/500" },
        { name: "Glifo-M XR Tablet 5/1000" },
        { name: "Glifo-M XR Tablet 25/1000" },
        { name: "Glifo-M XR Tablet 10/1000" },
        { name: "Goustat Tablet 40 mg" },
        { name: "Gynest Vaginal Cream 0.1%" },
        { name: "Halotaz Lotion" },
        { name: "Happysol Nasal Drop 0.9%" },
        { name: "Hepatolin Syrup 200 ml" },
        { name: "Hepatolin Syrup 450 ml" },
        { name: "Histalex Syrup 100 ml" },
        { name: "Honeybas Syrup 100 ml" },
        { name: "Imegli Tablet 500 mg" },
        { name: "Indica-G Inhalation Capsule 110/50" },
        { name: "Indo-A Suppository 100 mg" },
        { name: "Itopid Tablet 50 mg" },
        { name: "Janmet Tablet 50/500" },
        { name: "Janmet Tablet 50/1000" },
        { name: "Janmet XR Tablet 50/500" },
        { name: "Janvia Tablet 50 mg" },
        { name: "Janvia Tablet 100 mg" },
        { name: "Ketifen Tablet 1 mg" },
        { name: "Ketifen Syrup 100 ml" },
        { name: "Kidcare Syrup 100 ml" },
        { name: "Laxofit Tablet 10 mg" },
        { name: "Laxofit Oral Solution 50 ml" },
        { name: "Laxogol Oral Solution 100 ml" },
        { name: "Leanxit Tablet 0.5/10" },
        { name: "Lecosav Syrup 200 ml" },
        { name: "Leo Tablet 500 mg" },
        { name: "Leptic Tablet 0.5 mg" },
        { name: "Leptic Tablet 2 mg" },
        { name: "Leptic Tablet 1 mg" },
        { name: "Leptic ODT Tablet 0.5 mg" },
        { name: "Leptic ODT Tablet 0.25 mg" },
        { name: "Levopa Tablet 100/10" },
        { name: "Levopa Tablet 250/25" },
        { name: "Lifil-E Capsule 200 mg" },
        { name: "Lifil-E Capsule 400 mg" },
        { name: "Limbix Tablet 12.5/5" },
        { name: "Limbix DS Tablet 25/10" },
        { name: "Lincocin Capsule 300 mg" },
        { name: "Lino Tablet 5 mg" },
        { name: "Lino-M Tablet 2.5/500" },
        { name: "Lino-M Tablet 2.5/850" },
        { name: "Lino-M Tablet 2.5/1000" },
        { name: "Lino-M XR Tablet 5/1000" },
        { name: "Lipidof Capsule 200 mg" },
        { name: "Liptor Tablet 10 mg" },
        { name: "Liptor Tablet 20 mg" },
        { name: "Liptor Tablet 40 mg" },
        { name: "Liptor EZ Tablet 10/10" },
        { name: "Liptor EZ Tablet 20/10" },
        { name: "LM Tablet 2.5 mg" },
        { name: "LM Tablet 5 mg" },
        { name: "Logibac Suspension 60 ml" },
        { name: "Logibac Capsule 400 mg" },
        { name: "Losart Tablet 25 mg" },
        { name: "Losart Tablet 50 mg" },
        { name: "Losart Plus Tablet 50/12.5" },
        { name: "Losart Plus Tablet 100/12.5" },
        { name: "Lotemycin Suspension" },
        { name: "Lulikill Cream 1%" },
        { name: "Maxima Capsule 20 mg" },
        { name: "Maxima Capsule 40 mg" },
        { name: "Maxima Tablet 20 mg" },
        { name: "Maxima Tablet 40 mg" },
        { name: "Maxima MUPS Tablet 20 mg" },
        { name: "Maxima MUPS Tablet 40 mg" },
        { name: "Mebolin Tablet 50 mg" },
        { name: "Megenox Suspension 100 ml" },
        { name: "Menotox Syrup 200 ml" },
        { name: "Milk of Magnesia Suspension 114 ml" },
        { name: "Milk of Magnesia Plus Emulsion 120 ml" },
        { name: "Miraba Tablet 2.5 mg" },
        { name: "Miraba Tablet 5 mg" },
        { name: "Miraba Tablet 10 mg" },
        { name: "Momneed Capsule" },
        { name: "Monas Chewable Tablet 4 mg" },
        { name: "Monas Chewable Tablet 5 mg" },
        { name: "Monas Tablet 10 mg" },
        { name: "Monas OFT Flash Tablet 4 mg" },
        { name: "Monas OFT Flash Tablet 5 mg" },
        { name: "Moringa Capsule 500 mg" },
        { name: "Mouthcare Mouthwash 100 ml" },
        { name: "Mouthcare Mouthwash 200 ml" },
        { name: "Moxifix Tablet 400 mg" },
        { name: "Moxilin Capsule 250 mg" },
        { name: "Moxilin Capsule 500 mg" },
        { name: "Moxilin Suspension 100 ml" },
        { name: "Moxilin-CV Tablet 250/125" },
        { name: "Moxilin-CV Tablet 500/125" },
        { name: "Moxilin-CV Tablet 875/125" },
        { name: "Nameton Tablet 500 mg" },
        { name: "Nameton Tablet 750 mg" },
        { name: "Napro-A Tablet 250 mg" },
        { name: "Napro-A Tablet 500 mg" },
        { name: "Napro-A Plus Tablet 375/20" },
        { name: "Napro-A Plus Tablet 500/20" },
        { name: "Neobet Cream" },
        { name: "Neugalin Capsule 50 mg" },
        { name: "Neugalin Capsule 75 mg" },
        { name: "Neugalin Capsule 25 mg" },
        { name: "Neugalin Capsule 150 mg" },
        { name: "Neugalin XR Tablet 82.5 mg" },
        { name: "Neugalin XR Tablet 165 mg" },
        { name: "Nutrum 50+ 15 Tablet" },
        { name: "Nutrum 50+ 30 Tablet" },
        { name: "Nutrum Eye Capsule" },
        { name: "Nutrum Gold 15 Tablet" },
        { name: "Nutrum Gold 30 Tablet" },
        { name: "Nutrum Junior Syrup 100 ml" },
        { name: "Nutrum Kids Syrup 100 ml" },
        { name: "Nutrum PN Tablet" },
        { name: "Nystat Tablet" },
        { name: "Nystat Suspension 30 ml" },
        { name: "Nystat Plus Cream" },
        { name: "O-Cal Tablet 740 mg" },
        { name: "O-Cal Kit Tablet" },
        { name: "Olic Tablet 5 mg" },
        { name: "Olic Tablet 10 mg" },
        { name: "Omari Tablet 12.5 mg" },
        { name: "Omari Tablet 25 mg" },
        { name: "Opcol Eye Drop" },
        { name: "Orbapin Tablet 5/20" },
        { name: "Orbapin Tablet 5/40" },
        { name: "Orbas Tablet 20 mg" },
        { name: "Orbas Tablet 40 mg" },
        { name: "Orbas Plus Tablet 20/12.5" },
        { name: "Orthogen Tablet 20 mg+750 mg+50 mg+0.75 mg" },
        { name: "Oxecone Suspension 200 ml" },
        { name: "Oxecone-M Suspension 200 ml" },
        { name: "Oxecone-MS Suspension 200 ml" },
        { name: "Oxecone-S Suspension 200 ml" },
        { name: "Periset Oral Solution 50 ml" },
        { name: "Periset Tablet 8 mg" },
        { name: "Permin Cream 5% 15 gm" },
        { name: "Permin Cream 5% 30 gm" },
        { name: "Phenadryl Syrup 100 ml" },
        { name: "Pilestop Tablet 450/50" },
        { name: "Pink Pill Tablet 100 mg" },
        { name: "Pizo-A Tablet 0.5 mg" },
        { name: "Pizo-A Tablet 1.5 mg" },
        { name: "PPI Capsule 20 mg" },
        { name: "PPI Capsule 40 mg" },
        { name: "Predimax Tablet 5 mg" },
        { name: "Predimax Tablet 10 mg" },
        { name: "Predimax Tablet 20 mg" },
        { name: "Prindol Tablet 3 mg" },
        { name: "Profen Suspension 100 ml" },
        { name: "Protocid Tablet 20 mg" },
        { name: "Protocid Tablet 40 mg" },
        { name: "Rabizol Tablet 20 mg" },
        { name: "Rhinozol Nasal Drop 0.05%" },
        { name: "Rhinozol Nasal Drop 0.1%" },
        { name: "Rostab Tablet 10 mg" },
        { name: "Rostab Tablet 20 mg" },
        { name: "Rostab Tablet 5 mg" },
        { name: "Sacuva Tablet 24/26" },
        { name: "Sacuva Tablet 49/51" },
        { name: "Salflu Inhalation Capsule 50/100" },
        { name: "Salflu Inhalation Capsule 50/250" },
        { name: "Salflu Inhalation Capsule 50/500" },
        { name: "Salflu Inhaler 25/125" },
        { name: "Salflu Inhaler 25/250" },
        { name: "Salmolin Syrup 60 ml" },
        { name: "Salmolin Inhalation Capsule 200 mcg" },
        { name: "Salmolin Inhaler 200 metered doses" },
        { name: "Salmolin-L Syrup 60 ml" },
        { name: "Salpium Inhaler 200 metered doses" },
        { name: "Salmolin Refill" },
        { name: "Santonic Syrup 200 ml" },
        { name: "Santonic Syrup 450 ml" },
        { name: "Sefril Capsule 500 mg" },
        { name: "Sefril Capsule 250 mg" },
        { name: "Sefril Suspension 100 ml" },
        { name: "Setorib Tablet 60 mg" },
        { name: "Setorib Tablet 90 mg" },
        { name: "Setorib Tablet 120 mg" },
        { name: "Sevel Tablet 800 mg" },
        { name: "Skelofen Tablet 5 mg" },
        { name: "Skelofen Tablet 10 mg" },
        { name: "Solicare Tablet 5 mg" },
        { name: "Solicare Tablet 10 mg" },
        { name: "Steron Tablet 0.5 mg" },
        { name: "Sucrate Suspension 200 ml" },
        { name: "Suma Nasal Spray 60 metered spray" },
        { name: "Suma Nasal Spray 30 metered spray" },
        { name: "Tacrol Ointment 0.03% 30 gm" },
        { name: "Tacrol Ointment 0.1% 30 gm" },
        { name: "Telisa Tablet 40 mg" },
        { name: "Telisa Tablet 80 mg" },
        { name: "Telisa Plus Tablet 40/12.5" },
        { name: "Telisa Plus Tablet 80/12.5" },
        { name: "Telisa-A Tablet 5/40" },
        { name: "Telisa-A Tablet 5/80" },
        { name: "Tenil Tablet 3 mg" },
        { name: "Tenoloc Tablet 50 mg" },
        { name: "Tenoloc Tablet 100 mg" },
        { name: "Terbikill Tablet 250 mg" },
        { name: "Terbikill Cream 1% 15 gm" },
        { name: "Thenglate Syrup 100 ml" },
        { name: "Thyrolar Tablet 50 mcg" },
        { name: "Tibofem Tablet 2.5 mg" },
        { name: "Ticaflow Tablet 90 mg" },
        { name: "Ticaflow Tablet 60 mg" },
        { name: "Tinium Tablet 50 mg" },
        { name: "Topium Inhalation Capsule 18 mcg" },
        { name: "TPC Injection 3 ml" },
        { name: "TPC Tablet 100 mg+200 mg+200 mcg" },
        { name: "Tracid Tablet 500 mg" },
        { name: "Tracid Tablet 650 mg" },
        { name: "Trifera Cream 15 gm" },
        { name: "Trihale Inhalation Capsule 25 mcg+200 mcg+62.5 mcg" },
        { name: "Trihale Inhalation Capsule 25 mcg+100 mcg+62.5 mcg" },
        { name: "Trugut Capsule 9 billion" },
        { name: "Tulos Oral Solution 100 ml" },
        { name: "Twicef Capsule 500 mg" },
        { name: "Uliv Tablet 150 mg" },
        { name: "Uliv Tablet 300 mg" },
        { name: "Uricool Syrup 100 ml" },
        { name: "Uricool Syrup 200 ml" },
        { name: "Uropass Capsule 0.4 mg" },
        { name: "Uropass-D Capsule 0.4 mg+0.5 mg" },
        { name: "UTIpro Capsule" },
        { name: "V-Plex Tablet" },
        { name: "V-Plex Syrup 100 ml" },
        { name: "V-Plex Syrup 200 ml" },
        { name: "V-Plex Pediatric Drop 15 ml" },
        { name: "V-Plex Injection" },
        { name: "Vitamin B complex 2 ml" },
        { name: "V-Plex Plus Tablet" },
        { name: "Vefend Tablet 200 mg" },
        { name: "Vefend Tablet 50 mg" },
        { name: "Venesa Tablet 2 mg" },
        { name: "Verigat Tablet 2.5 mg" },
        { name: "Verigat Tablet 5 mg" },
        { name: "Verigat Tablet 10 mg" },
        { name: "Vigo-Fort Capsule 250 mg" },
        { name: "Vildapin Tablet 50 mg" },
        { name: "Vildapin Plus Tablet 50/500" },
        { name: "Vildapin Plus Tablet 50/850" },
        { name: "Vinpoton Tablet 5 mg" },
        { name: "Vir Tablet 0.5 mg" },
        { name: "Vonix Tablet 10 mg" },
        { name: "Vonix Tablet 20 mg" },
        { name: "Winop Tablet 10 mg" },
        { name: "X-Cold Syrup 100 ml" },
        { name: "X-Cold Pediatric Drop 15 ml" },
        { name: "Z-Plex Syrup 100 ml" },
        { name: "Zero Tablet 8 mg" },
        { name: "Zero Container" },
        { name: "Zilsart Tablet 40 mg" },
        { name: "Zis-DS Syrup 100 ml" },
        { name: "Zolidon Tablet 400 mg" },
        { name: "Zolidon Tablet 600 mg" }
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

export default ACME;
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
        { name: "A-B1 Tab 100 mg" },
        { name: "A-Cal Tab 500 mg" },
        { name: "A-Cal D Tab 15 Tab" },
        { name: "A-Cal D Tab 30 Tab" },
        { name: "A-Calm Tab 50 mg" },
        { name: "A-Clox Cap 500 mg" },
        { name: "A-Cof Syp 100 ml" },
        { name: "A-Fenac Tab 25 mg" },
        { name: "A-Fenac Tab 50 mg" },
        { name: "A-Fenac Suppository 50 mg" },
        { name: "A-Fenac Inj" },
        { name: "A-Fenac K Tab 50 mg" },
        { name: "A-Fenac Plus Inj" },
        { name: "A-Fenac SR Tab 100 mg" },
        { name: "A-Flox Cap 250 mg" },
        { name: "A-Flox Cap 500 mg" },
        { name: "A-Flox Suspension 100 ml" },
        { name: "A-Meb Tab 135 mg" },
        { name: "A-Migel Oral Gel" },
        { name: "A-Phenicol Eye Drop" },
        { name: "A-Phenicol D Eye Drop" },
        { name: "A-Tetra Cap 500 mg" },
        { name: "A-Zyme Tab 325 mg" },
        { name: "Acemox Tab 250 mg" },
        { name: "Aclobet Oint" },
        { name: "Aclobet-N Oint" },
        { name: "Aclobet-N Cream" },
        { name: "Acme's Basok Syp 100 ml" },
        { name: "Acme's Basok Syp 200 ml" },
        { name: "Acmina Syp 200 ml" },
        { name: "Acmina Syp 450 ml" },
        { name: "Airfors Inhaler" },
        { name: "Alanil Suspension 50 ml" },
        { name: "Alanil Tab 180 mg" },
        { name: "Alanil Tab 120 mg" },
        { name: "Alclor Pediatric Drop 15 ml" },
        { name: "Alercon Eye Drop" },
        { name: "Alercon DS Eye Drop" },
        { name: "Alia Tab 5 mg" },
        { name: "Alodia Tab 25 mg" },
        { name: "Alodia Tab 12.5 mg" },
        { name: "Alovera Tab 345 mg" },
        { name: "Amlacid Syp 200 ml" },
        { name: "Amlacid Syp 450 ml" },
        { name: "Amlopin Tab 5 mg" },
        { name: "Amlopin Tab 10 mg" },
        { name: "Amloten Tab 5/50" },
        { name: "Amloten Tab 5/25" },
        { name: "Angirid MR Tab 35 mg" },
        { name: "Angist SR Tab 2.6 mg" },
        { name: "Apitac Tab 100 mg" },
        { name: "Arjunacard Syp 200 ml" },
        { name: "Arkid Syp 100 ml" },
        { name: "Arth-A Tab 250/200" },
        { name: "Arth-A Max Tab 750/50" },
        { name: "Arth-A TS Tab 750/600" },
        { name: "Ascon-F Inhaler 100 mcg" },
        { name: "Ascon-F Inhaler 200 mcg" },
        { name: "Asmarid Syp 200 ml" },
        { name: "Aximin Tab 550 mg" },
        { name: "Aximin Tab 200 mg" },
        { name: "Azelec Cream 20%" },
        { name: "Azin Tab 500 mg" },
        { name: "Azin Cap 250 mg" },
        { name: "Azin Suspension 15 ml" },
        { name: "Azin Suspension 30 ml" },
        { name: "Azin Suspension 50 ml" },
        { name: "Azolin Nasal Drop 0.025%" },
        { name: "Azolin Nasal Drop 0.05%" },
        { name: "Ben-A Chewable Tab 400 mg" },
        { name: "Ben-A Suspension 10 ml" },
        { name: "Bet-A Oint 20 gm" },
        { name: "Bet-A Cream 20 gm" },
        { name: "Bet-A Tab 0.5 mg" },
        { name: "Bet-CL Cream 20 gm" },
        { name: "Bet-CG Cream 15 gm" },
        { name: "Bet-CL Oint 20 gm" },
        { name: "Betabis Tab 10 mg" },
        { name: "Betabis Tab 2.5 mg" },
        { name: "Betabis Tab 5 mg" },
        { name: "Betabis Plus Tab 2.5/6.25" },
        { name: "Betabis Plus Tab 5/6.25" },
        { name: "Betabis-A Tab 2.5/5" },
        { name: "Betol Oint" },
        { name: "Bihale Inhalation Cap 25/200" },
        { name: "Bihale Inhalation Cap 25/100" },
        { name: "Bilan Tab 20 mg" },
        { name: "Bilan Oral Solution 50 ml" },
        { name: "Bilan Kids Tab 10 mg" },
        { name: "Briva Tab 25 mg" },
        { name: "Briva Tab 50 mg" },
        { name: "Briva Oral Solution 50 ml" },
        { name: "Cecon Chewable Tab 250 mg" },
        { name: "Cetisoft Cap 10 mg" },
        { name: "Cetizin Tab 10 mg" },
        { name: "Cinazin Tab 15 mg" },
        { name: "Cinazin Plus Tab 20/40" },
        { name: "Cipro-A Eye Drop 0.3%" },
        { name: "Cipro-A Tab 250 mg" },
        { name: "Cipro-A Tab 500 mg" },
        { name: "Cipro-A Suspension 60 ml" },
        { name: "Cipro-D Eye Drop" },
        { name: "Citrosol Oral Solution 200 ml" },
        { name: "Claricin Tab 250 mg" },
        { name: "Claricin Suspension 60 ml" },
        { name: "Claricin Tab 500 mg" },
        { name: "Clioquin Cream 30 gm" },
        { name: "Clotrim Cream 10 gm" },
        { name: "Clotrim Cream 20 gm" },
        { name: "Cofrid Syp 100 ml" },
        { name: "Combo 4 Cream" },
        { name: "Coralex D Tab" },
        { name: "Coralex DX Tab" },
        { name: "Cortimax Tab 24 mg" },
        { name: "Cortimax Suspension 60 ml" },
        { name: "Cortimax Tab 6 mg" },
        { name: "Cosium Tab 10 mg" },
        { name: "CP Suspension 50 ml" },
        { name: "CP Pediatric Drop 15 ml" },
        { name: "Crisa Oint 2%" },
        { name: "Cystnil Tab 150/550" },
        { name: "D-gest Tab 10 mg" },
        { name: "Dactus Tab 3 mg" },
        { name: "Dactus Tab 2 mg" },
        { name: "Dactus Tab 1 mg" },
        { name: "Daomin Tab 850 mg" },
        { name: "Daomin Tab 500 mg" },
        { name: "Daomin XR Tab 1000 mg" },
        { name: "Daomin XR Tab 500 mg" },
        { name: "Dclot Tab 75 mg" },
        { name: "DDR Cap 60 mg" },
        { name: "DDR Cap 30 mg" },
        { name: "Defaz CI Cap" },
        { name: "Defrol Tab 1000 IU" },
        { name: "Defrol Cap 40000 IU" },
        { name: "Defrol Inj 200000 IU" },
        { name: "Defrol Cap 20000 IU" },
        { name: "Defrol OFT 2000 IU" },
        { name: "Defrol OS 50 ml" },
        { name: "Dequadin VT 10 mg" },
        { name: "Dermupin Oint 2%" },
        { name: "DHEA Tab 25 mg" },
        { name: "Dirozyl Tab 400 mg" },
        { name: "Dirozyl Suspension 60 ml" },
        { name: "Don-A Pediatric Drop" },
        { name: "Don-A Suspension 60 ml" },
        { name: "Don-A Tab 10 mg" },
        { name: "Dophylin Tab 400 mg" },
        { name: "Dophylin Tab 200 mg" },
        { name: "Dophylin Syp 100 ml" },
        { name: "Doxy-A Cap 100 mg" },
        { name: "Droscon Tab" },
        { name: "Dulox Tab 20 mg" },
        { name: "Dulox Tab 30 mg" },
        { name: "Duocard Tab 10 mg" },
        { name: "Duocard Tab 5 mg" },
        { name: "Easyhaler Inhaler" },
        { name: "Ecosprin Tab 81 mg" },
        { name: "Ecosprin Tab 75 mg" },
        { name: "Ecosprin Plus Tab 75/75" },
        { name: "Edemide Tab 40/50" },
        { name: "Edemide Tab 20/50" },
        { name: "Electro-K Tab 600 mg" },
        { name: "Elodep Tab 5 mg" },
        { name: "Elodep Tab 10 mg" },
        { name: "Emlino Tab 10/5" },
        { name: "Emlino Tab 25/5" },
        { name: "Enocam Tab 20 mg" },
        { name: "Ertaco Cream 2%" },
        { name: "Exinil Cream" },
        { name: "Eyedew Eye Drop" },
        { name: "Eyemox Eye Drop" },
        { name: "Eyemox-D Eye Drop" },
        { name: "Ezygut Cap 20 billion" },
        { name: "Famicef Tab 250 mg" },
        { name: "Famicef Suspension 70 ml" },
        { name: "Famicef Tab 500 mg" },
        { name: "Famiclav Suspension 70 ml" },
        { name: "Famiclav Tab 500" },
        { name: "Famiclav Tab 250" },
        { name: "Famodin Suspension 60 ml" },
        { name: "Famodin Tab 20 mg" },
        { name: "Fast Tab 500 mg" },
        { name: "Fast Suspension 60 ml" },
        { name: "Fast Suppository 500 mg" },
        { name: "Fast Suppository 250 mg" },
        { name: "Fast Suppository 125 mg" },
        { name: "Fast One Tab 1000 mg" },
        { name: "Fast Plus Tab 500/65" },
        { name: "Fast XR Tab 665 mg" },
        { name: "Fastdol Tab 325/37.5" },
        { name: "Fecilax Eff. Powder" },
        { name: "Feminor Tab 5 mg" },
        { name: "Ferroglobin Syp 200 ml" },
        { name: "Ferti-Q Cap 100 mg" },
        { name: "Ferti-Q Cap 200 mg" },
        { name: "Fezol Tab 2.5 mg" },
        { name: "Filofer Cap 30 mg" },
        { name: "Fix-A Pediatric Drop 21 ml" },
        { name: "Fix-A Cap 200 mg" },
        { name: "Fix-A Suspension 37.5 ml" },
        { name: "Fix-A Suspension 50 ml" },
        { name: "Fix-A Suspension 75 ml" },
        { name: "Fix-A DS Cap 400 mg" },
        { name: "Fix-A DS Suspension 50 ml" },
        { name: "Fix-A Max Pediatric Drop 20 ml" },
        { name: "Flatunil Pediatric Drop" },
        { name: "Fluconal Tab 50 mg" },
        { name: "Fluconal Tab 150 mg" },
        { name: "Fluconal Suspension 35 ml" },
        { name: "Fluticon Nasal Spray 120 metered sprays" },
        { name: "Fluzin Tab 5 mg" },
        { name: "Fluzin Tab 10 mg" },
        { name: "Foli Kidz Oral Solution" },
        { name: "FoliHair Cap 5000 mg" },
        { name: "FoliHair Cap 1000 mg" },
        { name: "Folix Tab 5 mg" },
        { name: "Folix Tab 15 mg" },
        { name: "Folive Tab 400 mg" },
        { name: "Fero Kid Syp" },
        { name: "Gavisus Chewable Tab" },
        { name: "Gavisus Suspension 200 ml" },
        { name: "Gavisus DX Suspension 200 ml" },
        { name: "Gliclid Tab 80 mg" },
        { name: "Gliclid MR Tab 30 mg" },
        { name: "Gliclid MR Tab 60 mg" },
        { name: "Glifo Tab 25 mg" },
        { name: "Glifo Tab 10 mg" },
        { name: "Glifo-M Tab 12.5/500" },
        { name: "Glifo-M XR Tab 5/1000" },
        { name: "Glifo-M XR Tab 25/1000" },
        { name: "Glifo-M XR Tab 10/1000" },
        { name: "Goustat Tab 40 mg" },
        { name: "Gynest Vaginal Cream 0.1%" },
        { name: "Halotaz Lotion" },
        { name: "Happysol Nasal Drop 0.9%" },
        { name: "Hepatolin Syp 200 ml" },
        { name: "Hepatolin Syp 450 ml" },
        { name: "Histalex Syp 100 ml" },
        { name: "Honeybas Syp 100 ml" },
        { name: "Imegli Tab 500 mg" },
        { name: "Indica-G Inhalation Cap 110/50" },
        { name: "Indo-A Suppository 100 mg" },
        { name: "Itopid Tab 50 mg" },
        { name: "Janmet Tab 50/500" },
        { name: "Janmet Tab 50/1000" },
        { name: "Janmet XR Tab 50/500" },
        { name: "Janvia Tab 50 mg" },
        { name: "Janvia Tab 100 mg" },
        { name: "Ketifen Tab 1 mg" },
        { name: "Ketifen Syp 100 ml" },
        { name: "Kidcare Syp 100 ml" },
        { name: "Laxofit Tab 10 mg" },
        { name: "Laxofit OS 50 ml" },
        { name: "Laxofit OS 100 ml" },
        { name: "Laxogol OS 100 ml" },
        { name: "Leanxit Tab 0.5/10" },
        { name: "Lecosav Syp 200 ml" },
        { name: "Leo Tab 500 mg" },
        { name: "Leptic Tab 0.5 mg" },
        { name: "Leptic Tab 2 mg" },
        { name: "Leptic Tab 1 mg" },
        { name: "Leptic ODT Tab 0.5 mg" },
        { name: "Leptic ODT Tab 0.25 mg" },
        { name: "Levopa Tab 100/10" },
        { name: "Levopa Tab 250/25" },
        { name: "Lifil-E Cap 200 mg" },
        { name: "Lifil-E Cap 400 mg" },
        { name: "Limbix Tab 12.5/5" },
        { name: "Limbix DS Tab 25/10" },
        { name: "Lincocin Cap 300 mg" },
        { name: "Lino Tab 5 mg" },
        { name: "Lino-M Tab 2.5/500" },
        { name: "Lino-M Tab 2.5/850" },
        { name: "Lino-M Tab 2.5/1000" },
        { name: "Lino-M XR Tab 5/1000" },
        { name: "Lipidof Cap 200 mg" },
        { name: "Liptor Tab 10 mg" },
        { name: "Liptor Tab 20 mg" },
        { name: "Liptor Tab 40 mg" },
        { name: "Liptor EZ Tab 10/10" },
        { name: "Liptor EZ Tab 20/10" },
        { name: "LM Tab 2.5 mg" },
        { name: "LM Tab 5 mg" },
        { name: "Logibac Suspension 60 ml" },
        { name: "Logibac Cap 400 mg" },
        { name: "Losart Tab 25 mg" },
        { name: "Losart Tab 50 mg" },
        { name: "Losart Plus Tab 50/12.5" },
        { name: "Losart Plus Tab 100/12.5" },
        { name: "Lotemycin Suspension" },
        { name: "Lulikill Cream 1%" },
        { name: "Maxima Cap 20 mg" },
        { name: "Maxima Cap 40 mg" },
        { name: "Maxima Tab 20 mg" },
        { name: "Maxima Tab 40 mg" },
        { name: "Maxima MUPS Tab 20 mg" },
        { name: "Maxima MUPS Tab 40 mg" },
        { name: "Mebolin Tab 50 mg" },
        { name: "Megenox Suspension 100 ml" },
        { name: "Menotox Syp 200 ml" },
        { name: "Milk of Magnesia Suspension 114 ml" },
        { name: "Milk of Magnesia Plus Emulsion 120 ml" },
        { name: "Miraba Tab 2.5 mg" },
        { name: "Miraba Tab 5 mg" },
        { name: "Miraba Tab 10 mg" },
        { name: "Momneed Cap" },
        { name: "Monas Chewable Tab 4 mg" },
        { name: "Monas Chewable Tab 5 mg" },
        { name: "Monas Tab 10 mg" },
        { name: "Monas OFT 4 mg" },
        { name: "Monas OFT 5 mg" },
        { name: "Moringa Cap 500 mg" },
        { name: "Mouthcare Mouthwash 100 ml" },
        { name: "Mouthcare Mouthwash 200 ml" },
        { name: "Moxifix Tab 400 mg" },
        { name: "Moxilin Cap 250 mg" },
        { name: "Moxilin Cap 500 mg" },
        { name: "Moxilin Suspension 100 ml" },
        { name: "Moxilin-CV Tab 375 mg" },
        { name: "Moxilin-CV Tab 625 mg" },
        { name: "Moxilin-CV Tab 1000 mg" },
        { name: "Nameton Tab 500 mg" },
        { name: "Nameton Tab 750 mg" },
        { name: "Napro-A Tab 250 mg" },
        { name: "Napro-A Tab 500 mg" },
        { name: "Napro-A Plus Tab 375/20" },
        { name: "Napro-A Plus Tab 500/20" },
        { name: "Neobet Cream" },
        { name: "Neugalin Cap 50 mg" },
        { name: "Neugalin Cap 75 mg" },
        { name: "Neugalin Cap 25 mg" },
        { name: "Neugalin Cap 150 mg" },
        { name: "Neugalin XR Tab 82.5 mg" },
        { name: "Neugalin XR Tab 165 mg" },
        { name: "Nutrum 50+ 15 Tab" },
        { name: "Nutrum 50+ 30 Tab" },
        { name: "Nutrum Eye Cap" },
        { name: "Nutrum Gold 15 Tab" },
        { name: "Nutrum Gold 30 Tab" },
        { name: "Nutrum Junior Syp 100 ml" },
        { name: "Nutrum Kids Syp 100 ml" },
        { name: "Nutrum PN Tab" },
        { name: "Nystat Tab" },
        { name: "Nystat Suspension 30 ml" },
        { name: "Nystat Plus Cream" },
        { name: "O-Cal Tab 740 mg" },
        { name: "O-Cal Kit Tab" },
        { name: "Olic Tab 5 mg" },
        { name: "Olic Tab 10 mg" },
        { name: "Omari Tab 12.5 mg" },
        { name: "Omari Tab 25 mg" },
        { name: "Opcol Eye Drop" },
        { name: "Orbapin Tab 5/20" },
        { name: "Orbapin Tab 5/40" },
        { name: "Orbas Tab 20 mg" },
        { name: "Orbas Tab 40 mg" },
        { name: "Orbas Plus Tab 20/12.5" },
        { name: "Orthogen Tab" },
        { name: "Oxecone Suspension 200 ml" },
        { name: "Oxecone-M Suspension 200 ml" },
        { name: "Oxecone-MS Suspension 200 ml" },
        { name: "Oxecone-S Suspension 200 ml" },
        { name: "Periset Oral Solution 50 ml" },
        { name: "Periset Tab 8 mg" },
        { name: "Permin Cream 5% 15 gm" },
        { name: "Permin Cream 5% 30 gm" },
        { name: "Phenadryl Syp 100 ml" },
        { name: "Pilestop Tab 450/50" },
        { name: "Pink Pill Tab 100 mg" },
        { name: "Pizo-A Tab 0.5 mg" },
        { name: "Pizo-A Tab 1.5 mg" },
        { name: "PPI Cap 20 mg" },
        { name: "PPI Cap 40 mg" },
        { name: "Predimax Tab 5 mg" },
        { name: "Predimax Tab 10 mg" },
        { name: "Predimax Tab 20 mg" },
        { name: "Prindol Tab 3 mg" },
        { name: "Profen Suspension 100 ml" },
        { name: "Protocid Tab 20 mg" },
        { name: "Protocid Tab 40 mg" },
        { name: "Rabizol Tab 20 mg" },
        { name: "Rhinozol Nasal Drop 0.05%" },
        { name: "Rhinozol Nasal Drop 0.1%" },
        { name: "Rostab EZ Tab 5/10mg" },
        { name: "Rostab EZ Tab 10/10 mg" },
        { name: "Rostab EZ Tab 20/10 mg" },
        { name: "Sacuva Tab 50 mg" },
        { name: "Sacuva Tab 100 mg" },
        { name: "Salflu Inhalation Cap 50/100" },
        { name: "Salflu Inhalation Cap 50/250" },
        { name: "Salflu Inhalation Cap 50/500" },
        { name: "Salflu Inhaler 25/125" },
        { name: "Salflu Inhaler 25/250" },
        { name: "Salmolin Syp 60 ml" },
        { name: "Salmolin Inhalation Cap 200 mcg" },
        { name: "Salmolin Inhaler 200 metered doses" },
        { name: "Salmolin-L Syp 60 ml" },
        { name: "Salpium Inhaler 200 metered doses" },
        { name: "Salmolin Refill" },
        { name: "Santonic Syp 200 ml" },
        { name: "Santonic Syp 450 ml" },
        { name: "Sefril Cap 500 mg" },
        { name: "Sefril Cap 250 mg" },
        { name: "Sefril Suspension 100 ml" },
        { name: "Setorib Tab 60 mg" },
        { name: "Setorib Tab 90 mg" },
        { name: "Setorib Tab 120 mg" },
        { name: "Sevel Tab 800 mg" },
        { name: "Skelofen Tab 5 mg" },
        { name: "Skelofen Tab 10 mg" },
        { name: "Solicare Tab 5 mg" },
        { name: "Solicare Tab 10 mg" },
        { name: "Steron Tab 0.5 mg" },
        { name: "Sucrate Suspension 200 ml" },
        { name: "Suma Nasal Spray 60 metered spray" },
        { name: "Suma Nasal Spray 30 metered spray" },
        { name: "Tacrol Oint 0.03% 30 gm" },
        { name: "Tacrol Oint 0.1% 30 gm" },
        { name: "Telisa Tab 40 mg" },
        { name: "Telisa Tab 80 mg" },
        { name: "Telisa Plus Tab 40/12.5" },
        { name: "Telisa Plus Tab 80/12.5" },
        { name: "Telisa-A Tab 5/40" },
        { name: "Telisa-A Tab 5/80" },
        { name: "Tenil Tab 3 mg" },
        { name: "Tenoloc Tab 50 mg" },
        { name: "Tenoloc Tab 100 mg" },
        { name: "Terbikill Tab 250 mg" },
        { name: "Terbikill Cream 1% 15 gm" },
        { name: "Thenglate Syp 100 ml" },
        { name: "Thyrolar Tab 50 mcg" },
        { name: "Tibofem Tab 2.5 mg" },
        { name: "Ticaflow Tab 90 mg" },
        { name: "Ticaflow Tab 60 mg" },
        { name: "Tinium Tab 50 mg" },
        { name: "Topium Inhalation Cap 18 mg" },
        { name: "TPC Inj 3 ml" },
        { name: "TPC Tab" },
        { name: "Tracid Tab 500 mg" },
        { name: "Tracid Tab 650 mg" },
        { name: "Trifera Cream 15 gm" },
        { name: "Trihale Inhalation Cap 100 mg" },
        { name: "Trihale Inhalation Cap 200 mg" },
        { name: "Trugut Cap 9 billion" },
        { name: "Tulos OS 100 ml" },
        { name: "Twicef Cap 500 mg" },
        { name: "Uliv Tab 150 mg" },
        { name: "Uliv Tab 300 mg" },
        { name: "Uricool Syp 100 ml" },
        { name: "Uricool Syp 200 ml" },
        { name: "Uropass Cap 0.4 mg" },
        { name: "Uropass-D Cap" },
        { name: "UTIpro Cap" },
        { name: "V-Plex Tab" },
        { name: "V-Plex Syp 100 ml" },
        { name: "V-Plex Syp 200 ml" },
        { name: "V-Plex Pediatric Drop 15 ml" },
        { name: "V-Plex Inj" },
        { name: "V-Plex Plus Tab" },
        { name: "Vefend Tab 200 mg" },
        { name: "Vefend Tab 50 mg" },
        { name: "Venesa Tab 2 mg" },
        { name: "Verigat Tab 2.5 mg" },
        { name: "Verigat Tab 5 mg" },
        { name: "Verigat Tab 10 mg" },
        { name: "Vigo-Fort Cap 250 mg" },
        { name: "Vildapin Tab 50 mg" },
        { name: "Vildapin Plus Tab 50/500" },
        { name: "Vildapin Plus Tab 50/850" },
        { name: "Vinpoton Tab 5 mg" },
        { name: "Vir Tab 0.5 mg" },
        { name: "Vonix Tab 10 mg" },
        { name: "Vonix Tab 20 mg" },
        { name: "Winop Tab 10 mg" },
        { name: "X-Cold Syp 100 ml" },
        { name: "X-Cold Pediatric Drop 15 ml" },
        { name: "Z-Plex Syp 100 ml" },
        { name: "Zero Tab 8 mg" },
        { name: "Zero Container" },
        { name: "Zilsart Tab 40 mg" },
        { name: "Zis-DS Syp 100 ml" },
        { name: "Zolidon Tab 400 mg" },
        { name: "Zolidon Tab 600 mg" },
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

export default ACME;
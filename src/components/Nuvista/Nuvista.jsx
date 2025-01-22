// import { useState } from 'react';
// import jsPDF from 'jspdf';

// const Nuvista = () => {
//     const [values, setValues] = useState({});
//     const [selectedItems, setSelectedItems] = useState([]);

//     const handleChange = (e, itemName) => {
//         const value = e.target.value;
//         if (!value || /^[1-9]\d*$/.test(value)) {
//             setValues(prevValues => ({
//                 ...prevValues,
//                 [itemName]: value
//             }));
//         }
//     };

//     const handleSelect = (itemName, itemType) => {
//         setSelectedItems(prevItems => {
//             const itemExists = prevItems.find(item => item.name === itemName);
//             if (itemExists) {
//                 return prevItems.map(item =>
//                     item.name === itemName ? { ...item, quantity: values[itemName] } : item
//                 );
//             } else {
//                 return [...prevItems, { name: itemName, type: itemType, quantity: values[itemName] }];
//             }
//         });
//     };

//     const handleUpdateSelectedItem = (e, itemName) => {
//         const value = e.target.value;
//         if (!value || /^[1-9]\d*$/.test(value)) {
//             setSelectedItems(prevItems =>
//                 prevItems.map(item =>
//                     item.name === itemName ? { ...item, quantity: value } : item
//                 )
//             );
//         }
//     };

//     const handleBuyNow = () => {
//         const doc = new jsPDF();
//         let yPosition = 10;

//         // Set header
//         doc.setFontSize(20);
//         doc.setTextColor('Black');
//         doc.text("Niaz Pharmacy", 10, yPosition);
//         yPosition += 10;
//         const date = new Date().toLocaleDateString(); // Get current date
//         doc.setFontSize(12);
//         doc.text(`Date: ${date}`, 200, 10, { align: 'right' }); // Add date to PDF header
//         yPosition += 10;

//         // Set column headers
//         doc.setFontSize(12);
//         doc.setTextColor('black');
//         doc.setFont('helvetica', 'bold');
//         doc.text("Items Name", 10, yPosition);
//         doc.text("Quantity", 105, yPosition, { align: 'center' }); // Adjust position as needed
//         yPosition += 10;

//         // Draw a line under the header
//         doc.line(5, yPosition, 200, yPosition); // Adjust line length if needed
//         yPosition += 10;

//         // Set font for items
//         doc.setFont('helvetica', 'normal');

//         selectedItems.forEach(item => {
//             doc.text(item.name, 10, yPosition);

//             // Calculate position for quantity to be right-aligned
//             const quantityWidth = doc.getTextWidth(item.quantity.toString());
//             const quantityX = 105 - quantityWidth; // Right-align the quantity
//             doc.text(item.quantity.toString(), quantityX, yPosition); // Right-aligned quantity
//             yPosition += 10;
//         });

//         doc.save('Nuvista Pharma.pdf');
//     };


//     const items = [
//         { name: 'Allygest Tablet 5 mg' },
//         { name: 'Cortiflo Tablet 6 mg' },
//         { name: 'Deca-Durabolin Inj.50 mg' },
//         { name: 'Delanzo 30mg Capsule' },
//         { name: 'Dinogest Tablet 2 mg' },
//         { name: 'Dydron F.C. Tablet 10mg' },
//         { name: 'Elisa F.C. Tablet' },
//         { name: 'Freemax F.C. Tablet 100 mg' },
//         { name: 'Linda-S DS Injection 10 I.U.' },
//         { name: 'Lynes Tablet' },
//         { name: 'Marvelon Tablet' },
//         { name: 'Microlon Tablet' },
//         { name: 'Norestin Tablet 5 mg' },
//         { name: 'Oradexon Tablet 0.5 mg' },
//         { name: 'Orgatril Tablet 5 mg' },
//         { name: 'Ovestin Tablet 1 mg' },
//         { name: 'Ovostat Gold Tablet' },
//         { name: 'Roxadex Injection 5 mg' },
//         { name: 'Thyronor 25 Tablet' },
//         { name: 'Tibilon Tablet 2.5 mg' },
//         { name: 'Traxyl Capsule 500 mg' },
//         { name: 'Visceralgine F.C. Tablet 50 mg' },
//         { name: 'Zoleta F.C. Tablet 2.5 mg' },
//         { name: 'Thyronor 12.50' },
//         { name: 'Thyronor 50' },
//         { name: 'Thyronor 75' },
//         { name: 'Thyronor 100' }
//     ].sort((a, b) => a.name.localeCompare(b.name));

//     return (
//         <div className='mx-3'>
//             <h2 className='text-lg font-medium'></h2>
//             <div className='my-2'>
//                 <hr />
//             </div>
//             <div>
//                 {items.map(item => (
//                     <div key={item.name} className='grid grid-cols-4 items-center gap-2'>
//                         <p className='col-span-2'>{item.name} <small>{item.type}</small></p>
//                         <input
//                             className='border border-green-200 text-center py-3 px-2 rounded-lg'
//                             type="number"
//                             value={values[item.name] || ''}
//                             onChange={(e) => handleChange(e, item.name)}
//                             min="1"
//                         />
//                         <button
//                             className={`btn text-white rounded-xl ${values[item.name] ? 'bg-purple-300' : 'bg-gray-300 cursor-not-allowed'}`}
//                             disabled={!values[item.name]}
//                             onClick={() => handleSelect(item.name, item.type)}
//                         >
//                             Select
//                         </button>
//                     </div>
//                 ))}
//             </div>
//             <div className='mt-10'>
//                 <hr />
//                 <h2>Selected Items here:</h2>
//                 <ul>
//                     {selectedItems.map((item, index) => (
//                         <li key={index} className='grid grid-cols-4 items-center gap-2'>
//                             <p className='col-span-2'>{item.name} <small>{item.type}</small></p>
//                             <input
//                                 className='border border-green-200 py-3 px-2 rounded-lg text-center'
//                                 type="number"
//                                 value={item.quantity}
//                                 onChange={(e) => handleUpdateSelectedItem(e, item.name)}
//                                 min="1"
//                             />
//                         </li>
//                     ))}
//                 </ul>
//                 <button className='btn my-5 bg-blue-500 text-white text-xl' onClick={handleBuyNow}>Generate Order Sheet</button>
//             </div>
//         </div>
//     );
// };

// export default Nuvista;
import { useState } from 'react';
import { toJpeg } from 'html-to-image';

const Nuvista = () => {
    const [values, setValues] = useState({});
    const [selectedItems, setSelectedItems] = useState([]);

    const handleChange = (e, itemName) => {
        const value = e.target.value;
        if (!value || /^[1-9]\d*$/.test(value)) {
            setValues(prevValues => ({
                ...prevValues,
                [itemName]: value
            }));
        }
    };

    const handleSelect = (itemName, itemType) => {
        setSelectedItems(prevItems => {
            const itemExists = prevItems.find(item => item.name === itemName);
            if (itemExists) {
                return prevItems.map(item =>
                    item.name === itemName ? { ...item, quantity: values[itemName] } : item
                );
            } else {
                return [...prevItems, { name: itemName, type: itemType, quantity: values[itemName] }];
            }
        });
    };

    const handleUpdateSelectedItem = (e, itemName) => {
        const value = e.target.value;
        if (!value || /^[1-9]\d*$/.test(value)) {
            setSelectedItems(prevItems =>
                prevItems.map(item =>
                    item.name === itemName ? { ...item, quantity: value } : item
                )
            );
        }
    };

    const handleGenerateJPG = () => {
        const orderSheetElement = document.getElementById('order-sheet');
        toJpeg(orderSheetElement, { quality: 0.95 })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = 'OrderSheet.jpg';
                link.click();
            })
            .catch((error) => {
                console.error('Failed to generate image:', error);
            });
    };

    const items = [
        { name: 'Allygest Tablet 5 mg' },
        { name: 'Cortiflo Tablet 6 mg' },
        { name: 'Deca-Durabolin Inj.50 mg' },
        { name: 'Delanzo 30mg Capsule' },
        { name: 'Dinogest Tablet 2 mg' },
        { name: 'Dydron F.C. Tablet 10mg' },
        { name: 'Elisa F.C. Tablet' },
        { name: 'Freemax F.C. Tablet 100 mg' },
        { name: 'Linda-S DS Injection 10 I.U.' },
        { name: 'Lynes Tablet' },
        { name: 'Marvelon Tablet' },
        { name: 'Microlon Tablet' },
        { name: 'Norestin Tablet 5 mg' },
        { name: 'Oradexon Tablet 0.5 mg' },
        { name: 'Orgatril Tablet 5 mg' },
        { name: 'Ovestin Tablet 1 mg' },
        { name: 'Ovostat Gold Tablet' },
        { name: 'Roxadex Injection 5 mg' },
        { name: 'Thyronor 25 Tablet' },
        { name: 'Tibilon Tablet 2.5 mg' },
        { name: 'Traxyl Capsule 500 mg' },
        { name: 'Visceralgine F.C. Tablet 50 mg' },
        { name: 'Zoleta F.C. Tablet 2.5 mg' },
        { name: 'Thyronor 12.50' },
        { name: 'Thyronor 50' },
        { name: 'Thyronor 75' },
        { name: 'Thyronor 100' }
    ].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="mx-3">
            <h2 className="text-lg font-medium"></h2>
            <div className="my-2">
                <hr />
            </div>
            <div>
                {items.map(item => (
                    <div key={item.name} className="grid grid-cols-4 items-center gap-2">
                        <p className="col-span-2">{item.name} <small>{item.type}</small></p>
                        <input
                            className="border border-green-200 text-center py-3 px-2 rounded-lg"
                            type="number"
                            value={values[item.name] || ''}
                            onChange={(e) => handleChange(e, item.name)}
                            min="1"
                        />
                        <button
                            className={`btn text-white rounded-xl ${values[item.name] ? 'bg-purple-300' : 'bg-gray-300 cursor-not-allowed'}`}
                            disabled={!values[item.name]}
                            onClick={() => handleSelect(item.name, item.type)}
                        >
                            Select
                        </button>
                    </div>
                ))}
            </div>
            <div className="mt-10">
                <hr />
                <h2>Selected Items:</h2>
                <div id="order-sheet" className="bg-white p-5 shadow-md rounded-lg">
                    <h2 className="text-center text-2xl font-bold">Niaz Pharmacy</h2>
                    <p className="text-center">Date: {new Date().toLocaleDateString()}</p>
                    <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-2 py-1">Item Name</th>
                                <th className="border border-gray-300 px-2 py-1">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedItems.map((item, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 px-2 py-1">{item.name}</td>
                                    <td className="border border-gray-300 px-2 py-1">{item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button className="btn my-5 bg-blue-500 text-white text-xl" onClick={handleGenerateJPG}>
                    Generate JPG Order Sheet
                </button>
            </div>
        </div>
    );
};

export default Nuvista;
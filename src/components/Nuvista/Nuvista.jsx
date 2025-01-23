import { useState } from "react";
import html2canvas from "html2canvas";

const Nuvista = () => {
    const [values, setValues] = useState({});
    const [selectedItems, setSelectedItems] = useState([]);

    const handleChange = (e, itemName) => {
        const value = e.target.value;
        if (!value || /^[1-9]\d*$/.test(value)) {
            setValues((prevValues) => ({
                ...prevValues,
                [itemName]: value,
            }));
        }
    };

    const handleSelect = (itemName) => {
        setSelectedItems((prevItems) => {
            const itemExists = prevItems.find((item) => item.name === itemName);
            if (itemExists) {
                return prevItems.map((item) =>
                    item.name === itemName ? { ...item, quantity: values[itemName] } : item
                );
            } else {
                return [...prevItems, { name: itemName, quantity: values[itemName] }];
            }
        });
    };

    const handleGenerateImage = () => {
        const element = document.getElementById("order-sheet");
        html2canvas(element, { useCORS: true, backgroundColor: "#fff" })
            .then((canvas) => {
                const image = canvas.toDataURL("image/jpeg", 1.0);
                const link = document.createElement("a");
                link.download = "Nuvista_Order_Sheet.jpg";
                link.href = image;
                link.click();
            })
            .catch((error) => {
                console.error("Error generating image:", error);
            });
    };

    const items = [
        { name: "Item A" },
        { name: "Item B" },
        { name: "Item C" },
        { name: "Item D" },
        { name: "Item E" },
    ].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="mx-3">
            <h2 className="text-lg font-medium">Nuvista Order Sheet</h2>
            <div className="my-2">
                <hr />
            </div>
            <div>
                {items.map((item) => (
                    <div key={item.name} className="grid grid-cols-4 items-center gap-2">
                        <p className="col-span-2">{item.name}</p>
                        <input
                            className="border border-green-200 text-center py-3 px-2 rounded-lg"
                            type="number"
                            value={values[item.name] || ""}
                            onChange={(e) => handleChange(e, item.name)}
                            min="1"
                        />
                        <button
                            className={`btn text-white rounded-xl ${
                                values[item.name] ? "bg-purple-300" : "bg-gray-300 cursor-not-allowed"
                            }`}
                            disabled={!values[item.name]}
                            onClick={() => handleSelect(item.name)}
                        >
                            Select
                        </button>
                    </div>
                ))}
            </div>
            <div className="mt-10">
                <hr />
                <h2>Selected Items:</h2>
                <div id="order-sheet" className="border p-4 bg-white shadow-md">
                    <h3 className="text-lg font-bold">Nuvista Order Sheet</h3>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left">Item Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedItems.map((item, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {item.quantity}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button
                    className="btn my-5 bg-blue-500 text-white text-xl"
                    onClick={handleGenerateImage}
                >
                    Generate JPG Order Sheet
                </button>
            </div>
        </div>
    );
};

export default Nuvista;
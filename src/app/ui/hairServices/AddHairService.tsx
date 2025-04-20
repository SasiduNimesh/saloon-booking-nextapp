"use client"

import { useState } from "react";

const AddHairService = ({ setShowForm , onServiceAdded }: { setShowForm: (show: boolean) => void; onServiceAdded: () => void; }) => {

  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    price: "",
    image: null as File | null // Update this to handle file input
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files) {
      setFormData(prev => ({ ...prev, image: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("duration", formData.duration);
      formDataToSend.append("price", formData.price);
      
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await fetch("http://localhost:3000/api/hairService", {
          method: "POST",
          body: formDataToSend,
      });

      if (response.ok) {
          alert("Hair service added successfully!");
          setFormData({ name: "", duration: "", price: "", image: null });
          onServiceAdded();         
          setShowForm(false);
      } else {
          alert("Error adding service.");
      }
  };


  return (
  <div className="fixed inset-0 flex items-center justify-center bg-black opacity-85">
    <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Add New Hair Service</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-3">
            <label className="block text-sm font-medium">Service Name :</label>
            <input type="text" name="name" className="w-full border p-2 rounded" placeholder="Enter service name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
            <label className="block text-sm font-medium">$ Price :</label>
            <input type="number" name="price" className="w-full border p-2 rounded" placeholder="Enter price" value={formData.price} onChange={handleChange} required/>
        </div>
        <div className="mb-3">
            <label className="block text-sm font-medium">Duration :</label>
            <input type="text" name="duration" className="w-full border p-2 rounded" placeholder="Ex :- 1h 15min" value={formData.duration} onChange={handleChange} required/>
        </div>
        <div className="mb-3">
            <label className="block text-sm font-medium">Select Image :</label>
            <input type="file" name="image" className="w-full border p-2 rounded" onChange={handleChange} required />
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Save</button>
        </div>
      </form>
    </div>
  </div>
  )
};

export default AddHairService;
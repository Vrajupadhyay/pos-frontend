import React, { useState, useEffect } from 'react';

export default function CRUDManager() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [selectOption, setSelectOption] = useState('');
  const [radioOption, setRadioOption] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [showToast, setShowToast] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('crud_items');
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('crud_items', JSON.stringify(items));
  }, [items]);

  const handleAdd = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !age.trim() || !selectOption || !radioOption) return;

    const newItem = {
      name,
      email,
      age,
      option: selectOption,
      radio: radioOption,
    };

    if (editingIndex !== null) {
      const updated = [...items];
      updated[editingIndex] = newItem;
      setItems(updated);
      setEditingIndex(null);
    } else {
      setItems([...items, newItem]);
    }

    // Show toast notification
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    setName('');
    setEmail('');
    setAge('');
    setSelectOption('');
    setRadioOption('');
  };

  const handleEdit = (index) => {
    setName(items[index].name);
    setEmail(items[index].email);
    setAge(items[index].age);
    setSelectOption(items[index].option);
    setRadioOption(items[index].radio);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const filtered = items.filter((_, i) => i !== index);
    setItems(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">📝 CRUD Manager</h2>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-md shadow-md">
          <p className="text-center">Item Submitted!</p>
        </div>
      )}

      {/* Form for Adding/Editing Items */}
      <form onSubmit={handleAdd} className="space-y-4 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col">
          <label className="text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter full name"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter age"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Select Dropdown */}
        <div className="flex flex-col">
          <label className="text-gray-700">Select Option</label>
          <select
            value={selectOption}
            onChange={(e) => setSelectOption(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Select Option</option>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
          </select>
        </div>

        {/* Radio Buttons */}
        <div className="flex flex-col space-y-2">
          <span className="text-gray-700">Select Radio Option</span>
          <label className="flex items-center">
            <input
              type="radio"
              name="radio"
              value="Radio 1"
              checked={radioOption === 'Radio 1'}
              onChange={() => setRadioOption('Radio 1')}
              className="mr-2"
            />
            Radio 1
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="radio"
              value="Radio 2"
              checked={radioOption === 'Radio 2'}
              onChange={() => setRadioOption('Radio 2')}
              className="mr-2"
            />
            Radio 2
          </label>
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            {editingIndex !== null ? 'Update' : 'Add'} Item
          </button>
        </div>
      </form>

      {/* Item List */}
      <ul className="divide-y mt-6">
        {items.map((item, index) => (
          <li key={index} className="py-3 flex justify-between items-center bg-gray-50 rounded-md p-4 mb-2">
            <div className="flex flex-col space-y-1">
              <span className="font-semibold">{item.name}</span>
              <span>{item.email}</span>
              <span>{item.age}</span>
              <span>{item.option}</span>
              <span>{item.radio}</span>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(index)}
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

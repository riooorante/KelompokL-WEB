import React, { useState } from 'react';
import SideNavbar from '../components/SideNavbar';

function ListNarapidana() {
  const [data, setData] = useState([
    { id: 1, nama: 'John Doe' },
    // Tambahkan data lainnya di sini
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    id: '',
    nama: ''
  });

  const handleEditData = (index, item) => {
    setEditIndex(index);
    setEditForm(item);
  };

  const handleUpdateData = () => {
    const updatedData = [...data];
    updatedData[editIndex] = editForm;
    setData(updatedData);
    setEditIndex(null);
    setEditForm({
      id: '',
      nama: ''
    });
  };

  const handleTambahData = () => {
    setData([...data, { id: data.length + 1, nama: '' }]);
  };

  const handleHapusData = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  const handleCheckProfil = (index) => {
    // Logika untuk menampilkan profil narapidana, misalnya dengan router push ke halaman profil narapidana
  };

  const handleBatalEdit = () => {
    setEditIndex(null);
    setEditForm({
      id: '',
      nama: ''
    });
  };

  return (
    <div className="flex">
      <SideNavbar />
      <div className="flex-1 ml-60">
        <h1 className="text-2xl font-bold mb-4 mt-4 ml-4">List Narapidana</h1>
        <div className="overflow-x-auto">
          <table className="min-w-min border-collapse border border-gray-300 ml-4">
            <thead>
              <tr>
                <th className="border border-gray-300 px-2 py-1">No</th>
                <th className="border border-gray-300 px-2 py-1">ID</th>
                <th className="border border-gray-300 px-2 py-1">Nama</th>
                <th className="border border-gray-300 px-2 py-1">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-2 py-1">{index + 1}</td>
                  <td className="border border-gray-300 px-2 py-1">{item.id}</td>
                  <td className="border border-gray-300 px-2 py-1">{editIndex === index ? <input value={editForm.nama} onChange={(e) => setEditForm({ ...editForm, nama: e.target.value })} /> : item.nama}</td>
                  <td className="border border-gray-300 px-2 py-1">
                    {editIndex === index ? (
                      <>
                        <button onClick={handleUpdateData} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2">Simpan</button>
                        <button onClick={handleBatalEdit} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded mr-2">Batal</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEditData(index, item)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">Edit</button>
                        <button onClick={() => handleHapusData(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2">Hapus</button>
                        <button onClick={() => handleCheckProfil(index)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">Check Profil</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 ml-4">
            <button onClick={handleTambahData} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Tambah Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListNarapidana;

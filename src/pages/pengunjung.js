import React, { useState } from 'react';
import SideNavbar from '../components/SideNavbar';

function IzinKunjungan() {
  const [data, setData] = useState([
    { id: 1, namaNarapidana: 'John Doe', tanggal: '2024-06-08', namaPengunjung: 'Jane Doe', keterangan: 'Kunjungan Keluarga' },
    // Tambahkan data lainnya di sini
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    id: '',
    namaPengunjung: ''
  });

  const handleEditData = (index, item) => {
    setEditIndex(index);
    setEditForm({ id: item.id, namaPengunjung: item.namaPengunjung });
  };

  const handleUpdateData = () => {
    const updatedData = [...data];
    updatedData[editIndex] = { ...updatedData[editIndex], ...editForm };
    setData(updatedData);
    setEditIndex(null);
    setEditForm({
      id: '',
      namaPengunjung: ''
    });
  };

  const handleTambahData = () => {
    setData([...data, { id: data.length + 1, namaPengunjung: '' }]);
  };

  const handleHapusData = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  return (
    <div className="flex">
      <SideNavbar />
      <div className="flex-1 ml-60">
        <h1 className="text-2xl font-bold mb-4 mt-4 ml-4">Daftar Pengunjung</h1>
        <div className="overflow-x-auto">
          <table className="min-w-min border-collapse border border-gray-300 ml-4">
            <thead>
              <tr>
                <th className="border border-gray-300 px-2 py-1">No</th>
                <th className="border border-gray-300 px-2 py-1">ID Izin</th>
                <th className="border border-gray-300 px-2 py-1">Nama Pengunjung</th>
                <th className="border border-gray-300 px-2 py-1">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-2 py-1">{index + 1}</td>
                  <td className="border border-gray-300 px-2 py-1">{item.id}</td>
                  <td className="border border-gray-300 px-2 py-1">
                    {editIndex === index ? (
                      <input 
                        value={editForm.namaPengunjung} 
                        onChange={(e) => setEditForm({ ...editForm, namaPengunjung: e.target.value })} 
                      />
                    ) : (
                      item.namaPengunjung
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {editIndex === index ? (
                      <>
                        <button 
                          onClick={handleUpdateData} 
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                        >
                          Simpan
                        </button>
                        <button 
                          onClick={() => {
                            setEditIndex(null);
                            setEditForm({ id: '', namaPengunjung: '' });
                          }} 
                          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
                        >
                          Batal
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => handleEditData(index, item)} 
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleHapusData(index)} 
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        >
                          Hapus
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 ml-4">
            <button 
              onClick={handleTambahData} 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Tambah Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IzinKunjungan;

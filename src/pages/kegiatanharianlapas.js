// pages/kegiatan-harian-lapas.js

import React, { useState } from 'react';
import SideNavbar from '../components/SideNavbar';

function KegiatanHarianLapas() {
  const [data, setData] = useState([
    { id: 1, namaKegiatan: 'Senam Pagi', namaStaff: 'John Doe', tanggal: '2024-06-08', tempat: 'Lapangan', deskripsi: 'Senam pagi untuk narapidana' },
    // Tambahkan data lainnya di sini
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    namaKegiatan: '',
    namaStaff: '',
    tanggal: '',
    tempat: '',
    deskripsi: ''
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
      namaKegiatan: '',
      namaStaff: '',
      tanggal: '',
      tempat: '',
      deskripsi: ''
    });
  };

  const handleTambahData = () => {
    setData([...data, { id: data.length + 1, namaKegiatan: '', namaStaff: '', tanggal: '', tempat: '', deskripsi: '' }]);
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
        <h1 className="text-2xl font-bold mb-4 mt-4 ml-4">Kegiatan Harian Lapas</h1>
        <div className="overflow-x-auto">
          <table className="min-w-min border-collapse border border-gray-300 ml-4">
            <thead>
              <tr>
                <th className="border border-gray-300 px-2 py-1">No</th>
                <th className="border border-gray-300 px-2 py-1">Nama Kegiatan</th>
                <th className="border border-gray-300 px-2 py-1">Nama Staff</th>
                <th className="border border-gray-300 px-2 py-1">Tanggal</th>
                <th className="border border-gray-300 px-2 py-1">Tempat</th>
                <th className="border border-gray-300 px-2 py-1">Deskripsi</th>
                <th className="border border-gray-300 px-2 py-1">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-2 py-1">{index + 1}</td>
                  <td className="border border-gray-300 px-2 py-1">
                    {editIndex === index ? (
                      <input value={editForm.namaKegiatan} onChange={(e) => setEditForm({ ...editForm, namaKegiatan: e.target.value })} className="w-full" />
                    ) : (
                      <span>{item.namaKegiatan}</span>
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {editIndex === index ? (
                      <input value={editForm.namaStaff} onChange={(e) => setEditForm({ ...editForm, namaStaff: e.target.value })} className="w-full" />
                    ) : (
                      <span>{item.namaStaff}</span>
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {editIndex === index ? (
                      <input value={editForm.tanggal} onChange={(e) => setEditForm({ ...editForm, tanggal: e.target.value })} className="w-full" />
                    ) : (
                      <span>{item.tanggal}</span>
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {editIndex === index ? (
                      <input value={editForm.tempat} onChange={(e) => setEditForm({ ...editForm, tempat: e.target.value })} className="w-full" />
                    ) : (
                      <span>{item.tempat}</span>
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {editIndex === index ? (
                      <input value={editForm.deskripsi} onChange={(e) => setEditForm({ ...editForm, deskripsi: e.target.value })} className="w-full" />
                    ) : (
                      <span>{item.deskripsi}</span>
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {editIndex === index ? (
                      <div className="flex flex-col">
                        <button onClick={handleUpdateData} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mb-1">
                          Simpan
                        </button>
                        <button onClick={() => setEditIndex(null)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded">
                          Batal
                        </button>
                      </div>
                    ) : (
                      <div className="flex">
                        <button onClick={() => handleEditData(index, item)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">
                          Edit
                        </button>
                        <button onClick={() => handleHapusData(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                          Hapus
                        </button>
                      </div>
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

export default KegiatanHarianLapas;

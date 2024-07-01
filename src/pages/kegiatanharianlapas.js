import React, { useState, useEffect } from 'react';
import SideNavbar from '../components/SideNavbar';
import withAuth from "../components/withAuth";

function KegiatanHarianLapas() {
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    nomor_kegiatan: '',
    tanggal_kegiatan: '',
    deskripsi_kegiatan: '',
    lokasi: '',
    penanggung_jawab: ''
  });

  const [isAdding, setIsAdding] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/kegiatan-harian/get-kegiatan-harian', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          }
        });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleTambahData = () => {
    setEditForm({
      nomor_kegiatan: (data.length + 1).toString(),
      tanggal_kegiatan: '', 
      deskripsi_kegiatan: '',
      lokasi: '',
      penanggung_jawab: ''
    });
  
    setIsAdding(true);
    setIsEdit(false);
    setEditIndex(data.length);
    setData([
      ...data,
      {
        nomor_kegiatan: (data.length + 1).toString(),
        tanggal_kegiatan: '',
        deskripsi_kegiatan: '',
        lokasi: '',
        penanggung_jawab: ''
      }
    ]);
  };
  

  const handleEditData = (index, item) => {
    setEditIndex(index);
    setEditForm({
      nomor_kegiatan: item.nomor_kegiatan,
      tanggal_kegiatan: item.tanggal_kegiatan,
      deskripsi_kegiatan: item.deskripsi_kegiatan,
      lokasi: item.lokasi,
      penanggung_jawab: item.penanggung_jawab
    });
    setIsAdding(false);
    setIsEdit(true);
  };

  const handleSaveData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/kegiatan-harian/create-kegiatan-harian', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({
          nomor_kegiatan: editForm.nomor_kegiatan,
          tanggal_kegiatan: editForm.tanggal_kegiatan,
          deskripsi_kegiatan: editForm.deskripsi_kegiatan,
          lokasi: editForm.lokasi,
          penanggung_jawab: editForm.penanggung_jawab
        })
      });
      if (!response.ok) {
        throw new Error('Failed to add data');
      }
      const newData = await response.json();
      setData([...data, newData]); // Menambahkan data baru ke state
      setIsAdding(false);
      setEditForm({
        nomor_kegiatan: '',
        tanggal_kegiatan: '',
        deskripsi_kegiatan: '',
        lokasi: '',
        penanggung_jawab: ''
      });
      setEditIndex(null);
      fetchData(); // Memuat ulang data setelah penambahan berhasil
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Gagal menambah data, silakan coba lagi.');
    }
  };
  
  const handleUpdateData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/kegiatan-harian/update-kegiatan-harian/${editForm.nomor_kegiatan}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({
          nomor_kegiatan: editForm.nomor_kegiatan,
          tanggal_kegiatan: editForm.tanggal_kegiatan,
          deskripsi_kegiatan: editForm.deskripsi_kegiatan,
          lokasi: editForm.lokasi,
          penanggung_jawab: editForm.penanggung_jawab
        })
      });
      if (!response.ok) {
        throw new Error('Failed to update data');
      }
      const updatedData = [...data];
      updatedData[editIndex] = editForm;
      setData(updatedData);
      setEditIndex(null);
      setEditForm({
        nomor_kegiatan: '',
        tanggal_kegiatan: '',
        deskripsi_kegiatan: '',
        lokasi: '',
        penanggung_jawab: ''
      });
      setIsEdit(false);
      fetchData(); // Memuat ulang data setelah update berhasil
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Gagal mengupdate data, silakan coba lagi.');
    }
  };
  

  const handleHapusData = async (index, nomor_kegiatan) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/kegiatan-harian/delete-kegiatan-harian/${nomor_kegiatan}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete data');
      }
      const updatedData = [...data];
      updatedData.splice(index, 1);
      setData(updatedData);
    } catch (error) {
      console.error('Error deleting data:', error);
      alert('Gagal menghapus data, silakan coba lagi.');
    }
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
                <th className="border border-gray-300 px-2 py-1">Tanggal Kegiatan</th>
                <th className="border border-gray-300 px-2 py-1">Deskripsi Kegiatan</th>
                <th className="border border-gray-300 px-2 py-1">Lokasi</th>
                <th className="border border-gray-300 px-2 py-1">Penanggung Jawab</th>
                <th className="border border-gray-300 px-2 py-1">Aksi</th>
              </tr>
            </thead>
            <tbody>
  {data.map((item, index) => (
    <tr key={item.nomor_kegiatan}> {/* Ensure 'nomor_kegiatan' or another unique identifier is used */}
      <td className="border border-gray-300 px-2 py-1">{index + 1}</td>
      <td className="border border-gray-300 px-2 py-1">
        {editIndex === index ? (
          <input
            type="date"
            value={editForm.tanggal_kegiatan}
            onChange={(e) => setEditForm({ ...editForm, tanggal_kegiatan: e.target.value })}
            className="w-full"
          />
        ) : (
          <span>{item.tanggal_kegiatan}</span>
        )}
      </td>
      <td className="border border-gray-300 px-2 py-1">
        {editIndex === index ? (
          <input
            value={editForm.deskripsi_kegiatan}
            onChange={(e) => setEditForm({ ...editForm, deskripsi_kegiatan: e.target.value })}
            className="w-full"
          />
        ) : (
          <span>{item.deskripsi_kegiatan}</span>
        )}
      </td>
      <td className="border border-gray-300 px-2 py-1">
        {editIndex === index ? (
          <input
            value={editForm.lokasi}
            onChange={(e) => setEditForm({ ...editForm, lokasi: e.target.value })}
            className="w-full"
          />
        ) : (
          <span>{item.lokasi}</span>
        )}
      </td>
      <td className="border border-gray-300 px-2 py-1">
        {editIndex === index ? (
          <input
            value={editForm.penanggung_jawab}
            onChange={(e) => setEditForm({ ...editForm, penanggung_jawab: e.target.value })}
            className="w-full"
          />
        ) : (
          <span>{item.penanggung_jawab}</span>
        )}
      </td>
      <td className="border border-gray-300 px-2 py-1">
        {editIndex === index ? (
          <div className="flex flex-col">
            <button onClick={isAdding ? handleSaveData : handleUpdateData} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mb-1">
              {isAdding ? 'Tambah' : 'Simpan'}
            </button>
            <button onClick={() => {
              setEditIndex(null);
              setIsAdding(false);
              setIsEdit(false);
              setEditForm({
                nomor_kegiatan: '',
                tanggal_kegiatan: '',
                deskripsi_kegiatan: '',
                lokasi: '',
                penanggung_jawab: ''
              });
              const newData = [...data];
              if (isAdding) {
                newData.pop(); // Hapus baris baru jika dalam mode penambahan dan batal
              }
              setData(newData);
            }} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded">
              Batal
            </button>
          </div>
        ) : (
          <div className="flex">
            <button onClick={() => handleEditData(index, item)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1">
              Edit
            </button>
            <button onClick={() => handleHapusData(index, item.nomor_kegiatan)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
              Hapus
            </button>
          </div>
        )}
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
        <div className="ml-4 mt-4">
          <button onClick={handleTambahData} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Tambah Data
          </button>
        </div>
      </div>
    </div>
  );
}

export default withAuth(KegiatanHarianLapas);

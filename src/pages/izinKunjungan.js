import React, { useState, useEffect } from 'react';
import SideNavbar from '../components/SideNavbar';
import withAuth from "../components/withAuth";

function IzinKunjungan() {
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    nomor_izin: '',
    nomor_narapidana: '',
    waktu_kunjungan: '',
    keterangan: '',
    penanggung_jawab: ''
  });
  const [isAdding, setIsAdding] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/izin-kunjungan/get-izin-kunjungan', {
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
    const nextNomorIzin = data.length > 0 
      ? Math.max(...data.map(item => parseInt(item.nomor_izin, 10))) + 1 
      : 1;

    setEditForm({
      nomor_izin: nextNomorIzin.toString(),
      nomor_narapidana: '',
      waktu_kunjungan: '',
      keterangan: '',
      penanggung_jawab: ''
    });
  
    setIsAdding(true);
    setIsEdit(false);
    setEditIndex(data.length);
    setData([
      ...data,
      {
        nomor_izin: nextNomorIzin.toString(),
        nomor_narapidana: '',
        waktu_kunjungan: '',
        keterangan: '',
        penanggung_jawab: ''
      }
    ]);
  };

  const handleEditData = (index, item) => {
    setEditIndex(index);
    setEditForm({
      nomor_izin: item.nomor_izin,
      nomor_narapidana: item.nomor_narapidana,
      waktu_kunjungan: item.waktu_kunjungan,
      keterangan: item.keterangan,
      penanggung_jawab: item.penanggung_jawab
    });
    setIsAdding(false);
    setIsEdit(true);
  };

  const handleSaveData = async () => {
    try {
      const response = await fetch('http://localhost:8000/izin-kunjungan/create-izin-kunjungan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({
          nomor_izin: editForm.nomor_izin,
          nomor_narapidana: editForm.nomor_narapidana,
          waktu_kunjungan: editForm.waktu_kunjungan,
          keterangan: editForm.keterangan,
          penanggung_jawab: editForm.penanggung_jawab
        })
      });
      if (!response.ok) {
        throw new Error('Failed to add data');
      }
      const newData = await response.json();
      setData([...data, newData]);
      setIsAdding(false);
      setEditForm({
        nomor_izin: '',
        nomor_narapidana: '',
        waktu_kunjungan: '',
        keterangan: '',
        penanggung_jawab: ''
      });
      setEditIndex(null);
      fetchData(); // Refresh data after successful addition
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Gagal menambah data, silakan coba lagi.');
    }
  };

  const handleUpdateData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/izin-kunjungan/update-izin-kunjungan/${editForm.nomor_izin}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({
          nomor_izin: editForm.nomor_izin,
          nomor_narapidana: editForm.nomor_narapidana,
          waktu_kunjungan: editForm.waktu_kunjungan,
          keterangan: editForm.keterangan,
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
        nomor_izin: '',
        nomor_narapidana: '',
        waktu_kunjungan: '',
        keterangan: '',
        penanggung_jawab: ''
      });
      setIsEdit(false);
      fetchData(); // Refresh data after successful update
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Gagal mengupdate data, silakan coba lagi.');
    }
  };

  const handleHapusData = async (index, nomor_izin) => {
    try {
      const response = await fetch(`http://localhost:8000/izin-kunjungan/delete-izin-kunjungan/${nomor_izin}`, {
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
        <h1 className="text-2xl font-bold mb-4 mt-4 ml-4">Izin Kunjungan</h1>
        <div className="overflow-x-auto">
          <table className="min-w-min border-collapse border border-gray-300 ml-4">
            <thead>
              <tr>
                <th className="border border-gray-300 px-2 py-1">Nomor Izin</th>
                <th className="border border-gray-300 px-2 py-1">Nomor Narapidana</th>
                <th className="border border-gray-300 px-2 py-1">Waktu Kunjungan</th>
                <th className="border border-gray-300 px-2 py-1">Keterangan</th>
                <th className="border border-gray-300 px-2 py-1">Penanggung Jawab</th>
                <th className="border border-gray-300 px-2 py-1">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.nomor_izin}>
                  <td className="border border-gray-300 px-2 py-1">{item.nomor_izin}</td>
                  <td className="border border-gray-300 px-2 py-1">
                    {editIndex === index ? (
                      <input
                        value={editForm.nomor_narapidana}
                        onChange={(e) => setEditForm({ ...editForm, nomor_narapidana: e.target.value })}
                      />
                    ) : (
                      item.nomor_narapidana
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {editIndex === index ? (
                      <input
                        type='datetime-local'
                        value={editForm.waktu_kunjungan}
                        onChange={(e) => setEditForm({ ...editForm, waktu_kunjungan: e.target.value })}
                      />
                    ) : (
                      new Date(item.waktu_kunjungan).toLocaleString()
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {editIndex === index ? (
                      <input
                        value={editForm.keterangan}
                        onChange={(e) => setEditForm({ ...editForm, keterangan: e.target.value })}
                      />
                    ) : (
                      item.keterangan
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {editIndex === index ? (
                      <input
                        value={editForm.penanggung_jawab}
                        onChange={(e) => setEditForm({ ...editForm, penanggung_jawab: e.target.value })}
                      />
                    ) : (
                      item.penanggung_jawab
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
                            nomor_izin: '',
                            nomor_narapidana: '',
                            waktu_kunjungan: '',
                            keterangan: '',
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
                        <button onClick={() => handleHapusData(index, item.nomor_izin)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
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

export default withAuth(IzinKunjungan);

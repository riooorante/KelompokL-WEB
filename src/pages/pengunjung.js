import React, { useState, useEffect } from 'react';
import SideNavbar from '../components/SideNavbar';
import withAuth from '../components/withAuth';

function Pengunjung() {
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    id_pengunjung: '',
    nama_pengunjung: '',
    nomor_izin: '',
  });
  const [isAdding, setIsAdding] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/pengunjung/get-pengunjung', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
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
    const newId = data.length > 0 ? data.length + 1 : 1;
    setEditForm({
      id_pengunjung: newId.toString(),
      nama_pengunjung: '',
      nomor_izin: '',
    });
    setIsAdding(true);
    setIsEdit(false);
    setEditIndex(data.length); // Set editIndex to the new index
    setData([
      ...data,
      {
        id_pengunjung: newId.toString(),
        nama_pengunjung: '',
        nomor_izin: '',
      },
    ]);
  };

  const handleEditData = (index, item) => {
    setEditIndex(index);
    setEditForm({
      id_pengunjung: item.id_pengunjung,
      nama_pengunjung: item.nama_pengunjung,
      nomor_izin: item.nomor_izin,
    });
    setIsAdding(false);
    setIsEdit(true);
  };

  const handleSavePengunjung = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/pengunjung/create-pengunjung', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify({
          id_pengunjung: editForm.id_pengunjung,
          nama_pengunjung: editForm.nama_pengunjung,
          nomor_izin: editForm.nomor_izin,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add data');
      }
      const newData = await response.json();
      setData([...data, newData]); // Add new data to state
      setIsAdding(false);
      setEditForm({
        id_pengunjung: '',
        nama_pengunjung: '',
        nomor_izin: '',
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
      const response = await fetch(
        `http://127.0.0.1:8000/pengunjung/update-pengunjung/${editForm.id_pengunjung}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
          },
          body: JSON.stringify({
            id_pengunjung: editForm.id_pengunjung,
            nama_pengunjung: editForm.nama_pengunjung,
            nomor_izin: editForm.nomor_izin,
          }),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update data');
      }
      const updatedData = [...data];
      updatedData[editIndex] = editForm;
      setData(updatedData);
      setEditIndex(null);
      setEditForm({
        id_pengunjung: '',
        nama_pengunjung: '',
        nomor_izin: '',
      });
      setIsEdit(false);
      fetchData(); // Refresh data after successful update
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Gagal mengupdate data, silakan coba lagi.');
    }
  };

  const handleHapusData = async (index, id_pengunjung) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/pengunjung/delete-pengunjung/${id_pengunjung}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to delete data');
      }
      const updatedData = [...data];
      updatedData.splice(index, 1);
      setData(updatedData);
      fetchData(); // Refresh data after successful deletion
    } catch (error) {
      console.error('Error deleting data:', error);
      alert('Gagal menghapus data, silakan coba lagi.');
    }
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
                <th className="border border-gray-300 px-2 py-1">Nama Pengunjung</th>
                <th className="border border-gray-300 px-2 py-1">Nomor Izin</th>
                <th className="border border-gray-300 px-2 py-1">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-2 py-1">{item.id_pengunjung}</td>
                  <td className="border border-gray-300 px-2 py-1">
                    {editIndex === index ? (
                      <input
                        value={editForm.nama_pengunjung}
                        onChange={(e) =>
                          setEditForm({ ...editForm, nama_pengunjung: e.target.value })
                        }
                      />
                    ) : (
                      item.nama_pengunjung
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {editIndex === index ? (
                      <input
                        value={editForm.nomor_izin}
                        onChange={(e) =>
                          setEditForm({ ...editForm, nomor_izin: e.target.value })
                        }
                      />
                    ) : (
                      item.nomor_izin
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {editIndex === index ? (
                      <>
                        <button
                          onClick={isAdding ? handleSavePengunjung : handleUpdateData}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                        >
                          {isAdding ? 'Simpan' : 'Update'}
                        </button>
                        <button
                          onClick={() => {
                            setEditIndex(null);
                            setIsAdding(false);
                            setIsEdit(false);
                            setEditForm({
                              id_pengunjung: '',
                              nama_pengunjung: '',
                              nomor_izin: '',
                            });
                            const newData = [...data];
                            if (isAdding) {
                              newData.pop(); // Remove new row if in adding mode and canceled
                            }
                            setData(newData);
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
                          onClick={() => handleHapusData(index, item.id_pengunjung)}
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
        </div>
        <button
          onClick={handleTambahData}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
        >
          Tambah Pengunjung
        </button>
      </div>
    </div>
  );
}

export default withAuth(Pengunjung);

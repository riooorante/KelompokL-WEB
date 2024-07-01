import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SideNavbar from '../components/SideNavbar';
import withAuth from "../components/withAuth";;

function ListNarapidana() {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://127.0.0.1:8000/narapidana/get-narapidana/", {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Authorization": token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleTambahData = () => {
    router.push('/tambahNarapidana'); 
  };

  const handleHapusData = async (index) => {
    const confirmed = window.confirm('Apakah Anda yakin ingin menghapus data ini?');
    if (confirmed) {
      const token = localStorage.getItem("token");
      const narapidanaId = data[index].nomor_narapidana;
      try {
        const response = await fetch(`http://127.0.0.1:8000/narapidana/delete-narapidana/${narapidanaId}/`, {
          method: "DELETE",
          headers: {
            "Authorization": token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete data");
        }

        const updatedData = [...data];
        updatedData.splice(index, 1);
        setData(updatedData);
      } catch (error) {
        console.error("Error deleting data:", error);
        alert("Gagal menghapus data, silakan coba lagi.");
      }
    }
  };

  const handleCheckProfil = (index) => {
    const narapidanaId = data[index].nomor_narapidana;
    router.push(`/profileNarapidana?id=${narapidanaId}`);
  };

  const handleCheckSuratNarapidana = (index) => {
    const narapidanaId = data[index].nomor_narapidana; 
    router.push(`/suratNarapidana?id=${narapidanaId}`); 
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
                <th className="border border-gray-300 px-2 py-1">Nomor Tahanan</th>
                <th className="border border-gray-300 px-2 py-1">Nama</th>
                <th className="border border-gray-300 px-2 py-1">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-2 py-1">{index + 1}</td>
                  <td className="border border-gray-300 px-2 py-1">{item.nomor_narapidana}</td>
                  <td className="border border-gray-300 px-2 py-1">{item.nama}</td>
                  <td className="border border-gray-300 px-2 py-1">
                    <button
                      onClick={() => handleHapusData(index)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      Hapus
                    </button>
                    <button
                      onClick={() => handleCheckProfil(index)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      Check Profil
                    </button>
                    <button
                      onClick={() => handleCheckSuratNarapidana(index)} 
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Check Surat
                    </button>
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

export default withAuth(ListNarapidana);

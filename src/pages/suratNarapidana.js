import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import withAuth from "../components/withAuth";

const SuratNarapidana = () => {
  const router = useRouter();
  const { id } = router.query;
  const [prisonerData, setPrisonerData] = useState({
    nomor_narapidana: '',
    nomor_surat: '',
    keterangan: '',
    tanggal_penerbitan: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) {
          setIsEditing(true);
          return;
        }

        const response = await fetch(`http://127.0.0.1:8000/surat-perintah-penahanan/get-surat-narapidana/${id}`, {
          headers: {
            "Accept": "application/json",
            "Authorization": localStorage.getItem("token"),
          },
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil data surat penahanan!");
        }

        const data = await response.json();
        setPrisonerData({
          nomor_narapidana: data.nomor_narapidana,
          nomor_surat: data.nomor_surat,
          keterangan: data.keterangan,
          tanggal_penerbitan: data.tanggal_penerbitan
        });
      } catch (error) {
        console.error("Error fetching surat penahanan:", error);
        setIsEditing(true);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setPrisonerData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const { nomor_surat, keterangan, tanggal_penerbitan, } = prisonerData;

    if (!nomor_surat || !keterangan || !tanggal_penerbitan) {
      setError('Semua bidang harus diisi.');
      return;
    }

    setError('');

    const postData = {
      nomor_surat: prisonerData.nomor_surat,
      tanggal_penerbitan: prisonerData.tanggal_penerbitan,
      keterangan: prisonerData.keterangan,
      nomor_narapidana: prisonerData.nomor_narapidana,
    };
    

    try {
      console.log(prisonerData.nomor_narapidana)
      const response = await fetch(`http://127.0.0.1:8000/surat-perintah-penahanan/update-surat/${prisonerData.nomor_surat}`, {
        method: 'PUT',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token"),
        },
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        throw new Error("Gagal memperbarui data surat penahanan!");
      }

      fetchData()
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating surat penahanan:", error);
      setError("Terjadi kesalahan saat memperbarui data. Silakan coba lagi.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleBack = () => {
    router.push('/listnarapidana');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-3/4 lg:w-2/3 xl:w-1/2">
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 bg-gray-200 rounded-full mb-4">
            <img
              className="rounded-full"
              src="/profilee.png"
              alt="Profile"
              width={128}
              height={128}
            />
          </div>
          <h2 className="text-3xl font-semibold mb-4">Tahanan {prisonerData.nomor_narapidana}</h2>
        </div>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nomor_surat">
              Nomor Surat Penahanan
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nomor_surat"
              type="text"
              value={prisonerData.nomor_surat}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tanggal_penerbitan">
              Tanggal Penerbitan
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="tanggal_penerbitan"
              type="date"
              value={prisonerData.tanggal_penerbitan}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="keterangan">
              Keterangan
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="keterangan"
              type="text"
              value={prisonerData.keterangan}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          {error && (
            <div className="col-span-2 text-red-500 text-center font-bold mb-4">
              {error}
            </div>
          )}
          {!isEditing ? (
            <div className="col-span-2 flex items-center justify-center space-x-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleEdit}
              >
                Edit Data
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleBack}
              >
                Back
              </button>
            </div>
          ) : (
            <div className="col-span-2 flex items-center justify-center space-x-4">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSave}
              >
                Simpan
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleCancel}
              >
                Batalkan
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default withAuth(SuratNarapidana);

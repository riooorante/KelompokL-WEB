import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import withAuth from "../components/withAuth";

const AddNarapidana = () => {
  const router = useRouter();
  const [prisonerData, setPrisonerData] = useState({
    nomor_narapidana: '',
    nama: '',
    tanggal_masuk: '',
    tanggal_lahir: '',
    deskripsi_kasus: '',
    nomor_kamar: '',
  });

  const [suratData, setSuratData] = useState({
    nomor_surat: '',
    tanggal_penerbitan: '',
    keterangan: '',
    nomor_narapidana: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [maxDate, setMaxDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate());
    setMaxDate(minDate.toISOString().split('T')[0]); // Format YYYY-MM-DD
  }, []);

  const handleInputChange = (e, setState) => {
    const { id, value } = e.target;
    setState((prevData) => ({
      ...prevData,
      [id]: value
    }));
    console.log(`${id} updated:`, value); // Log setiap perubahan input
  };

  const handleSave = async () => {
    const { nomor_narapidana, nama, tanggal_masuk, tanggal_lahir, deskripsi_kasus, nomor_kamar } = prisonerData;
    const { nomor_surat, tanggal_penerbitan, keterangan } = suratData;

    console.log('Data yang akan dikirim:', { prisonerData, suratData }); // Logging data sebelum dikirim

    if (!nama || !nomor_narapidana || !tanggal_masuk || !deskripsi_kasus || !nomor_kamar || !tanggal_lahir || !nomor_surat || !tanggal_penerbitan || !keterangan) {
      setErrorMessage('Mohon mengisi seluruh formulir');
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setErrorMessage('Token otorisasi tidak ditemukan. Silakan login kembali.');
      return;
    }

    try {
      // Send prisoner data
      const prisonerResponse = await fetch("http://127.0.0.1:8000/narapidana/create-narapidana", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify(prisonerData)
      });

      if (!prisonerResponse.ok) {
        const errorData = await prisonerResponse.json();
        throw new Error(`Error: ${prisonerResponse.status} - ${errorData.message || 'Unknown error'}`);
      }

      const suratResponse = await fetch('http://127.0.0.1:8000/surat-perintah-penahanan/create-surat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({
          nomor_surat,
          tanggal_penerbitan,
          keterangan,
          nomor_narapidana: prisonerData.nomor_narapidana // Use nomor_narapidana from prisonerData
        }),
      });

      if (!suratResponse.ok) {
        throw new Error('Gagal menyimpan data surat narapidana');
      }

      setPrisonerData({
        nama: '',
        nomor_narapidana: '',
        tanggal_masuk: '',
        deskripsi_kasus: '',
        nomor_kamar: '',
        tanggal_lahir: ''
      });
      setSuratData({
        nomor_surat: '',
        tanggal_penerbitan: '',
        keterangan: '',
        nomor_narapidana: ''
      });
      router.push('/listnarapidana');
    } catch (error) {
      console.error('Error creating prisoner or saving surat:', error);
      setErrorMessage('Terjadi kesalahan saat menyimpan data. Silakan coba lagi.');
    }
  };

  const handleCancel = () => {
    router.push('/listnarapidana');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white m-10 p-8 rounded-lg shadow-md w-3/4 lg:w-2/3 xl:w-1/2">
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
          <h2 className="text-3xl font-semibold mb-4">Tambah Data Narapidana & Surat</h2>
        </div>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nama">
              Nama
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nama"
              type="text"
              value={prisonerData.nama}
              onChange={(e) => handleInputChange(e, setPrisonerData)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nomor_narapidana">
              Nomor Narapidana
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nomor_narapidana"
              type="text"
              value={prisonerData.nomor_narapidana}
              onChange={(e) => {
                handleInputChange(e, setPrisonerData);
                handleInputChange(e, setSuratData); // Update nomor_narapidana in suratData as well
              }}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tanggal_masuk">
              Tanggal Masuk
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="tanggal_masuk"
              type="date"
              value={prisonerData.tanggal_masuk}
              onChange={(e) => handleInputChange(e, setPrisonerData)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tanggal_lahir">
              Tanggal Lahir
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="tanggal_lahir"
              type="date"
              value={prisonerData.tanggal_lahir}
              onChange={(e) => handleInputChange(e, setPrisonerData)}
              max={maxDate} // Set maksimal tanggal yang bisa dipilih
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nomor_kamar">
              Nomor Kamar
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nomor_kamar"
              type="text"
              value={prisonerData.nomor_kamar}
              onChange={(e) => handleInputChange(e, setPrisonerData)}
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deskripsi_kasus">
              Deskripsi Kasus
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="deskripsi_kasus"
              rows="3"
              value={prisonerData.deskripsi_kasus}
              onChange={(e) => handleInputChange(e, setPrisonerData)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nomor_surat">
              Nomor Surat
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nomor_surat"
              type="text"
              value={suratData.nomor_surat}
              onChange={(e) => handleInputChange(e, setSuratData)}
              required
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
              value={suratData.tanggal_penerbitan}
              onChange={(e) => handleInputChange(e, setSuratData)}
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="keterangan">
              Keterangan
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="keterangan"
              rows="3"
              value={suratData.keterangan}
              onChange={(e) => handleInputChange(e, setSuratData)}
              required
            />
          </div>
          {errorMessage && (
            <p className="col-span-2 text-red-500 text-xs italic">{errorMessage}</p>
          )}
          <div className="col-span-2 flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded-lg mr-4"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withAuth(AddNarapidana);

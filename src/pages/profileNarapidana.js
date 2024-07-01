import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import withAuth from "../components/withAuth";

const Profile = () => {
  const router = useRouter();

  const [profileData, setProfileData] = useState({
    nama: '',
    nomor_narapidana: '',
    tanggal_masuk: '',
    tanggal_lahir: '',
    deskripsi_kasus: '',
    nomor_kamar: '',
  });
  const [initialProfileData, setInitialProfileData] = useState({
    nama: '',
    nomor_narapidana: '',
    tanggal_masuk: '',
    tanggal_lahir: '',
    deskripsi_kasus: '',
    nomor_kamar: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const { id } = router.query;

  const fetchData = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://127.0.0.1:8000/narapidana/get-narapidana/${id}`, {
        headers: {
          "Accept": "application/json",
          "Authorization": token,
        },
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil data!");
      }

      const data = await response.json();
      setProfileData(data);
      setInitialProfileData(data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    const isValid = Object.values(profileData).every((val) => val !== '');
    setIsFormValid(isValid);
  }, [profileData]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://127.0.0.1:8000/narapidana/update-narapidana/${profileData.nomor_narapidana}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error("Gagal mengupdate data!");
      }

      const updatedData = await response.json();
      setProfileData(updatedData);
      setInitialProfileData(updatedData);
      setIsEditing(false);
      
      // Re-fetch data after save
      await fetchData();

    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCancel = () => {
    setProfileData(initialProfileData);
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
          <h2 className="text-3xl font-semibold mb-4">{profileData.nama}</h2>
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
              value={profileData.nama || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nomor_narapidana">
              Nomor Tahanan
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nomor_narapidana"
              type="text"
              value={profileData.nomor_narapidana || ''}
              onChange={handleInputChange}
              disabled
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
              value={profileData.tanggal_masuk || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
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
              value={profileData.tanggal_lahir || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
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
              value={profileData.nomor_kamar || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deskripsi_kasus">
              Deskripsi Kasus
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="deskripsi_kasus"
              rows="3"
              value={profileData.deskripsi_kasus || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="col-span-2 flex items-center justify-center">
            {!isEditing ? (
              <div className="space-x-4">
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
              <div className="space-x-4">
                <button
                  className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                  type="button"
                  onClick={handleSave}
                  disabled={!isFormValid}
                >
                  Save
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default withAuth(Profile);

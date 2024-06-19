import React, { useState } from 'react';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: 'Sumanto',
    nik: '89998888777766',
    tanggalMasuk: '01-01-2001',
    deskripsiKasus: 'Maling ayam pas idul adha',
    nomorKamar: '09',
    idSuratPenahanan: '123',
    namaStafKejaksaan: 'Agus Supriadi',
    tanggalPenerbitan: '10-10-2010'
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Implement save functionality here, such as sending data to server
    setIsEditing(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-3/4 lg:w-2/3 xl:w-1/2">
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 bg-gray-200 rounded-full mb-4">
            <img
              className="rounded-full"
              src="/profilee.png" // Ganti dengan path ke gambar profil Anda
              alt="Profile"
              width={128}
              height={128}
            />
          </div>
          <h2 className="text-3xl font-semibold mb-4">{profileData.name}</h2>
        </div>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nama
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              value={profileData.name}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nik">
              NIK
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nik"
              type="text"
              value={profileData.nik}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tanggalMasuk">
              Tanggal Masuk
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="tanggalMasuk"
              type="text"
              value={profileData.tanggalMasuk}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deskripsiKasus">
              Deskripsi Kasus
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="deskripsiKasus"
              rows="3"
              value={profileData.deskripsiKasus}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nomorKamar">
              Nomor Kamar
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nomorKamar"
              type="text"
              value={profileData.nomorKamar}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="idSuratPenahanan">
              ID Surat Penahanan
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="idSuratPenahanan"
              type="text"
              value={profileData.idSuratPenahanan}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="namaStafKejaksaan">
              Nama Staf Kejaksaan
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="namaStafKejaksaan"
              type="text"
              value={profileData.namaStafKejaksaan}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tanggalPenerbitan">
              Tanggal Penerbitan
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="tanggalPenerbitan"
              type="text"
              value={profileData.tanggalPenerbitan}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="col-span-2 flex items-center justify-center">
          <button
                className={`${
                    isEditing ? 'bg-green-500 hover:bg-green-700' : 'bg-blue-500 hover:bg-blue-700'
                } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                type="button"
                onClick={isEditing ? handleSave : handleEdit}
                >
                {isEditing ? 'Save Profile Details' : 'Edit Profile Details'}
                </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;

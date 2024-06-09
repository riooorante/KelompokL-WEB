import React, { useState } from "react";
import SideNavbar from "../components/SideNavbar";

function ProfilePage() {
  // Data profil awal
  const initialProfileData = {
    name: "John Doe",
    username: "johndoe123",
    nip: "1234567890",
    role: "Admin",
  };

  // State untuk menyimpan data profil
  const [profileData, setProfileData] = useState(initialProfileData);

  // Fungsi untuk mengubah data profil
  const handleProfileDataChange = (field, value) => {
    setProfileData({ ...profileData, [field]: value });
  };

  // Fungsi untuk menyimpan perubahan pada data profil
  const saveProfileChanges = () => {
    // Lakukan logika penyimpanan perubahan di sini
    console.log("Data profil yang diperbarui:", profileData);
  };

  return (
    <div>
      <SideNavbar />
      <div className="ml-60 mt-40 mr-10">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-4">Profil</h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-gray-600">Nama:</h3>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => handleProfileDataChange("name", e.target.value)}
                className="border border-gray-400 rounded-md px-3 py-2 w-full"
              />
            </div>
            <div>
              <h3 className="text-gray-600">Username:</h3>
              <input
                type="text"
                value={profileData.username}
                onChange={(e) => handleProfileDataChange("username", e.target.value)}
                className="border border-gray-400 rounded-md px-3 py-2 w-full"
              />
            </div>
            <div>
              <h3 className="text-gray-600">NIP:</h3>
              <input
                type="text"
                value={profileData.nip}
                onChange={(e) => handleProfileDataChange("nip", e.target.value)}
                className="border border-gray-400 rounded-md px-3 py-2 w-full"
              />
            </div>
            <div>
              <h3 className="text-gray-600">Role:</h3>
              <p>{profileData.role}</p> {/* Menampilkan teks statis untuk bidang Role */}
            </div>
          </div>
          <button
            onClick={saveProfileChanges}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

import React, { useState, useEffect } from "react";
import SideNavbar from "../components/SideNavbar";
import withAuth from "../components/withAuth";

function ProfilePage() {
  // State untuk menyimpan data profil
  const [profileData, setProfileData] = useState({
    name: "",
    nomor_kepegawaian: "",
    role: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setProfileData({
        name: user.nama,
        nomor_kepegawaian: user.nomor_kepegawaian,
        role: user.role,
      });
    }
  }, []);

  return (
    <div>
      <SideNavbar />
      <div className="ml-60 mt-40 mr-10">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-4">Profil</h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nama">
                Nama Staff
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nama"
                type="input"
                value={profileData.name}
                disabled
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nomor_kepegawaian">
                Nomor Induk Pegawai
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nomor_kepegawaian"
                type="input"
                value={profileData.nomor_kepegawaian}
                disabled
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                Role
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="role"
                type="input"
                value={profileData.role}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(ProfilePage);

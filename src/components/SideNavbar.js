import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineLogout,
  MdOutlineAdd,
  MdOutlineVerifiedUser,
  MdOutlineListAlt,
  MdOutlineSchedule,
  MdOutlinePeopleAlt,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/router";

function SideNavbar() {
  const router = useRouter();
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

  const handleAddAccount = () => {
    router.push("/signup");
  };

  const handleProfilePage = () => {
    router.push("/ProfilePage");
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch('http://127.0.0.1:8000/logout', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          "Authorization": token,
        }
      });

      if (response.ok) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        router.push("/login");
      } else {
        const data = await response.json();
        alert(data.detail || 'Logout failed!');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('Terjadi kesalahan saat melakukan logout');
    }
  };

  const handleIzinKunjungan = () => {
    router.push("/izinKunjungan");
  };

  const handleDashboard = () => {
    router.push("/dashboard");
  };

  const handleListNarapidana = () => {
    router.push("/listnarapidana");
  };

  const handleListPengguna = () => {
    router.push("/daftarPengguna");
  };

  const handleKegiatanHarian = () => {
    router.push("/kegiatanharianlapas");
  };

  const handleDaftarPengunjung = () => {
    router.push("/pengunjung");
  };

  return (
    <div>
      <Disclosure as="nav">
        <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <GiHamburgerMenu
            className="block md:hidden h-6 w-6"
            aria-hidden="true"
          />
        </Disclosure.Button>
        <div className="p-6 w-1/2 h-screen bg-white z-20 fixed top-0 -left-96 lg:left-0 lg:w-60 peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start item-center">
            <h1 className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full">
              Menu
            </h1>
            <div className="my-4 border-b border-gray-100 pb-4">
              <div
                onClick={handleDashboard}
                className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
              >
                <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                  Dashboard
                </h3>
              </div>
              <div
                onClick={handleProfilePage}
                className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
              >
                <CgProfile className="text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                  Profile
                </h3>
              </div>
              {profileData.role === "admin" && (
                <div>
                  <div className="my-2 border-b border-gray-100 pb-2">
                    <div
                      onClick={handleAddAccount}
                      className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
                    >
                      <MdOutlineAdd className="text-2xl text-gray-600 group-hover:text-white" />
                      <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                        Tambah Akun
                      </h3>
                    </div>
                  </div>
                  <div className="my-2 border-b border-gray-100 pb-2">
                    <div
                      onClick={handleListPengguna}
                      className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
                    >
                      <MdOutlineListAlt className="text-2xl text-gray-600 group-hover:text-white" />
                      <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                        List Akun
                      </h3>
                    </div>
                  </div>
                </div>
              )}
              <div
                onClick={handleIzinKunjungan}
                className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
              >
                <MdOutlineVerifiedUser className="text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                  Izin Kunjungan
                </h3>
              </div>
              <div
                onClick={handleDaftarPengunjung}
                className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
              >
                <MdOutlinePeopleAlt className="text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                  Daftar Pengunjung
                </h3>
              </div>
              <div
                onClick={handleListNarapidana}
                className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
              >
                <MdOutlineListAlt className="text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                  List Narapidana
                </h3>
              </div>
              <div
                onClick={handleKegiatanHarian}
                className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
              >
                <MdOutlineSchedule className="text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                  Kegiatan Harian Lapas
                </h3>
              </div>
            </div>
            <div onClick={handleLogout} className="my-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                  Logout
                </h3>
              </div>
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}

export default SideNavbar;

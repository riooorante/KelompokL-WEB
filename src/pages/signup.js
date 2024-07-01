import { useState } from 'react';
import SideNavbar from "../components/SideNavbar";
import withAuth from "../components/withAuth";

function Signup() {
  const [name, setName] = useState('');
  const [nip, setNip] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('staff lapas');
  const [showNotification, setShowNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowNotification(false);
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Password dan konfirmasi password tidak cocok.');
      return;
    }

    const payload = {
      nomor_kepegawaian: nip,
      nama: name,
      password: password,
      role: role,
    };

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://127.0.0.1:8000/pengguna/create-pengguna", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setName('');
      setNip('');
      setPassword('');
      setConfirmPassword('');
      setRole('staff lapas');
      setShowNotification(true);
    } catch (error) {
      console.error('Error creating user:', error);
      setErrorMessage('Terjadi kesalahan saat membuat akun. Silakan coba lagi.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideNavbar />
      <div className="flex flex-col items-center justify-center flex-1 p-10">
        <h2 className="text-2xl font-bold mb-6 text-center">TAMBAH AKUN</h2>
        <div className="w-full max-w-sm">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">Nama</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="nip" className="block text-gray-700">Nomor Induk Kepegawaian</label>
              <input
                type="text"
                id="nip"
                value={nip}
                onChange={(e) => setNip(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700">Konfirmasi Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="role" className="block text-gray-700">Role</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded"
              >
                <option value="staff lapas">Staff Lapas</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition duration-200"
            >
              BUAT AKUN
            </button>
            {showNotification && (
              <div className="bg-green-100 border mt-6 border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Berhasil!</strong>
                <span className="block sm:inline"> Akun berhasil dibuat.</span>
                <span
                  className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
                  onClick={() => setShowNotification(false)}
                >
                  <svg
                    className="fill-current h-6 w-6 text-green-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 5.652a.5.5 0 1 1 .707.707L10.707 10l4.348 4.348a.5.5 0 0 1-.707.707L10 10.707l-4.348 4.348a.5.5 0 1 1-.707-.707L9.293 10 4.945 5.652a.5.5 0 1 1 .707-.707L10 9.293l4.348-4.348z" />
                  </svg>
                </span>
              </div>
            )}
            {errorMessage && (
              <div className="bg-red-100 border mt-6 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {errorMessage}</span>
                <span
                  className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
                  onClick={() => setErrorMessage('')}
                >
                  <svg
                    className="fill-current h-6 w-6 text-red-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 5.652a.5.5 0 1 1 .707.707L10.707 10l4.348 4.348a.5.5 0 0 1-.707.707L10 10.707l-4.348 4.348a.5.5 0 1 1-.707-.707L9.293 10 4.945 5.652a.5.5 0 1 1 .707-.707L10 9.293l4.348-4.348z" />
                  </svg>
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Signup);

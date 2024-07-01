import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Login() {
  const router = useRouter();
  const [nomor_kepegawaian, setNomorKepegawaian] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const url = `http://127.0.0.1:8000/login?nomor_kepegawaian=${nomor_kepegawaian}&password=${password}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        }
      });

      const data = await res.json();

      if (res.ok) {
        const token = data.Authorization;
        const user = data.user;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));


        router.push('/');
      } else {
        setError(data.detail || 'Login failed!');
      }
    } catch (error) {
      setError('Terjadi kesalahan saat melakukan login');
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-4xl shadow-lg">
        <div className="hidden lg:flex flex-col items-center justify-center w-1/2 relative">
          <Image
            src="/background.jpg"
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="rounded-l-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white p-10 rounded-l-lg">
            <h2 className="text-3xl font-bold mb-4 text-center">Selamat Datang!</h2>
            <p className="mb-6 text-center">Bergabunglah dengan kami untuk mengakses sistem manajemen penjara Lapas Nusakambangan</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full lg:w-1/2 bg-white p-10 rounded-r-lg">
          <h2 className="text-2xl font-bold mb-6">SIGN IN</h2>
          <form onSubmit={handleLogin} className="w-full">
            <div className="mb-4">
              <label htmlFor="nomor_kepegawaian" className="block text-gray-700">Nomor Induk Pegawai</label>
              <input
                type="text"
                id="nomor_kepegawaian"
                value={nomor_kepegawaian}
                onChange={(e) => setNomorKepegawaian(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-6">
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
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition duration-200"
            >
              SIGN IN
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>} 
          </form>
        </div>
      </div>
    </div>
  );
}

// pages/dashboard.js
import SideNavbar from "../components/SideNavbar";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SideNavbar />
      {/* Konten Dashboard */}
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-3xl font-bold mb-8">Selamat Datang di Dashboard!</h1>
        <div className="bg-white rounded-lg p-6 shadow-md w-96 text-center">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Tentang Sistem Manajemen Penjara</h2>
          <p className="text-gray-700 mb-4">Kami membangun platform ini untuk membantu dalam manajemen yang efisien dan transparan di sistem penjara. Kami menyediakan alat dan fitur yang dapat memudahkan staf penjara dalam mengelola data, jadwal, dan kegiatan di dalam fasilitas.</p>
          <hr className="my-4" />
          <h2 className="text-2xl font-semibold text-purple-600 mb-2">Statistik Penjara</h2>
          <p className="text-gray-700 mb-4">Lihat data terkini tentang populasi tahanan, tingkat keamanan, dan program rehabilitasi di fasilitas kami. Kami berkomitmen untuk menciptakan lingkungan yang aman dan produktif.</p>
        </div>
      </div>
    </div>
  );
}

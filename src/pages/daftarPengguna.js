import React, { useState, useEffect } from "react";
import SideNavbar from "../components/SideNavbar";
import { useRouter } from "next/router";
import withAuth from "../components/withAuth";
function DaftarPengguna() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    nomor_kepegawaian: "",
    nama: "",
    password: "",
    role: "admin",
  });
  const [isEdit, setEditData] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token tidak tersedia.");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/pengguna/get-pengguna`,
          {
            headers: {
              Accept: "application/json",
              Authorization: token,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const filterData = data.filter((item) => item.role !== "admin");
        setData(filterData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditData = (index, item) => {
    setEditData(true);
    setEditIndex(index);
    setEditForm({ ...item });
  };

  const handleUpdateData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/pengguna/update-pengguna/${editForm.nomor_kepegawaian}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            nomor_kepegawaian: editForm.nomor_kepegawaian,
            nama: editForm.nama,
            password: editForm.password,
            role: editForm.role,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update data");
      }

      const updatedData = [...data];
      updatedData[editIndex] = editForm;
      setData(updatedData);
      setEditIndex(null);
      setEditForm({
        nomor_kepegawaian: "",
        nama: "",
        password: "",
        role: "staff lapas",
      });
      setEditData(false);
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Gagal mengupdate data, silakan coba lagi.");
    }
  };

  const handleHapusData = async (index, nomorKepegawaian) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/pengguna/delete-pengguna/${nomorKepegawaian}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete data");
      }

      const updatedData = [...data];
      updatedData.splice(index, 1);
      setData(updatedData);
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("Gagal menghapus data, silakan coba lagi.");
    }
  };

  return (
    <div className="flex">
      <SideNavbar />
      <div className="flex-1 ml-60">
        <h1 className="text-2xl font-bold mb-4 mt-4 ml-4">Daftar Pengguna</h1>
        <div className="overflow-x-auto">
          <table className="min-w-min border-collapse border border-gray-300 ml-4">
            <thead>
              <tr>
                <th className="border border-gray-300 px-2 py-1">No</th>
                <th className="border border-gray-300 px-2 py-1">
                  Nomor Kepegawaian
                </th>
                <th className="border border-gray-300 px-2 py-1">Nama</th>
                <th className="border border-gray-300 px-2 py-1">Role</th>
                <th className="border border-gray-300 px-2 py-1">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-2 py-1">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {editIndex === index ? (
                      <span>{item.nomor_kepegawaian}</span>
                    ) : (
                      item.nomor_kepegawaian
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {editIndex === index ? (
                      <input
                        value={editForm.nama}
                        onChange={(e) =>
                          setEditForm({ ...editForm, nama: e.target.value })
                        }
                      />
                    ) : (
                      item.nama
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item.role}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {editIndex === index ? (
                      <>
                        <button
                          onClick={handleUpdateData}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                        >
                          Simpan
                        </button>
                        <button
                          onClick={() => {
                            setEditData(false);
                            setEditIndex(null);
                            setEditForm({
                              nomor_kepegawaian: "",
                              nama: "",
                              password: "",
                              role: "admin",
                            });
                          }}
                          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
                        >
                          Batal
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditData(index, item)}
                          disabled={isEdit}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleHapusData(index, item.nomor_kepegawaian)
                          }
                          disabled={isEdit}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        >
                          Hapus
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default withAuth(DaftarPengguna);

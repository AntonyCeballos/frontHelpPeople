import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { createUser, uploadDocument } from "../redux/slice/userSlice";

const CreateUserPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.users);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createUser({ username, email, password }));
  };

  //Manejador Para Subir el archivo CSV
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      dispatch(uploadDocument(formData));
    }
  };

  return (
    <div className="container mt-32">
      <div className="sm:flex justify-between items-center">
        <h2 className="text-4xl font-medium">Usuarios</h2>
      </div>
      <form onSubmit={handleSubmit} className="mt-5">
        <input
          className="border border-gray-400 mr-5 py-2 rounded-md"
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border border-gray-400 mr-5 py-2 rounded-md"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border border-gray-400 mr-5 py-2 rounded-md"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className={
            loading
              ? "bg-sky-300 rounded-lg text-white py-3 px-5"
              : "bg-sky-500 rounded-lg text-white py-3 px-5"
          }
        >
          Crear Usuario
        </button>
      </form>
      {error && <p>{error}</p>}
      <div className="container mt-32">
        <div className="sm:flex justify-between items-center">
          <h3 className="text-2xl font-medium">Cargar documento CSV</h3>
        </div>
        <form onSubmit={handleFile} className="mt-5">
          <input type="file" onChange={handleFileChange}/>
          <button type="submit" disabled={loading} className={
            loading
              ? "bg-sky-300 rounded-lg text-white py-1 px-5 ml-3"
              : "bg-sky-500 rounded-lg text-white py-1 px-5 ml-3"
          }>
            Cargar
          </button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default CreateUserPage;

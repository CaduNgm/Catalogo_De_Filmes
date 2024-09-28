"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Sidebar from "../components/sidebar/page";

export default function Home() {
  const { handleSubmit, register, reset } = useForm();
  const [filmes, setFilmes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (editingIndex !== null) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  }, [editingIndex]);

  function onsubmit(data) {
    if (editingIndex !== null) {
      const updatedFilmes = filmes.map((filme, index) =>
        index === editingIndex ? { ...data, id: filme.id } : filme
      );
      setFilmes(updatedFilmes);
    } else {
      const newContact = {
        ...data,
        id: Math.random().toString(36).substring(2),
      };
      setFilmes((prevFilmes) => [...prevFilmes, newContact]);
    }
    reset();
    setShowForm(false);
    setEditingIndex(null);
  }

  function handleEdit(index) {
    setEditingIndex(index);
    reset(filmes[index]);
    setShowForm(true);
  }

  function handleDelete(index) {
    setFilmes((prevFilmes) => prevFilmes.filter((_, i) => i !== index));
  }

  function handleCancelEdit() {
    setEditingIndex(null);
    reset();
    setShowForm(false);
  }

  return (
<div>
<Sidebar/>
    <div className="ml-64 p-4">

      {!showForm ? (
        <>
          <div className="flex justify-end " >
            <button
              onClick={() => setShowForm(true)}
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
            >
              Adicionar Gênero
            </button>
          </div>

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="border px-6 py-3">Generos Adiconados</th>
                <th className="border px-6 py-3 bg-gray-700">Ação</th>
              </tr>
            </thead>
            <tbody>
              {filmes.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="border px-6 py-3 text-center bg-gray-700"
                  >
                    Sem Generos Adicionados
                  </td>
                </tr>
              ) : (
                filmes.map((filme, index) => (
                  <tr key={index}>
                    <td className="border px-6 py-3 bg-gray-700">
                      {filme.genero}
                    </td>
                    <td className="border px-6 py-3 bg-gray-700">
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-blue-500 mr-5"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className=" text-red-500"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      ) : (
        <form onSubmit={handleSubmit(onsubmit)} className="max-w-sm mx-auto">
          <div className="mb-5">
            <label
              htmlFor="genero"
              className="block mb-2 text-sm font-medium text-black-900 dark:text-black"
            >
              Gêneros 
            </label>
            <input
              {...register("genero")}
              type="text"
              id="genero"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {editingIndex !== null ? "Atualizar" : "Adicionar"}
          </button>
          <button
            type="button"
            onClick={handleCancelEdit}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-5 "
          >
            Cancelar
          </button>
        </form>
      )}
    </div>
    </div>
  );
}

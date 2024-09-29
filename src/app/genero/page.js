'use client'
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Sidebar from "../components/sidebar/page";
import { CarregarGeneros, Salvar, Edita, CarregarGenerosr, Excluir } from "../backend/genero"; 

export default function Home() {
    const { handleSubmit, register, reset } = useForm();
    const [generos, setGeneros] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [showForm, setShowForm] = useState(false);

    
    useEffect(() => {
        async function fetchGeneros() {
            const obterGeneros = await CarregarGeneros();
            setGeneros(obterGeneros); 
        }
        fetchGeneros();
    }, []);

    
    async function onsubmit(data) {
        if (editingIndex !== null) {
            
            const generoId = generos[editingIndex].id; 
            await Editar(generoId, data); 
        } else {
            await Salvar(data); 
        }
        const updatedGeneros = await CarregarGeneros(); 
        setGeneros(updatedGeneros); 
        reset(); 
        setShowForm(false); 
        setEditingIndex(null);
    }

    function handleEdit(index) {
        setEditingIndex(index);
        reset(generos[index]); 
        setShowForm(true); 
    }

    async function handleDelete(index) {
        const generoId = generos[index].id; 
        await Excluir(generoId); 
        const updatedGeneros = await CarregarGeneros(); 
        setGeneros(updatedGeneros); 
    }

    function handleCancelEdit() {
        setEditingIndex(null);
        reset();
        setShowForm(false); 
    }

    return (
        <div>
            <Sidebar />
            <div className="ml-64 p-4">
                {!showForm ? (
                    <>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowForm(true)} 
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Adicionar Genero
                            </button>
                        </div>

                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th className="border px-6 py-3">Nome Do Genero</th>
                                    <th className="border px-6 py-3 bg-gray-700">Ação</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {generos.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="border px-6 py-3 text-center bg-gray-700"
                                        >
                                            Sem Generos Adicionados
                                        </td>
                                    </tr>
                                ) : (
                                    generos.map((genero, index) => (
                                        <tr key={genero.id}>
                                            <td className="border px-6 py-3 bg-gray-700 ">
                                                {genero.nome}
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
                htmlFor="nome"
                className="block mb-2 text-sm font-medium text-black-900 dark:text-black"
              >
                Nome do Genero
              </label>
              <input
                {...register("nome")}
                type="text"
                id="nome"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {editingIndex !== null ? "Atualizar" : "Salvar"}
            </button>
            <button
              onClick={handleCancelEdit}
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ml-5 "
            >
              Cancelar
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

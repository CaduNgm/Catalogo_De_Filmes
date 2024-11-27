'use client'
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Sidebar from "../components/sidebar/page";
import { Carregar, Salvar, Editar, Excluir } from "../backend/filmes"; 
import { CarregarGeneros } from "../backend/genero";
import { CarregarAPI } from "../backend/ApiFIlmes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
    const { handleSubmit, register, reset } = useForm();
    const [filmes, setFilmes] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [generos, setGeneros] = useState([]);

    
    useEffect(() => {
        async function fetchFilmes() {
            const obterFilmes = await Carregar();
            const obterGeneros = await CarregarGeneros()
            setGeneros(obterGeneros)
            setFilmes(obterFilmes); 
        }
        fetchFilmes();
    }, []);

    
    async function onsubmit(data) {
        if (editingIndex !== null) {
            
            const filmeId = filmes[editingIndex].id; 
            await Editar(filmeId, data); 
        } else {
            await Salvar(data); 
        }
        const updatedFilmes = await Carregar(); 
        setFilmes(updatedFilmes); 
        reset(); 
        setShowForm(false); 
        setEditingIndex(null);
    }

    function handleEdit(index) {
        setEditingIndex(index);
        reset(filmes[index]); 
        setShowForm(true); 
    }

    async function handleDelete(index) {
        const filmeId = filmes[index].id; 
        await Excluir(filmeId); 
        const updatedFilmes = await Carregar(); 
        setFilmes(updatedFilmes); 
    }

    function handleCancelEdit() {
        setEditingIndex(null);
        reset();
        setShowForm(false); 
    }

    return (
        <div>
          <ToastContainer/>
            <Sidebar />
            <div className="ml-64 p-4">
                {!showForm ? (
                    <>
                        <div className="flex justify-end">
                            <button
                                
                                onClick={()=>{CarregarAPI();
                                  toast.success('Carregando filmes', {
                                    position: "top-right",
                                    autoClose: 20000, 
                                    hideProgressBar: false, 
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined, 
                                  });
                                  setTimeout(()=>window.location.reload(),20000);
                                }} 
                                type="submit"
                                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                            >
                                Carregar API
                            </button>
                            <button
                                onClick={() => setShowForm(true)} 
                                type="button"
                                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Adicionar Filme
                            </button>
                        </div>

                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th className="border px-6 py-3">Título</th>
                                    <th className="border px-6 py-3">Gênero</th>
                                    <th className="border px-6 py-3">Diretor</th>
                                    <th className="border px-6 py-3">Ano</th>
                                    <th className="border px-6 py-3">Lançamento</th>
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
                                            Sem Filmes Adicionados
                                        </td>
                                    </tr>
                                ) : (
                                    filmes.map((filme, index) => (
                                        <tr key={filme.id}>
                                            <td className="border px-6 py-3 bg-gray-700 ">
                                                {filme.titulo}
                                            </td>
                                            <td className="border px-6 py-3 bg-gray-700">
                                                {filme.genero}
                                            </td>
                                            <td className="border px-6 py-3 bg-gray-700">
                                                {filme.diretor}
                                            </td>
                                            <td className="border px-6 py-3 bg-gray-700">
                                                {filme.ano}
                                            </td>
                                            <td className="border px-6 py-3 bg-gray-700">
                                                {filme.lancamento}
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
                htmlFor="titulo"
                className="block mb-2 text-sm font-medium text-black-900 dark:text-black"
              >
                Título
              </label>
              <input
                {...register("titulo")}
                type="text"
                id="titulo"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="genero"
                className="block mb-2 text-sm font-medium text-black-900 dark:text-black"
              >
                Gênero
              </label>
              <select
                {...register("genero")}
                id="genero"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                {generos.map((nome)=>(

                  <option value={nome.nome}>{nome.nome}</option>
                
                ))}
                </select>
               
            </div>
            <div className="mb-5">
              <label
                htmlFor="diretor"
                className="block mb-2 text-sm font-medium text-black-900 dark:text-black"
              >
                Diretor
              </label>
              <input
                {...register("diretor")}
                type="text"
                id="diretor"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="ano"
                className="block mb-2 text-sm font-medium text-black-900 dark:text-black"
              >
                Ano
              </label>
              <input
                {...register("ano")}
                type="text"
                id="ano"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="lancamento"
                className="block mb-2 text-sm font-medium text-black-900 dark:text-black"
              >
                Lançamento
              </label>
              <input
                {...register("lancamento")}
                type="text"
                id="lancamento"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <ToastContainer/>
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

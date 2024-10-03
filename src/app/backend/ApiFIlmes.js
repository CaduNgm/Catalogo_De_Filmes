'use server'

import { Salvar } from "./filmes";
import { SalvarGenero } from "./genero";

export async function CarregarAPI(e) {
    for (let index = 0; index < 250; index++) {
        const imdbId = 2027178 + index;

        const resposta = await fetch(`https://www.omdbapi.com/?i=tt${imdbId}&apikey=5cae9bf8`);
        if (resposta.status === 200) {
            let api = await resposta.json();
            let objeto = {
                titulo: api.Title  || "Desconhecido",
                genero: api.Genre || "Desconhecido", 
                diretor: api.Director || "Desconhecido",
                ano: api.Year || "Desconhecido",
                lancamento: api.Released || "Desconhecido",
            };

            let generos = api.Genre; 

            if (typeof generos === 'string') {
               
                let generosSeparado = generos.includes(',') ? generos.split(', ') : [generos];

                for (const genero of generosSeparado) {
                    let objetoGenero = { nome: genero };
                    await SalvarGenero(objetoGenero);
                }
            }

            await Salvar(objeto);
        }
    }
}

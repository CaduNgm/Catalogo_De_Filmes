'use server'

import { Salvar } from "./filmes"

export async function CarregarAPI(e){
 

        for (let index = 0; index < 250; index++) {
            const imdbId = 2027178 + index;

             const resposta= await fetch(`https://www.omdbapi.com/?i=tt${imdbId}&apikey=5cae9bf8`)
            if(resposta.status===200){
                let api = await resposta.json();
                let objeto = {
                    titulo:api.Title,
                    genero:api.Genre,
                    diretor:api.Director,
                    ano:api.Year,
                    lancamento:api.Released,
                
                }
                console.log(api);
                Salvar(objeto);
            
            }    
            
            
        }
            

}
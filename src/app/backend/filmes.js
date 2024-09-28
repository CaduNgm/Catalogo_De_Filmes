'use server'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export async function Salvar(filme) {
console.log(filme)

    const novoFilme = await prisma.catalogo.create({
        
        data: {
          titulo: filme.titulo,
          genero: filme.genero,
          diretor: filme.diretor,
          ano: filme.ano,
          lancamento: filme.lancamento,
          
        }
        }
    )
    

  }
      
  
  


    

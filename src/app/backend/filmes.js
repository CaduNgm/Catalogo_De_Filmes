'use server'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export async function Salvar(filme) {
console.log(filme)

    const novoFilme =  await prisma.catalogo.create({
        
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
  export async function Editar(id, data) {
    return await prisma.catalogo.update({
        where: { id: id }, 
        data,
    });
}
export async function Excluir(id) {
  return await prisma.catalogo.delete({
      where: {id: id }, 
  });
}


  export async function Carregar(){
    return await prisma.catalogo.findMany();
  }



      
  
  


    

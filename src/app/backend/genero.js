'use server'

import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

export async function SalvarGenero(genero) {

  const generosExistentes = await prisma.genero.findMany({
    where: { nome: genero.nome },
});
    if(generosExistentes.length===0){
    const novoGenero =  await prisma.genero.create({
        
        data: {
          nome: genero.nome
        }
        }
    )}
    

  }
  export async function Editar(id, data) {
    return await prisma.genero.update({
        where: { id: id }, 
        data,
    });
}
export async function Excluir(id) {
  return await prisma.genero.delete({
      where: {id: id }, 
  });
}


  export async function CarregarGeneros(){
    return await prisma.genero.findMany();
  }



      
  
  


    

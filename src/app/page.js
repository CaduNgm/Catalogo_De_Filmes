"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Sidebar from "./components/sidebar/page";
import Image from "next/image";
import Model from "./public/images/foto.png"

export default function Home() {

    return (
        <div>
<Sidebar/>
<div className="ml-64 p-4">
    <div className=" display-5 text-4xl text-center font-bold">
    
        Catalogo Filmes
    </div>
    <div style={{
          display: "flex",
          justifyContent: "center",
        }}>

    <Image src={Model} width={450}
      height={450}/>
    </div>
    
    

</div>

        </div>
    );
}
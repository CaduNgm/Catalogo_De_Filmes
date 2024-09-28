"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Sidebar from "./components/sidebar/page";

export default function Home() {

    return (
        <div>
<Sidebar/>
<div className="ml-64 p-4">
    <div className="text-4xl text-center font-bold">
    
        Catalogo Filmes
    </div>

</div>

        </div>
    );
}
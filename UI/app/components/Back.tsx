"use client"

import { useRouter } from "next/navigation";
import style from "./components.module.scss";

export default function Back() {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className={style.back} name="volver">Volver</button>
  );
}
"use client"

import style from "./components.module.scss";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Icons from "./Icons";

export default function Search() {
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const search = event.currentTarget.search.value;
    if (search) {
      router.push(`/items?search=${search}`);
    }
  }

  return (
    <header className={style.header}>
      <Link href="/">
        <img src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.6.82/mercadolibre/logo_large_25years@2x.png" alt="MercadoLibre Logo" />
      </Link>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Buscar productos, marcas y más..." name="search" />
        <button type="submit">
          <Icons.SearchIcon />
        </button>
      </form>
    </header>
  );
}
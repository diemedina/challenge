import style from "./page.module.scss";
import ItemList from "../components/ItemList";
import Breadcrum from "../components/Breadcrum";
import ProductModel from "../utils/ProductModel";

export async function generateMetadata({searchParams}: any) {
  const {search} = searchParams;
  
  return {
    title: search ? `${search.charAt(0).toUpperCase()}${search.slice(1).toLowerCase()} | MercadoLibre Challenge` : 'MercadoLibre Challenge',
    description: 'Diego Medina - Challenge Frontend Developer'
  }; 
}

export default async function Items({ searchParams }: any) {
  let list: ProductModel[] = [];
  let categories: string[] = [];
  const {search} = searchParams;

  try {
    const response = await fetch(`http://localhost:8080/api/items?q=${search}`);
    const data = await response.json();
    categories = data.categories;
    list = data.items;
  } catch (error) {
    console.error(error);
  }

  return (
    <main className={style.items}>
      { categories.length > 0 && <Breadcrum categories={categories} /> }

      <section className={style.items__list}>
        {
          list.length > 0 && list.map((item: any) => (
            <ItemList item={item} key={item.id} />
          ))
        }
        {
          list.length === 0 && <h2 className="text-center">No se encontraron resultados</h2>
        }
      </section>
    </main>
  );
}
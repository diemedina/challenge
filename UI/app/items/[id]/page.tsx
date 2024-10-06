import style from "./page.module.scss";
import Breadcrum from "../../components/Breadcrum";
import Back from "../../components/Back";

export async function generateMetadata({params}: {params: {id: string}}) {
  const {id} = params;
  
  return {
    title: id ? `${id} | MercadoLibre Challenge` : 'MercadoLibre Challenge',
    description: 'Diego Medina - Challenge Frontend Developer'
  }; 
}

export default async function Product({params} : {params: {id: string}}) {
  const {id} = params;

  let item = null;
  let categories = null;

  try {
    const response = await fetch(`http://localhost:8080/api/items/${id}`);
    const data = await response.json();
    item = data.item;
    categories = data.categories;
  } catch (error) {
    console.log(error);
  }

  return (
    <main className={style.item}>
      <div className={style.item__header}>
        <Back />
        { categories && <Breadcrum categories={categories} /> }
      </div>

      { item && <article className={style.item__detail}>
        <section className={style.item__detail__details}>
          <img src={item.picture} alt="product" />
          <div>
            <span>
              {item.condition == 'new' ? 'Nuevo' : 'Usado'} | {item.sold_quantity.toLocaleString("es-AR")} Vendidos
            </span>
            <h1>{item.title}</h1>
            <h2>
              $ {item.price.amount.toLocaleString("es-AR")}
              <span className={style.shipping}>{item.free_shipping && 'Envio Gratis'}</span>
            </h2>
            <button>Comprar</button>
          </div>
        </section>
        {
          item.description && <section>
            <h2>Descripción</h2>
            <p>{item.description}</p>
          </section>
        }
      </article> }
      { !item && <h2 className="text-center">No se encontró el producto</h2> }
    </main>
  );
}
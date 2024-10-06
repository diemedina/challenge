import style from "./components.module.scss";
import Link from "next/link";
import ProductModel from "../utils/ProductModel";

export default function ItemList({item}: {item: ProductModel}) {
  return (
    <Link href={`/items/${item.id}`}>
      <div className={style.item_list}>
        <img src={item.picture} alt="product" />
        <div className={style.item_list__description}>
          <h2>
            $ {item.price.amount.toLocaleString("es-AR")}
            <span className={style.shipping}>{item.free_shipping && 'Envio Gratis'}</span>
          </h2>
          <h3>{item.title}</h3>
        </div>
        <span>{item.condition == 'new' ? 'Nuevo' : 'Usado'}</span>
      </div>
    </Link>
  );
}
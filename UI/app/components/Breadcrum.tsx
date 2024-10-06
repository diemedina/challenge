import Icons from "./Icons";
import style from "./components.module.scss";

export default function Breadcrum({categories}: {categories: string[]}) {
  return (
    <nav className={style.breadcrumb}>
      {
        categories.map((category: string, idx: number) => (
          <span key={category}>{category} {idx + 1 < categories.length && <Icons.ArrowRightIcon />}</span>
        ))
      }
    </nav>
  );
}
import { AuthorModel } from "./AuthorModel";
import { ProductModel } from "./ProductModel";

export interface ResponseListModel {
  author: AuthorModel,
  categories: string[],
  items: ProductModel[]
}

export interface ResponseModel {
  author: AuthorModel,
  categories: string[],
  item: ProductModel
}
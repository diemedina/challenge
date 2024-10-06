export interface ProductModel {
  id: string,
  title: string,
  price: {
    amount: number,
    decimals: number,
    currency: string
  },
  picture: string,
  condition: string,
  free_shipping: boolean,
  sold_quantity?: number,
  category: string,
  description?: string
}
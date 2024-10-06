export default interface ProductModel {
  id: string,
  title: string,
  price: {
    amount: number,
    currency: string
  },
  picture: string,
  condition: string,
  free_shipping: boolean
}
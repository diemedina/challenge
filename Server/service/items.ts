import axios from 'axios';
import { getTopCategory } from '../utils/utils';
import { ResponseModel, ResponseListModel } from '../models/ResponseModel';

const API = "https://api.mercadolibre.com"

const getItems = async (query?: string) => {
  if (!query) return [];

  const response = await axios.get(`${API}/sites/MLA/search?q=${query}&limit=4`);
  const data = response.data;

  const formattedModel: ResponseListModel = {
    author: {
      name: 'Diego Ezequiel',
      lastname: 'Medina'
    },
    categories: [],
    items: data.results.map((item: any) => ({
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: Math.floor(item.price),
        decimals: Number((item.price % 1).toFixed(2).split('.')[1])
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      category: item.category_id
    }))
  };

  const topCategory = getTopCategory(formattedModel.items.map((item: any) => item.category));
  formattedModel.categories = await getCategory(topCategory);

  return formattedModel;
}

const getItem = async (id?: string) => {
  if (!id) return {};
  
  const [getItem, getDescription] = await Promise.all([
    axios.get(`${API}/items/${id}`),
    axios.get(`${API}/items/${id}/description`)
  ]);
  
  const item = getItem.data;
  const description = getDescription.data;
  
  const formattedModel: ResponseModel = {
    author: {
      name: 'Diego Ezequiel',
      lastname: 'Medina'
    },
    categories: [],
    item: {
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: Math.floor(item.price),
        decimals: Number((item.price % 1).toFixed(2).split('.')[1])
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      sold_quantity: item.initial_quantity,
      description: description.plain_text,
      category: item.category_id
    }
  };

  formattedModel.categories = await getCategory(formattedModel.item.category);
  return formattedModel;
};

const getCategory = async (idCategory?: string): Promise<string[]> => {
  if (!idCategory) return [];

  const response = await axios.get(`${API}/categories/${idCategory}`);
  const data = response.data;
  return data.path_from_root.map((item: {id: string, name: string}) => item.name);
};

export { getItems, getItem, getCategory };

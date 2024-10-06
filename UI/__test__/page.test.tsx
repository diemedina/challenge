import { render, screen } from '@testing-library/react';
import Search from '../app/components/Search';
import Back from '../app/components/Back';
import ItemList from '../app/components/ItemList';
import Breadcrum from '../app/components/Breadcrum';
import ProductModel from '../app/utils/ProductModel';

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockItem: ProductModel = {
  id: 'MLA1119296451',
  title: 'Mesa',
  price: {
    amount: 1,
    currency: 'ARS',
  },
  picture: 'http://http2.mlstatic.com/D_684980-MLA72798957766_112023-I.jpg',
  condition: 'new',
  free_shipping: true,
};


describe('Components', () => {
  it ('Render Search', () => {
    render(<Search />);
    expect(screen.getByAltText(/MercadoLibre Logo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Buscar productos, marcas y más.../i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it('Render Back', () => {
    render(<Back />);
    const button = screen.getByRole('button', { name: /volver/i });
    expect(button).toBeInTheDocument();
  });

  it('Render ItemList', () => {
    render(<ItemList item={mockItem} />);
    expect(screen.getByText(/Mesa/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText(/Envio Gratis/i)).toBeInTheDocument();
    expect(screen.getByText(/Envio Gratis/i)).toHaveClass('shipping');
    expect(screen.getByText(/Nuevo/i)).toBeInTheDocument();
  });

  it('Render Breadcrum', () => {
    render(<Breadcrum categories={['Sillas, Sillones y Banquetas', 'Bancos y Banquetas']} />);
    expect(screen.getByText(/Sillas, Sillones y Banquetas/i)).toBeInTheDocument();
    expect(screen.getByText(/Bancos y Banquetas/i)).toBeInTheDocument();
  });
});
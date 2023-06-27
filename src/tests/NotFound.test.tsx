import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('testes no componente NotFound', () => {
  it('testa se tá na NotFound', () => {
    renderWithRouter(<NotFound />);
    const notFoundText = screen.getByRole('heading', { name: 'Page requested not found' });
    expect(notFoundText).toBeInTheDocument();
  });
  it('testa se tem iamgem no NotFound', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});

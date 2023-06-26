import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('testes no componente About', () => {
  it('testa se tá na About', () => {
    renderWithRouter(<About />);
    const aboutPageText = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(aboutPageText).toBeInTheDocument();
  });
  it('testa se tem 1 tag p no About', () => {
    renderWithRouter(<About />);
    const firstTextAbout = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon');
    expect(firstTextAbout).toBeInTheDocument();
  });
  it('testa se tem 2 tag p no About', () => {
    renderWithRouter(<About />);
    const secondTextAbout = screen.getByText('One can filter Pokémon by type, and see more details for each one of them');
    expect(secondTextAbout).toBeInTheDocument();
  });
  it('testa a IMG da page About', () => {
    renderWithRouter(<About />);
    const imgAbout = screen.getByRole('img', { name: /pokédex/i });
    expect(imgAbout).toBeInTheDocument();
    expect(imgAbout).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

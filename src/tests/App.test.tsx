import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testes no componente App', () => {
  it('testa se tá na home para a home', () => {
    renderWithRouter(<App />);
    const homeText = screen.getByText('Pokédex');
    expect(homeText).toBeInTheDocument();
  });
  it('testa se tem link home', () => {
    renderWithRouter(<App />);
    const textLinkHome = screen.getByRole('link', { name: 'Home' });
    expect(textLinkHome).toBeInTheDocument();
  });
  it('testa se tem link About', () => {
    renderWithRouter(<App />);
    const textLinkHome = screen.getByRole('link', { name: 'About' });
    expect(textLinkHome).toBeInTheDocument();
  });
  it('testa se tem link Favorites', () => {
    renderWithRouter(<App />);
    const textLinkHome = screen.getByRole('link', { name: 'Favorite Pokémon' });
    expect(textLinkHome).toBeInTheDocument();
  });
  it('teste se vai para a home', () => {
    renderWithRouter(<App />);
    const homeBtn = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeBtn);
    const homeText = screen.getByText('Pokédex');
    expect(homeText).toBeInTheDocument();
  });
  it('teste se vai para a home', async () => {
    renderWithRouter(<App />);
    const homeBtn = screen.getByRole('link', { name: 'Home' });
    await userEvent.click(homeBtn);
    const homeText = screen.getByText('Pokédex');
    expect(homeText).toBeInTheDocument();
  });
  it('teste se vai para a About', async () => {
    renderWithRouter(<App />);
    const aboutBtn = screen.getByText('About');
    await userEvent.click(aboutBtn);
    const aboutText = screen.getByText('About Pokédex');
    expect(aboutText).toBeInTheDocument();
  });
  it('teste se vai para a Favorites', async () => {
    renderWithRouter(<App />);
    const favBtn = screen.getByText('Favorite Pokémon');
    await userEvent.click(favBtn);
    const favText = screen.getByText('No favorite Pokémon found');
    expect(favText).toBeInTheDocument();
  });
});

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

const { id, name, averageWeight, type, image } = pokemonList[0];
const { value, measurementUnit } = averageWeight;
describe('testes no componente Pokemon', () => {
  it('testa se possui pokemon, tipo de pokemon e peso do pokemon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByText(name);
    const pokemonType = screen.getAllByText(type)[1];
    const pokemonWeight = screen.getByText(`Average weight: ${value} ${measurementUnit}`);
    const pokemonImg = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg).toHaveAttribute('alt', `${name} sprite`);
    expect(pokemonImg).toHaveAttribute('src', `${image}`);
  });
  it('testa se o pokemon possui link para detalhes', async () => {
    renderWithRouter(<App />);
    const pokemonLink = screen.getByRole('link', { name: /more details/i });
    expect(pokemonLink).toBeInTheDocument();
    expect(pokemonLink).toHaveAttribute('href', `/pokemon/${id}`); 
    await userEvent.click(pokemonLink);
    const pokemonDetails = screen.getByRole('heading', { name: /pikachu details/i });
    expect(pokemonDetails).toBeInTheDocument();
  });
  it('testa se o pokemon possui favorite', async () => {
    renderWithRouter(<App />);
    const pokemonLink = screen.getByRole('link', { name: /more details/i });
    expect(pokemonLink).toBeInTheDocument();
    expect(pokemonLink).toHaveAttribute('href', '/pokemon/25'); 
    await userEvent.click(pokemonLink);
    const pokemonDetails = screen.getByRole('heading', { name: /pikachu details/i });
    expect(pokemonDetails).toBeInTheDocument();
    const favBtn = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    await userEvent.click(favBtn);
    const favPokemon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favPokemon).toHaveAttribute('src', '/star-icon.svg');
  });
});

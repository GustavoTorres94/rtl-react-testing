import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testes no componente FavoritePokemon', () => {
  it('testa se não existem pokemons favoritados', () => {
    renderWithRouter(<FavoritePokemon pokemonList={ [] } />);
    const noPokemonsText = screen.getByText('No favorite Pokémon found');
    expect(noPokemonsText).toBeInTheDocument();
  });
  it('testa se tem 1 ou mais pokemons favoritados', async () => {
    renderWithRouter(<App />, { route: '/pokemon/4' });
    const isFavorite = screen.getByText(/pokémon favoritado\?/i);
    await userEvent.click(isFavorite);
    const favorite = screen.getByRole('link', { name: /favorite pokémon/i });
    await userEvent.click(favorite);
    const pokemonOk = screen.getByText('Charmander');
    const pokemonImg = screen.getByRole('img', { name: /charmander is marked as favorite/i });
    expect(pokemonOk).toBeInTheDocument();
    expect(pokemonImg).toBeInTheDocument();
  });
});

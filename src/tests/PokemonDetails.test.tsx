import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

const { name, foundAt } = pokemonList[0];

describe('testes no componente PokemonDetails', () => {
  it('teste de informações do component PomenonDetails', async () => {
    renderWithRouter(<App />);
    const pokemonLink = screen.getByRole('link', { name: /more details/i });
    expect(pokemonLink).toBeInTheDocument();
    await userEvent.click(pokemonLink);
    expect(pokemonLink).not.toBeInTheDocument();
    const pokemonDetails = screen.getByRole('heading', { name: /pikachu details/i });
    expect(pokemonDetails).toBeInTheDocument();
    const summaryText = screen.getByRole('heading', { name: /summary/i });
    expect(summaryText).toBeInTheDocument();
    const pokInfo = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
    expect(pokInfo).toBeInTheDocument();
  });
  it('teste de mapas do component PomenonDetails', async () => {
    renderWithRouter(<App />);
    const pokemonLink = screen.getByRole('link', { name: /more details/i });
    expect(pokemonLink).toBeInTheDocument();
    await userEvent.click(pokemonLink);
    const mapsTitle = screen.getByRole('heading', { name: /game locations of pikachu/i });
    expect(mapsTitle).toBeInTheDocument();
    foundAt.map((e, i) => {
      const localText = screen.getByText(e.location);
      expect(localText).toBeInTheDocument();
      const mapImage = screen.getAllByAltText(`${name} location`)[i];
      expect(mapImage).toBeInTheDocument();
      expect(mapImage).toHaveAttribute('src', `${e.map}`);
    });
  });
  it('testa se user pode favoritar a partir do component', async () => {
    renderWithRouter(<App />);
    const pokemonLink = screen.getByRole('link', { name: /more details/i });
    expect(pokemonLink).toBeInTheDocument();
    await userEvent.click(pokemonLink);
    const mapsTitle = screen.getByRole('heading', { name: /game locations of pikachu/i });
    expect(mapsTitle).toBeInTheDocument();
    const favBtn = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(favBtn).toBeInTheDocument();
    await userEvent.click(favBtn);
    const favoritePokemon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favoritePokemon).toBeInTheDocument();
  });
});

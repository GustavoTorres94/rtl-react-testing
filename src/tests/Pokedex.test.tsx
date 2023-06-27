import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testes no componente Pokedex', () => {
  it('testa se tá na Pokedex/Home', () => {
    renderWithRouter(<App />);
    const pokedexText = screen.getByRole('heading', { name: 'Encountered Pokémon' });
    expect(pokedexText).toBeInTheDocument();
  });
  it('testa se muda o Pokemon ao clicar no button', async () => {
    renderWithRouter(<App />);
    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextBtn).toBeInTheDocument();
    await userEvent.click(nextBtn);
    const nextPokemon = screen.getByText(/charmander/i);
    expect(nextPokemon).toBeInTheDocument();
  });
  it('testa se tem várons buttons', async () => {
    renderWithRouter(<App />);
    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons).toHaveLength(7);
    const selectBtn = screen.getByRole('button', { name: /psychic/i });
    await userEvent.click(selectBtn);
    const selectedPokemonType = screen.getByText(/alakazam/i);
    expect(selectedPokemonType).toBeInTheDocument();
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();
  });
  it('testa se tem button All', async () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();
    await userEvent.click(buttonAll);
    const noFilterPokemons = screen.getByText(/pikachu/i);
    expect(noFilterPokemons).toBeInTheDocument();
  });
  it('testa se o button fica Disabled', async () => {
    renderWithRouter(<App />);
    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons).toHaveLength(7);
    const selectBtn = screen.getByRole('button', { name: /poison/i });
    await userEvent.click(selectBtn);
    const selectedPokemonType = screen.getByText(/ekans/i);
    expect(selectedPokemonType).toBeInTheDocument();
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();
    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextBtn).toHaveAttribute('disabled');
    await userEvent.click(buttonAll);
    const selectedPokemonTypeAfterFilter = screen.queryByText(/ekans/i);
    expect(selectedPokemonTypeAfterFilter).not.toBeInTheDocument();
  });
});

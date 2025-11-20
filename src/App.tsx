import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './app/store';
import { useSearchRecipesQuery } from './features/recipes/recipesApi';
import { addFavorite, removeFavorite, clearFavorites, type Favorite } from './features/favorites/favoritesSlice';
import './App.css';

function App() {
  const [query, setQuery] = useState('pasta');
  const [searchTerm, setSearchTerm] = useState('pasta');
  
  // RTK Query hook för att hämta recept
  const { data, isFetching, isError, error } = useSearchRecipesQuery({ q: searchTerm });
  
  // Redux hooks
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const dispatch = useDispatch<AppDispatch>();
  
  // Hjälpfunktion för att kolla om ett recept är favorit
  const isFavorite = (id: number) => favorites.some(fav => fav.id === id);
  
  // Hantera sökning
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(query);
  };
  
  // Toggle favorit
  const toggleFavorite = (recipe: Favorite) => {
    if (isFavorite(recipe.id)) {
      dispatch(removeFavorite(recipe.id));
    } else {
      dispatch(addFavorite({
        id: recipe.id,
        name: recipe.name,
        image: recipe.image,
        cuisine: recipe.cuisine,
      }));
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🍳 Redux Recipe Explorer</h1>
        <p>Sök efter dina favoritrecept och spara dem!</p>
      </header>

      {/* Sökformulär */}
      <section className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Sök recept (t.ex. pasta, chicken, soup)..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            Sök
          </button>
        </form>
      </section>

      {/* Favoriter sektion */}
      <section className="favorites-section">
        <div className="favorites-header">
          <h2>⭐ Mina Favoriter ({favorites.length})</h2>
          {favorites.length > 0 && (
            <button 
              onClick={() => dispatch(clearFavorites())}
              className="clear-button"
            >
              Rensa alla
            </button>
          )}
        </div>
        
        {favorites.length === 0 ? (
          <p className="empty-message">Inga favoriter ännu. Lägg till några från sökresultaten!</p>
        ) : (
          <div className="favorites-grid">
            {favorites.map((fav) => (
              <div key={fav.id} className="favorite-card">
                <img src={fav.image} alt={fav.name} />
                <div className="favorite-info">
                  <h3>{fav.name}</h3>
                  <span className="cuisine-tag">{fav.cuisine}</span>
                </div>
                <button
                  onClick={() => dispatch(removeFavorite(fav.id))}
                  className="remove-button"
                  title="Ta bort favorit"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Sökresultat */}
      <section className="results-section">
        <h2>🔍 Sökresultat för "{searchTerm}"</h2>
        
        {isFetching && <div className="loading">Laddar recept...</div>}
        
        {isError && (
          <div className="error">
            <p>Något gick fel vid sökning:</p>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </div>
        )}
        
        {data && !isFetching && (
          <>
            <p className="results-count">Hittade {data.total} recept</p>
            {data.recipes.length === 0 ? (
              <p className="empty-message">Inga recept hittades. Prova ett annat sökord!</p>
            ) : (
              <div className="recipes-grid">
                {data.recipes.map((recipe) => (
                  <div key={recipe.id} className="recipe-card">
                    <img src={recipe.image} alt={recipe.name} className="recipe-image" />
                    
                    <div className="recipe-content">
                      <h3>{recipe.name}</h3>
                      
                      <div className="recipe-meta">
                        <span className="cuisine-tag">{recipe.cuisine}</span>
                        <span className="difficulty-tag difficulty-{recipe.difficulty.toLowerCase()}">
                          {recipe.difficulty}
                        </span>
                      </div>
                      
                      {recipe.mealType && recipe.mealType.length > 0 && (
                        <div className="meal-types">
                          {recipe.mealType.map((type, index) => (
                            <span key={index} className="meal-type-tag">{type}</span>
                          ))}
                        </div>
                      )}
                      
                      {(recipe.prepTimeMinutes || recipe.cookTimeMinutes) && (
                        <div className="time-info">
                          {recipe.prepTimeMinutes && <span>⏱️ Förberedelse: {recipe.prepTimeMinutes} min</span>}
                          {recipe.cookTimeMinutes && <span>🔥 Tillagning: {recipe.cookTimeMinutes} min</span>}
                        </div>
                      )}
                      
                      {recipe.rating && (
                        <div className="rating">
                          ⭐ {recipe.rating.toFixed(1)} ({recipe.reviewCount} recensioner)
                        </div>
                      )}
                      
                      <div className="recipe-actions">
                        <button
                          onClick={() => toggleFavorite({
                            id: recipe.id,
                            name: recipe.name,
                            image: recipe.image,
                            cuisine: recipe.cuisine,
                          })}
                          className={`favorite-button ${isFavorite(recipe.id) ? 'is-favorite' : ''}`}
                        >
                          {isFavorite(recipe.id) ? '❤️ Favorit' : '🤍 Lägg till favorit'}
                        </button>
                        
                        <a
                          href={`https://dummyjson.com/recipes/${recipe.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="details-link"
                        >
                          Se detaljer →
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default App;

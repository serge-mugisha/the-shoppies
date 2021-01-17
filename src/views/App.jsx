/* eslint-disable no-unused-vars */
import { useState } from 'react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([{
    Title: 'Mad Max',
    Year: '2014'
  },
  {
    Title: 'Joker',
    Year: '2019'
  },
  {
    Title: 'Avengers',
    Year: '2012'
  },
  ]);
  const [nominatedMovies, setNominatedMovies] = useState([{
    Title: 'Joker',
    Year: '2019'
  }]);
  const [endNomination, setEndNomination] = useState(true);

  return (
    <div className="App">
      <div className="container">
        <h2>The Shoppies</h2>
        <div className="card">
          <p>
            Movie title
          </p>
          <div className="input-container">
            <input type="text" className="input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <img alt="" src="https://img.icons8.com/search" className="input-icon" />
          </div>
        </div>

        {endNomination ? (
          <div className="card banner">
            You have finished nominating 5 movies!
          </div>
        ) : (null)}

        <div className="grid-container">

          <div className="card search-results">
            <h4>
              Results for
              {` "${searchQuery}" `}
            </h4>
            <ul>
              {searchResults.length !== 0 ? (
                searchResults.map((movie) => (
                  <li key={movie.Title + movie.Year}>
                    {`${movie.Title} (${movie.Year})`}
                    <button
                      type="button"
                      className="btn"
                    >
                      Nominate
                    </button>
                  </li>
                ))
              ) : (<p>No search results.</p>)}
            </ul>
          </div>

          <div className="card nominations">
            <h4>Nominations</h4>
            <ul>
              {nominatedMovies.map((movie) => (
                <li key={movie.Title + movie.Year}>
                  {`${movie.Title} (${movie.Year})`}
                  <button type="button" className="btn">Remove</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

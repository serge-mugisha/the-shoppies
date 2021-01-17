import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [nominatedMovies, setNominatedMovies] = useState([]);
  const [endNomination, setEndNomination] = useState(false);

  useEffect(() => {
    if (searchQuery !== '') {
      axios.get(`http://www.omdbapi.com/?apikey=dfa95443&type=movie&s=${searchQuery}`)
        .then((res) => {
          if (res.data.Search) setSearchResults(res.data.Search);
          else setSearchResults([]);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    }
  }, [searchQuery]);

  const addNomination = (movie) => {
    if (nominatedMovies.length === 5) setEndNomination(true);
    else {
      setEndNomination(false);
      setNominatedMovies([...nominatedMovies, { Title: movie.Title, Year: movie.Year }]);
    }
  };

  const handleRemove = (movie) => {
    const newNominatedMovies = nominatedMovies.filter((mov) => mov.Title !== movie);
    setNominatedMovies(newNominatedMovies);
  };
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
                searchResults.map((movie) => {
                  const Nominated = nominatedMovies.find((mov) => mov.Title === movie.Title);
                  return (
                    <li key={movie.Title + movie.Year}>
                      {`${movie.Title} (${movie.Year})`}
                      <button
                        type="button"
                        className="btn"
                        onClick={() => addNomination(movie)}
                        disabled={Nominated ? 'disabled' : null}
                      >
                        Nominate
                      </button>
                    </li>
                  );
                })
              ) : (<p>No search results.</p>)}
            </ul>
          </div>

          <div className="card nominations">
            <h4>Nominations</h4>
            <ul>
              {nominatedMovies.map((movie) => (
                <li key={movie.Title + movie.Year}>
                  {`${movie.Title} (${movie.Year})`}
                  <button type="button" className="btn" onClick={() => handleRemove(movie.Title)}>Remove</button>
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

import React from 'react';
import './App.css';
async function searchNews(q) {
  q = encodeURIComponent(q);
  const response = await fetch(`https://newsapi.org/v2/everything?q=${q}&apiKey=`, {
    "method": "GET"
  });
  const body = await response.json();
  console.log(body.articles);
  return body.articles;


}
function App() {
  const [query, setQuery] = React.useState("");
  const [list, setList] = React.useState(null);
  const search = (e) => {
    e.preventDefault();
    searchNews(query).then(setList);
  };
  return (
    <div className="app">
      <h1>React News Page</h1>
      <form onSubmit={search}>
        <input
          placeholder="SEARCH"
          autoFocus
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button>Search</button>
      </form>
      {!list
        ? null
        : list.length === 0
          ? <p><i>No results</i></p>
          : <ul>
            {list.map((item, i) => (
              <Item key={i} item={item} />
            ))}
          </ul>
      }
    </div>
  );
}
function Item({ item }) {
  return (
    <li className="item">
      {item.urlToImage &&
        <img className="thumbnail" width="120" height="120"
          alt=""
          src={item.urlToImage}
        />
      }
      <h2 className="title">
        <a className="titleatag" href={item.url}>{item.title}</a>
      </h2>
      <p className="description">
        {item.description}
      </p>

      <p className="timezone">
        {item.publishedAt.slice(0, 10)} - {item.publishedAt.slice(11, 19)}
      </p>

    </li>
  );
}
export default App;
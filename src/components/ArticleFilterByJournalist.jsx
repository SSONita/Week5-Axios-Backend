import { useEffect, useState } from 'react';

export default function ArticleFilterByJournalist() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);

  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    fetch('http://localhost:3000/articles')
      .then(res => res.json())
      .then(data => setArticles(data));
  };

  const fetchJournalists = async () => {
    // Fetch journalists from the API
    fetch('http://localhost:3000/journalists')
      .then(res => res.json())
      .then(data => setJournalists(data));
  };

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select id="journalistFilter">
          <option value="">All Journalists</option>
          {/* Options for journalists */
            journalists.map(j => (
              <option key={j.id} value={j.id}>{j.name}</option>
            ))
          }
        </select>

        <button
          onClick={() => {
            // Logic to apply filters
            
            const selectedId = document.getElementById('journalistFilter').value;
            let url = 'http://localhost:3000/articles';
            if (selectedId) {
              url += `?journalistId=${selectedId}`;
            }

            fetch(url)
              .then(res => res.json())
              .then(data => setArticles(data));
          }}
        >Apply Filters</button>
        <button
          onClick={() => {
            // Logic to reset filters
            document.getElementById('journalistFilter').value = '';
            fetchArticles();
          }}
        >Reset Filters</button>
      </div>

      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
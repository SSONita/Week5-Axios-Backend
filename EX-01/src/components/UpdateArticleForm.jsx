import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateArticleForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    content: '',
    journalistId: '',
    categoryId: '',
  });


  // Fetch to prefill a form and update an existing article
  useEffect(() => {
      axios.get(`http://localhost:3000/articles/${id}`)
    .then(response => {
      const data = response.data;
      if (data?.title && data?.content) {
        setForm(data);
      } else {
        alert('Invalid article data');
      }
    })
    .catch(error => {
      console.error('Error fetching article:', error);
      alert('Error fetching article');
    });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update article with axios
  
    axios.put(`http://localhost:3000/articles/${id}`, form)
    .then(() => {
      alert('Article updated successfully!');
      navigate('/');
    })
    .catch(error => {
      console.error('Error updating article:', error);
      alert(`Failed to update article. ${error.message || 'Server not responding'}`);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Article</h3>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required /><br />
      <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" required /><br />
      <input name="journalistId" value={form.journalistId} onChange={handleChange} placeholder="Journalist ID" required /><br />
      <input name="categoryId" value={form.categoryId} onChange={handleChange} placeholder="Category ID" required /><br />
      <button type="submit">Update</button>
    </form>
  );
}

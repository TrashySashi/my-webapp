const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

let todos = [
  { id: 1, text: 'Learn Kubernetes', done: false },
  { id: 2, text: 'Deploy ArgoCD', done: true },
  { id: 3, text: 'Build a web app', done: false }
];
let nextId = 4;

app.get('/api/todos', (req, res) => res.json(todos));

app.post('/api/todos', (req, res) => {
  const todo = { id: nextId++, text: req.body.text, done: false };
  todos.push(todo);
  res.json(todo);
});

app.patch('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: 'Not found' });
  todo.done = !todo.done;
  res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
  todos = todos.filter(t => t.id !== parseInt(req.params.id));
  res.json({ success: true });
});

app.listen(3000, () => console.log('Todo app running on port 3000'));

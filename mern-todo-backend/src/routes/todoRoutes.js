import express from 'express';
const Router = express.Router();
import Todo from '../models/ToDo';

Router.get('/', (req, res) => {
  Todo.find((err, todos) => {
    if (err) {
      console.log('OOps', err);
    } else {
      res.json(todos);
    }
  });
});

Router.get('/:id', (req, res) => {
  let id = req.params.id;
  Todo.findById(id, (err, todo) => {
    res.json(todo);
  });
});

Router.post('/add', (req, res) => {
  let todo = new Todo(req.body);
  todo
    .save()
    .then(todo => {
      console.log(todo);
      res.status(200).json({ todo });
    })
    .catch(err => {
      res.status(400).send('adding new todo failed');
    });
});

Router.post('/update/:id', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    console.log('TodoFinder: ', todo);
    if (!todo) res.status(404).send('data not found');
    else todo.description = req.body.description;
    todo.responsible = req.body.responsible;
    todo.priority = req.body.priority;
    todo.completed = req.body.completed;

    todo
      .save()
      .then(todo => {
        res.json('Todo updated');
      })
      .catch(err => {
        res.status(400).send('Update not possible');
      });
  });
});

Router.delete('/delete/:id', (req, res) => {
  Todo.findByIdAndRemove(req.params.id, (err, todo) => {
    todo
      .delete()
      .then(todo => {
        res.json('Todo deleted');
      })
      .catch(err => {
        res.status(400).send('Delete unsuccessful');
      });
  });
});
module.exports = Router;

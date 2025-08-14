const express = require("express");

const app = express();

app.use(express.json());

const todos = [
  { id: 1, todo: "buy milk", isCompleted: false },
  { id: 2, todo: "write a letter", isCompleted: false },
  { id: 3, todo: "attend node class", isCompleted: false },
];

app.all("/", (req, res) => {
  res.send("You hit the right path.");
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const todo = req.body;
  todos.push(todo);
  res.json({
    message: "Todo added successfully.",
    status: 201,
  });
});

app.put("/todos/:id", (req, res) => {
  const data = req.body;
  const todoParamId = Number(req.params.id);
  const todoIndex = todos.findIndex((item) => item.id === todoParamId);

  if (todoIndex !== -1) {
    todos[todoIndex] = {
      id: todoParamId,
      ...data,
    };
    res.json({
      message: `todo updated successfully`,
      code: 201,
    });
  }

  if (todoIndex === -1) {
    res.json({
      message: "todo not found.",
      status: 404,
    });
  }
});

app.delete("/todos/:id", (req, res) => {
  const paramId = Number(req.params.id);
  const todoIndex = todos.findIndex((item) => item.id === paramId);
  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
    res.json({
      message: "todo deleted successfully.",
      status: 201,
    });
  }
});

const port = 5100;

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});

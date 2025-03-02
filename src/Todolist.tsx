import { useState } from "react";

type Todo = {
  description: string;
  date: string;
};

function TodoList() {
  const [todo, setTodo] = useState<Todo>({ description: "", date: "" });
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = () => {
    if (todo.description.trim() === "" || todo.date.trim() === "") {
      alert("Please enter both description and date!");
      return;
    }

    setTodos([...todos, todo]); 
    setTodo({ description: "", date: "" }); 
  };

  const handleDelete = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <>
      <h2>Simple Todolist</h2>
      <div>
        <label>Description:</label>
        <input
          type="text"
          placeholder="Description"
          onChange={(event) => setTodo({ ...todo, description: event.target.value })}
          value={todo.description}
        />
        <label>Date:</label>
        <input
          type="date"
          onChange={(event) => setTodo({ ...todo, date: event.target.value })}
          value={todo.date}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index}>
              <td>{todo.date}</td>
              <td>{todo.description}</td>
              <td>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TodoList;

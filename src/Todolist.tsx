import { useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ColDef, ModuleRegistry } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);
type Todo = {
  description: string;
  date: string;
  priority: string;
};

function TodoList() {
  const [todo, setTodo] = useState<Todo>({ description: "", priority: "", date: "" });
  const [todos, setTodos] = useState<Todo[]>([]);
  

  const addTodo = () => {
    if (todo.description.trim() === "" || todo.date.trim() === "") {
      alert("Please enter both description and date!");
      return;
    }

    setTodos([...todos, todo]); 
    setTodo({ description: "",priority: "", date: "" }); 
  };

  const handleDelete = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const [columnDefs] = useState<ColDef<Todo>[]>([
    { 
      field: "description", 
      sortable: false, 
      filter: true },
    { field: "priority",
      filter: true,
      cellStyle: (params) =>
        params.value === "High" ? { color: "red" } : { color: "black" }
     },
    { field: "date", sortable: true, 
      filter: true },
  ]);

  const gridRef = useRef<AgGridReact<Todo>>(null);

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
         <label>Priority:</label>
        <input
          type="text"
          placeholder="Priority"
          onChange={(event) => setTodo({ ...todo, priority: event.target.value })}
          value={todo.priority}
        />


        <label>Date:</label>
        <input
          type="date"
          onChange={(event) => setTodo({ ...todo, date: event.target.value })}
          value={todo.date}
        />
        <button onClick={addTodo}>Add</button>
        <div style={{ width: 700, height: 500 }}>
      <AgGridReact 
        ref={gridRef}
        rowData={todos} 
        columnDefs={columnDefs} 
        rowSelection="single"
      />
      </div>
  </div> 
  
      
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Priority</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index}>
              <td>{todo.date}</td>
              <td>{todo.priority}</td>
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

import { useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


ModuleRegistry.registerModules([AllCommunityModule]);


type Todo = {
  description: string;
  date: Dayjs | null;
  priority: string;
};

function TodoList() {
  const [todo, setTodo] = useState<Todo>({
    description: "",
    priority: "",
    date: null,
  });
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = () => {
    if (!todo.description.trim() || !todo.date) {
      alert("Please enter both description and date!");
      return;
    }

    const newTodo: Todo = {
      ...todo,
      date: todo.date, 
    };

    setTodos([...todos, newTodo]);
    setTodo({ description: "", priority: "", date: null });
  };

  const handleDelete = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const [columnDefs] = useState<ColDef<Todo>[]>([
    { field: "description", sortable: false, filter: true },
    {
      field: "priority",
      filter: true,
      cellStyle: (params) =>
        params.value === "High" ? { color: "red" } : { color: "black" },
    },
    {
      field: "date",
      headerName: "Date",
      valueFormatter: (params) =>
        params.value ? dayjs(params.value).format("YYYY-MM-DD") : "",
      sortable: true,
      filter: true,
    },
  ]);

  const gridRef = useRef<AgGridReact<Todo>>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction="column" spacing={2} alignItems="center">
        <h2>Simple Todolist</h2>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Description"
            onChange={(e) => setTodo({ ...todo, description: e.target.value })}
            value={todo.description}
          />
          <TextField
            label="Priority"
            onChange={(e) => setTodo({ ...todo, priority: e.target.value })}
            value={todo.priority}
          />
          <DatePicker
            label="Date"
            value={todo.date}
            onChange={(newValue) => setTodo({ ...todo, date: newValue })}
          />
          <Button variant="contained" onClick={addTodo}>
            Add
          </Button>
        </Stack>

        <div style={{ width: 700, height: 400 }}>
          <AgGridReact ref={gridRef} rowData={todos} columnDefs={columnDefs} />
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
                <td>{todo.date ? todo.date.format("YYYY-MM-DD") : ""}</td>
                <td>{todo.priority}</td>
                <td>{todo.description}</td>
                <td>
                  <Button onClick={() => handleDelete(index)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Stack>
    </LocalizationProvider>
  );
}

export default TodoList;



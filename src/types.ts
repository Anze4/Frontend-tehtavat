export type Todo = {
    description: string;
    date: string;
  };
  
  export type TodoTableProps = {
    todos: Todo[];
    handleDelete: (index: number) => void;
  };
  
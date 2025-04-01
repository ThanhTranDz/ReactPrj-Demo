import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  editTodo,
  deleteTodo,
  toggleTodo,
  moveTodo,
} from "../../redux/todoSlice";
import {
  Button,
  TextInput,
  Checkbox,
  Group,
  Stack,
  Paper,
  ActionIcon,
  Container,
  SegmentedControl,
} from "@mantine/core";
import { IconTrash, IconEdit, IconGripVertical } from "@tabler/icons-react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RootState } from "../../redux/store";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface DragItem {
  index: number;
  id: number;
  type: string;
}

const TodoItem = ({
  todo,
  index,
  moveItem,
}: {
  todo: Todo;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}) => {
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "TODO_ITEM",
    item: { type: "TODO_ITEM", id: todo.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "TODO_ITEM",
    hover(item: DragItem) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const handleEditStart = (todo: Todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const handleEditSave = (id: number) => {
    if (!editText.trim()) return;
    dispatch(editTodo({ id, text: editText }));
    setEditId(null);
    setEditText("");
  };

  drag(drop(ref));

  return (
    <Paper
      ref={ref}
      p="sm"
      withBorder
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      <Group align="center">
        <IconGripVertical size={18} />
        <Checkbox
          checked={todo.completed}
          onChange={() => dispatch(toggleTodo(todo.id))}
        />
        {editId === todo.id ? (
          <TextInput
            value={editText}
            onChange={(e) => setEditText(e.currentTarget.value)}
            onBlur={() => handleEditSave(todo.id)}
            onKeyPress={(e) => e.key === "Enter" && handleEditSave(todo.id)}
            autoFocus
          />
        ) : (
          <span
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text}
          </span>
        )}
        <Group>
          <ActionIcon
            onClick={() =>
              editId === todo.id
                ? handleEditSave(todo.id)
                : handleEditStart(todo)
            }
          >
            <IconEdit size={18} />
          </ActionIcon>
          <ActionIcon color="red" onClick={() => dispatch(deleteTodo(todo.id))}>
            <IconTrash size={18} />
          </ActionIcon>
        </Group>
      </Group>
    </Paper>
  );
};

const Lesson7 = () => {
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

  const filteredTodos = todos.filter((todo: Todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const handleAddTodo = () => {
    if (!input.trim()) return;
    dispatch(
      addTodo({
        id: Date.now(),
        text: input,
        completed: false,
      })
    );
    setInput("");
  };

  const handleFilterChange = (value: string) => {
    setFilter(value as "all" | "active" | "completed");
  };

  const moveItem = (dragIndex: number, hoverIndex: number) => {
    dispatch(
      moveTodo({
        oldIndex: dragIndex,
        newIndex: hoverIndex,
      })
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container size="sm" py="xl">
        <Stack>
          <Group>
            <TextInput
              value={input}
              onChange={(e) => setInput(e.currentTarget.value)}
              placeholder="Add new task"
              style={{ flex: 1 }}
            />
            <Button onClick={handleAddTodo}>Add</Button>
          </Group>

          <SegmentedControl
            value={filter}
            onChange={handleFilterChange}
            data={[
              { label: "All", value: "all" },
              { label: "Active", value: "active" },
              { label: "Completed", value: "completed" },
            ]}
            fullWidth
          />

          <Stack>
            {filteredTodos.map((todo: Todo, index: number) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                index={index}
                moveItem={moveItem}
              />
            ))}
          </Stack>
        </Stack>
      </Container>
    </DndProvider>
  );
};

export default Lesson7;

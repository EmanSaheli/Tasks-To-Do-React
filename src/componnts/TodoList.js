import * as React from "react";
import Button from "@mui/material/Button";
//import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { v4 as uuidv4 } from "uuid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";

import Todo from "./Todo.js";
import { TodosContext } from "../contexts/todosContext.js";
import { useContext, useState, useEffect } from "react";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);

  const [titleInput, setTitleInput] = useState("");
  const [displayTodosType, setDisplayTodosType] = useState("all");
  const completedTodos = todos.filter((t) => {
    return t.isCompeted;
  });
  const notcompletedTodos = todos.filter((t) => {
    return !t.isCompeted;
  });
  let todosToBeRindered = todos;
  if (displayTodosType == "completed") {
    todosToBeRindered = completedTodos;
  } else if (displayTodosType == "non-completed") {
    todosToBeRindered = notcompletedTodos;
  } else {
    todosToBeRindered = todos;
  }

  const todoTask = todosToBeRindered.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });

  useEffect(() => {
    console.log("calling use effect");
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
  }, []);

  function changeDisplyType(e) {
    setDisplayTodosType(e.target.value);
  }
  function handelClick() {
    const todoAdd = {
      id: uuidv4(),
      title: titleInput,
      isCompeted: false,
      details: "",
    };
    const updatedTodos = [...todos, todoAdd];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
  }

  return (
    <Container maxWidth="md" style={{ color: "white" }}>
      <Card
        sx={{
          minWidth: 400,
          background: "",
          display: "",
          justifyContent: "center",
          alignItems: "center",
        }}
        style={{ maxWidth: "80vh", overflow: "scroll" }}
      >
        <CardContent>
          <Typography
            variant="h5"
            sx={{ fontSize: 40, marginTop: "30" }}
            color="text.secondary"
            gutterBottom
          >
            TASKS-DILY
            <Divider />
          </Typography>
          {/*filtter button*/}
          <ToggleButtonGroup
            value={displayTodosType}
            onChange={changeDisplyType}
            aria-label="text alignment"
            style={{ textAlign: "30px" }}
          >
            <ToggleButton
              style={{ color: "rgb(207 181 232)" }}
              value="all"
              aria-label="left aligned"
            >
              All
            </ToggleButton>
            <ToggleButton value="completed" aria-label="centered">
              Done
            </ToggleButton>
            <ToggleButton value="non-completed" aria-label="right aligned">
              Uncompleted
            </ToggleButton>
          </ToggleButtonGroup>
          {/* //filtter button*/}

          {/* all to do list*/}
          {todoTask}
          {/* //all to do list*/}

          {/* input + add button */}
          <Grid container style={{ marginTop: "20px" }} spacing={2}>
            <Grid
              xs={8}
              background="green"
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="Task title"
                variant="outlined"
                value={titleInput}
                onChange={(e) => {
                  setTitleInput(e.target.value);
                }}
              />
            </Grid>

            <Grid
              xs={4}
              style={{ background: "white" }}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <Button
                style={{ width: "100%", height: "100%" }}
                variant="contained"
                onClick={() => {
                  handelClick();
                }}
                disabled={titleInput.length == 0}
              >
                Add
              </Button>
            </Grid>
          </Grid>

          {/* //input + add button */}
        </CardContent>
      </Card>
      <CardActions></CardActions>
    </Container>
  );
}

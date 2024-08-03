import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
//import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
//import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
//import Button from '@mui/material/Button';
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { TodosContext } from "../contexts/todosContext.js";
import { useContext, useState } from "react";

//props
export default function Todo({ todo, handelCheck }) {
  const [showDeletDilog, setShowDeletDilog] = useState(false);
  const [showUpdateDilog, setShowUpdateDilog] = useState(false);
  const { todos, setTodos } = useContext(TodosContext);
  const [updatedTodo, setUpdatedTdo] = useState({
    title: todo.title,
    details: todo.details,
  });

  function handelCheckClick() {
    const updstedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompeted = !t.isCompeted;
      }
      return t;
    });
    setTodos(updstedTodos);
    localStorage.setItem("todos", JSON.stringify(updstedTodos ));
    
  }

  function hanelDeletClick() {
    setShowDeletDilog(true);
  }

  function handelDeletDilogClose() {
    setShowDeletDilog(false);
  }

  function handelDeletConfirm() {
    //   تمر على كل العناصر
    const updatedTodos = todos.filter((t) => {
      return t.id != todo.id;
    });

    setTodos(updatedTodos);
    
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handelUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        return{ ...t, title: updatedTodo.title, details: updatedTodo.details };
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    setShowUpdateDilog(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
   
  }

  function handelUpdateDilogClose() {
    setShowUpdateDilog(false);
  }
 

  function hanelUpdateClick() {
    setShowUpdateDilog(true);
  }
  //=======UPDATE==============
  // ==========EVENT HANDLER==========
  return (
    <>
      {/* Delet*/}

      <Dialog
        onClose={handelDeletDilogClose}
        open={showDeletDilog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {" Are you sure you want to delete this task"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You can't undo after deleting this task.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handelDeletConfirm}> Delete</Button>
          <Button onClick={handelDeletDilogClose} autoFocus>
         
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {/* //Delet*/}

      {/* UODATE*/}
      <Dialog
        onClose={handelUpdateDilogClose}
        open={showUpdateDilog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {" Are you sure you want to  Update this task"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label=" Address"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) => {
              setUpdatedTdo({ ...updatedTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label=" content"
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(e) => {
              setUpdatedTdo({ ...updatedTodo, details: e.target.value });
            }}
          />
          <DialogContentText id="alert-dialog-description">
            You can't undo after deleting this task.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handelUpdateConfirm}> update</Button>
          <Button onClick={handelUpdateDilogClose} autoFocus>
          
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* //UODATE*/}

      {/*classname chenge hover in App.css*/}
      <Card
        className="todoCard"
        sx={{
          minWidth: 400,
          background: "#567389",
          color: "white",
          marginTop: "30px",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={8} style={{ background: "" }}>
              <Typography variant="h5" style={{ textAlign: "left", textDecoration:todo.isCompeted? "line-through":"none"}}>
                {todo.title}
              </Typography>
              <Typography variant="h6" style={{ textAlign: "left" }}>
                {todo.details}
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              //background="green"
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/*classname chenge hover in App.css*/}

              {/* delet button */}
              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{ color: "whit", border: "solid white  3px" }}
                onClick={hanelDeletClick}
              >
                <DeleteIcon />
              </IconButton>
              {/* //delet button */}

              {/* chick button */}
              <IconButton
                onClick={() => {
                  handelCheckClick();
                }}
                className="iconButton"
                aria-label="check"
                style={{
                  color: todo.isCompeted ? "white" : "rgb(207 181 232)",
                  background: todo.isCompeted ? "rgb(207 181 232)" : "white",
                  border: "solid white  3px",
                }}
              >
                <CheckIcon />
              </IconButton>
              {/* //chick button */}

              {/* UPDATE button */}
              <IconButton
                className="iconButton"
                aria-label="edit"
                style={{ color: "whit", border: "solid white  3px" }}
                onClick={hanelUpdateClick}
              >
                <EditIcon />
              </IconButton>
              {/* ///UPDATE button */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

import React, { useContext } from "react";
import Modal from "@mui/material/Modal";
import NotesForm from "../NotesForm/NotesForm";
import NotesCard from "./NotesCard/NotesCard";
import Button from "../UiElements/Button/Button";
import { NotesContext } from "../../App";
import { BiPlusMedical } from "react-icons/bi";
import Styles from "./NotesList.module.css";
import { Box } from "@mui/system";

function NotesList({notesList}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { searchItem, setNotesList, setEditedNote, setIsEdit } = useContext(NotesContext);

  const onDelete = (deletedNoteId) => {
    setNotesList(() => {
      const updatedNotesList = notesList.filter((note) => {
        return note.id !== deletedNoteId;
      });
      return updatedNotesList;
    });
  };
  const onEdit = (editedNoteId) => {
    const Note = notesList.find((note) => {
      return note.id === editedNoteId;
    });
    setEditedNote(Note);
    setIsEdit(true);
  };
  const completeToggler = (completedNoteId) => {
    const Note = notesList.find((note) => {
      return note.id === completedNoteId;
    });
    const newNote = notesList.map((note) =>
      note.id === Note.id
        ? {
            id: Note.id,
            Title: Note.Title,
            Desc: Note.Desc,
            completed: !Note.completed,
          }
        : note
    );
    setNotesList(newNote);
  };

  return (
    <div>
      {notesList.length === 0 && searchItem ? (
        <div className={Styles.NotesList__container}>
          <h1>Could not find any items</h1>
        </div>
      ) : notesList.length === 0 ? (
        <div className={Styles.NotesList__container}>
          <h1>
            May be you would like to add a note !!!
            <br />
          </h1>
          <Button
            Btntype="regular"
            className={Styles.NotesList__addnote_button}
            onClick={handleOpen}
          >
            Add Note
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box>
              <NotesForm handleClose={handleClose} notesList={notesList} />
              {/* <NotesForm handleClose={handleClose}  /> */}
            </Box>
          </Modal>
        </div>
      ) : (
        <div className={Styles.NotesList__container}>
          {notesList.map((note) => (
            <NotesCard
              key={note.id}
              id={note.id}
              Title={note.Title}
              Desc={note.Desc}
              completed={note.completed}
              onDelete={onDelete}
              onEdit={onEdit}
              completeToggler={completeToggler}
              handleOpen={handleOpen}
            />
          ))}
          <button
            className={Styles.NotesList__addnote_icon}
            onClick={handleOpen}
          >
            <BiPlusMedical />
          </button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            {/* <NotesForm handleClose={handleClose} /> */}
            <NotesForm handleClose={handleClose} notesList={notesList} />
          </Modal>
        </div>
      )}
    </div>
  );
}

export default NotesList;

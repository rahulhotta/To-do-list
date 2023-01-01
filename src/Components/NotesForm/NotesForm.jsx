import { React, useContext, useEffect, useRef } from "react";
import { NotesContext } from "../../App";
import Button from "../UiElements/Button/Button";
import { AiOutlineClose } from "react-icons/ai";
import Styles from "./NotesForm.module.css";

function NotesForm(props) {
  const { setNotesList, editedNote, setEditedNote } = useContext(NotesContext);
  const formRef = useRef(null);
  console.log(formRef.current);

  const updateNote = (id, Title, Desc) => {
    const newNote = props.notesList.map((note) =>
      note.id === id ? { id, Title, Desc, completed: false } : note
    );
    setNotesList(newNote);
    setEditedNote("");
  };

  useEffect(() => {
    if (editedNote) {
      formRef.current.title.value = editedNote.Title;
      formRef.current.desc.value = editedNote.Desc;
    } else {
      formRef.current.title.value = "";
      formRef.current.desc.value = "";
    }
  }, [editedNote]);

  const formHandler = (e) => {
    e.preventDefault();

    let noteId = new Date().getTime().toString();
    if (!editedNote) {
      const title = formRef.current.title.value.trim();
      const desc = formRef.current.desc.value.trim();
      const formData = {
        id: noteId,
        Title: title.trim(),
        Desc: desc.trim(),
        completed: false,
      };
      setNotesList((prevData) => {
        return [formData, ...prevData];
      });
      formRef.current.title.value = "";
      formRef.current.desc.value = "";
      props.handleClose();
    } else {
      updateNote(
        editedNote.id,
        formRef.current.title.value,
        formRef.current.desc.value
      );
    }

    props.handleClose();
  };

  return (
    <div className={Styles.NotesForm__page_container}>
      <form
        className={Styles.NotesForm__container}
        onSubmit={formHandler}
        ref={formRef}
      >
        {" "}
        <div className={Styles.NotesForm__close_btn}>
          <button Btntype="regular" type="Submit" onClick={props.handleClose}>
            <AiOutlineClose />
          </button>
        </div>
        <div className={Styles.NotesForm__title_input}>
          <label>Enter Title</label>
          <input type="text" name="title"  required />
        </div>
        <div className={Styles.NotesForm__desc_input}>
          <label>Enter Description</label>
          <textarea
            cols="10"
            rows="5"
            name="desc"
            required
          ></textarea>
        </div>
        <div className={Styles.NotesForm__footer}>
          <Button Btntype="submit" type="Submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default NotesForm;

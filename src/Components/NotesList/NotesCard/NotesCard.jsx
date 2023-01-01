import {React,useState} from "react";

import "./NotesCard.css";


import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdOutlineDone } from "react-icons/md";
import { MdRemoveDone } from "react-icons/md";

function NotesCard(props) {
  const editCard = () => {
    props.handleOpen();
    props.onEdit(props.id);
  };
  const deleteCard = () => {
    props.onDelete(props.id);
  };
  const completeCard = () => {
    setComplete(() => !complete)
    props.completeToggler(props.id);
  };

  const [complete, setComplete] = useState(props.completed);
  
  return (
    <div
      className={
        complete
          ? "NotesCard__Container NotesCard__complete"
          : "NotesCard__Container"
      }
    >
      <h2 className="NotesCard__title">{props.Title}</h2>
      <h4 className="NotesCard__desc">{props.Desc}</h4>
      <div className="NotesCard__buttons">
        <button onClick={editCard} className="NotesCard__edit_button">
          <AiFillEdit />
        </button>
        <button onClick={deleteCard} className="NotesCard__button">
          <AiFillDelete />
        </button>

        <button onClick={completeCard} className="NotesCard__button">
          {complete ? <MdRemoveDone /> : <MdOutlineDone />}
        </button>
      </div>
    </div>
  );
}

export default NotesCard;

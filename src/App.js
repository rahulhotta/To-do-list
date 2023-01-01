import NotesList from "./Components/NotesList/NotesList";
import NavBar from "./Components/NavBar/NavBar";
// import SearchItems from "./Components/SeacrItems/SearchItems";

import { createContext, useState, useEffect } from "react";

import "./App.css";
const getData = () => {
  const notes = localStorage.getItem("Notes");
  if (notes) {
    return JSON.parse(localStorage.getItem("Notes"));
  } else {
    return [];
  }
};
export const NotesContext = createContext();
function App() {
  // Creating the NotesList
  const [searchItem, setSearchItem] = useState(null);
  const [notesList, setNotesList] = useState(getData());
  const [filteredList, setFilteredList] = useState([]);
  const [editedNote, setEditedNote] = useState(null);
  const [percentage, setPercentage] = useState(0);

  // Setting data to localStorage when ever NotesList changes

  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(notesList));
    // console.log(notesList)
    let total_length = notesList.length;
    let completed_length = notesList.reduce((accumulator, currentValue) => {
      if (currentValue.completed) {
        accumulator += 1;
      }
      return accumulator;
    }, 0);
    let background_length = (completed_length / total_length) * 100;
    setPercentage(background_length);
  }, [notesList]);

  useEffect(() => {
    let searchList = notesList.filter((note) => {
      if (note.Title.includes(searchItem) || note.Desc.includes(searchItem)) {
        return note;
      }
    });
    setFilteredList(searchList);
    console.log(searchList);
  }, [searchItem]);
  return (
    // <div style={{ backgroundColor: `hsl(${percentage}, 100%, 93%)` }}>
    <div
      className="app"
      style={{
        backgroundImage: `linear-gradient(to left, rgba(255, 0 , 0,${
          1 - percentage / 100
        }), rgba(60, 179, 113,${percentage / 100}))`,
      }}
    >
      <NotesContext.Provider
        value={{
          searchItem,
          setNotesList,
          editedNote,
          setEditedNote,
        }}
      >
        <NavBar setSearchItem={setSearchItem} />

        {/* <NotesList /> */}
        <NotesList notesList={searchItem ? filteredList : notesList} />
      </NotesContext.Provider>
    </div>
  );
}

export default App;

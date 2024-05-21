import CreateNoteForm from './components/CreateNoteForm';
import './App.css'
import Note from './components/Note';
// import {Filters} from "./components/Filters"
import { useEffect, useState } from 'react';
import { CreateNote, fetchNotes } from '../servicies/notes';
import Filters from './components/Filters';


function App() {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState({
    search: "",
    sortItem: "date",
    sortOrder: "desc"
  })

useEffect(()=>{
  const fetchData  = async () => {
  let data =  await fetchNotes(filter)
  
 setNotes(data.notes);
  }
 fetchData();
 
}, [filter])

const onCreate = async (note) => {
  await CreateNote(note);
  let data =  await fetchNotes(filter)
  
 setNotes(data.notes);
}

  return (
    <section className="p-8 flex flex-row jusify-start items-start gap-12">
      <div className="flex flex-col w-1/3 gap-10">
       <CreateNoteForm onCreate={onCreate} />
       <Filters filter={filter} setFilter={setFilter}></Filters>
       
       </div>
       <ul className='flex flex-col gap-5  w-1/2'>
        { console.log(notes)} 
        {notes.map(n =>  {return(
        <li key={n.id}><Note title={n.title} description={n.description} createdAt={n.createdAt}></Note></li>)})} 
        
       </ul>
      
    </section>
  )
}



 

export default App

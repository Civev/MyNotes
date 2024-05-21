import {Input} from "@chakra-ui/react"
import { Textarea } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import { useState } from "react"
import propTypes from "prop-types"
export default function CreateNoteForm({onCreate}) {

  const [note, setNote] = useState(null)


  const onSubmit = (e) =>{
    e.preventDefault();
    setNote(null);
    onCreate(note)
  }
    return (
     
      <form onSubmit={onSubmit} className="w-full flex-col gap-3">
      <h3 className='font-bold text-xl'>Создание заметки</h3>
      <Input value={note?.title ?? ""} className='m-2' placeholder='Название заметки' onChange={(e) => setNote({...note, title: e.target.value})}></Input>
      <Textarea value={note?.description ?? ""} className='m-2' placeholder='Описание' onChange={(e) => setNote({...note, description: e.target.value})}></Textarea>
      <Button type="submit" className='m-2' colorScheme='teal'>Создать</Button>
      </form>
        
    )
  }
 CreateNoteForm.propTypes = {
  onCreate: propTypes.any
 }
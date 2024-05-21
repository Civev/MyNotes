
import axios from "axios"

export const fetchNotes = async (filter) =>{
    try
    {
        var response = await axios.get("https://localhost:44334/Note", {
            params:{
                search: filter?.search,
                sortItem: filter?.sortItem,
                sortOrder: filter?.sortOrder

            }
        });
        return response.data;
    }
    catch(e){
        console.error(e);
    }
   
   console.log(response.data);
}

export const CreateNote = async (note) =>{
    try
    {
        console.log(note)
        var response = await axios.post("https://localhost:44334/Note",note);
        
        return response.status
    }
    catch(e){
        console.error(e);
    }
   
 
}
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getElf, deleteListItem, saveListForElf } from "../utils";
import SantaList from "../components/santaList";

export default function Elf() {

    const [elfData, setElfData] = useState(null)
    const [elfList, setElfList] = useState([])
    const [newListItemLink, setNewListItemLink] = useState("")
    const [newListnewListItemLinkNotes, setNewListnewListItemLinkNotes] = useState("")
    const [errorMessage, setErrorMessage] = useState()

    const { elfId } = useParams()

    useEffect(() => {
        if (elfId) {
            const data = getElf(elfId)
            setElfData(data)
            if (!data) throw new Error("User not found")
        }

    }, [elfId])

    useEffect(() => {
        if (elfData) {
            setElfList(elfData.list)
        }
    }, [elfData])

    const onDeleteListItem = (id) => {
        deleteListItem(elfId, id)
        const newElfData = getElf(elfId)

        if (newElfData) {
            setElfList(newElfData.list)
        }
    }
    
      const errorAlert= ( 
        errorMessage && 
        <div className="alert alert-danger" role="alert">
          Error: {errorMessage}
           </div> 
      )
    
      const clearError = () => {
        setErrorMessage(null)
      }
    
      const onInputChange = (input, event) => {
        clearError()
        input(event.target.value)
    
      }
    
      const onSubmit = () => {
        // axios.post('/hijames', {name, message})
        //   .then(function (response) {
        //     clearError()
        //     setName("")
        //     setMessage("")
        //   })
        //   .catch(function (response) { 
        //     const errorMessage = response?.response?.data ? response.response.data : "Error submitting request"
    
        //     setErrorMessage(errorMessage)
        //   });

        const newList = elfList
        const newListItem = {"id": crypto.randomUUID(), "link": newListItemLink, "notes": newListnewListItemLinkNotes} //TODO input validation
        newList.push(newListItem)

        const savedList = saveListForElf(elfData.id, newList) // TODO error checking
        setElfList(savedList)

        setNewListItemLink("")
        setNewListnewListItemLinkNotes("")
      }

      const newItemForm = (
        <form>
        <div className="mb-3 w-75 ">
            <label for="link" className="form-label">
                Product link
            </label>
            <input type="text" className="form-control" id="link"
                value={newListItemLink} onChange={(change) => onInputChange(setNewListItemLink, change)} required />
        </div>
        <div className="mb-3 w-75">
            <label for="description" className="form-label">
                Description (optional)
            </label>
            <textarea
                className="form-control"
                id="description"
                value={newListnewListItemLinkNotes}
                onChange={(change) => onInputChange(setNewListnewListItemLinkNotes, change)}
                style={{ height: "300px" }}
            />
        </div>
        <button type="button" className="btn btn-primary" onClick={onSubmit}>
            Submit
        </button>
    </form>
      )


    if (!elfData) return (<></>)

    return (
        <div className="container">
            <h1 className="text-center">Secret Santa!</h1>

            <p>Hi <strong>{elfData.name}</strong>! You're the secret santa for <strong>{elfData.santaToObject.name}</strong></p>

            {errorAlert}

            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="self-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Your list</button>
                    <button className="nav-link" id="santa-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">{elfData.santaToObject.name}'s list</button>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="self-tab">
                    <div className="container"><SantaList list={elfList} editable onDelete={onDeleteListItem} /></div>
                    
                    <div className="container mt-5">
                        <h3>Add Item</h3>{newItemForm}</div>
                    </div>
                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="santa-tab"><SantaList list={elfData.santaToObject.list}
                    editable={false} /></div>
            </div>

            
        </div>
    )
}
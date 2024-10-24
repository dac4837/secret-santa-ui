import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getElf, deleteListItem } from "../utils";
import SantaList from "../components/santaList";

export default function Elf() {

    const [elfData, setElfData] = useState(null)
    const [elfList, setElfList] = useState([])

    const { elfId } = useParams()

    useEffect(() => {
        if (elfId) {
            const data = getElf(elfId)
            setElfData(data)
            if (!data) throw new Error("User not found")
        }

    }, [elfId])

    useEffect(() => {
        if(elfData) {
            setElfList(elfData.list)
        }
    }, [elfData])

    const onDeleteListItem = (id) => {
        deleteListItem(elfId, id)
        const newElfData = getElf(elfId)

        if(newElfData) {
            setElfList(newElfData.list)
        }
    }


    if (!elfData) return (<></>)

    return (
        <div className="container">
            <h1 className="text-center">Secret Santa!</h1>

            <p>Hi <strong>{elfData.name}</strong>! You're the secret santa for <strong>{elfData.santaToObject.name}</strong></p>

            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="self-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Your list</button>
                    <button className="nav-link" id="santa-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">{elfData.santaToObject.name}'s list</button>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="self-tab"><SantaList list={elfList}
                    editable onDelete={onDeleteListItem} /></div>
                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="santa-tab"><SantaList list={elfData.santaToObject.list}
                    editable={false} /></div>
            </div>
        </div>
    )
}
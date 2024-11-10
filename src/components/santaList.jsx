const MAX_LINK_LENGTH = 100;


export default function SantaList(props) {
    const { list, editable = false, onDelete } = props

    const listItems = list.map(item => {
        const linkText = item.link.length > MAX_LINK_LENGTH ? item.link.substring(0, MAX_LINK_LENGTH) + "..." : item.link

        const deleteButton = editable ? <button type="button" className="btn btn-danger" onClick={() => {onDelete(item.id)}}>delete</button> : <></>
        return (
            <li className="list-group-item" key={item.id}>
                <div className="d-flex w-100 justify-content-between"><a href={item.link} target="_blank"><p className="mb-1">{linkText}</p></a>
                    {deleteButton}
                </div>
                <small>{item.notes}</small>
            </li>
        )
    })

    return (
        <ul className="list-group">
            {listItems}
        </ul>
    )
}
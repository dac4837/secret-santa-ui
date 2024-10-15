const MAX_LINK_LENGTH = 100;

const dashCircle = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle" viewBox="0 0 16 16">
<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
<path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708"/>
</svg>

export default function SantaList(props) {
    const { list, editable = false, onDelete } = props

    const listItems = list.map(item => {
        const linkText = item.link.length > MAX_LINK_LENGTH ? item.link.substring(0, MAX_LINK_LENGTH) + "..." : item.link

        const deleteButton = editable ? <button type="button" className="btn btn-danger" onClick={() => {onDelete(item.id)}}>{dashCircle}</button> : <></>
        return (
            <li className="list-group-item" key={item.id}>
                <div className="d-flex w-100 justify-content-between"><a href={item.link}><p className="mb-1">{linkText}</p></a>
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
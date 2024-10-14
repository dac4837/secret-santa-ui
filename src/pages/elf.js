import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function Elf(props) {

    // const location = useLocation();
    // const [pathName, setPathName] = useState("null");

    const {elfId} = useParams()

    // useEffect(() => {
    //     if (location) {
    //         console.log(props.match)
    //         // let tmp = location.pathName.slice(location.pathName.lastIndexOf("/"), location.pathName.length);
    //         // setPathName(tmp);
    //     }
        
    // }, [location])

    return (
        <div>Page! {elfId}</div>
    )
}
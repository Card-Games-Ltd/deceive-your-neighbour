import React, {useEffect, useState} from 'react';
import './RoomsList.css';
import RoomItem from "../components/RoomItem";
import EnterRoomWindow from "../components/EnterRoomWindow";
import Header from "../components/Header";


export default function RoomsList() {
    const [rooms, setRooms] = useState([]);
    const [chosenRoomId, setChosenRoomId] = useState(null);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_PREFIX + "/api/rooms")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setRooms(data);
            })
            .catch(error => {
                console.error(error);
            })
    }, []);

    return (
         <div className='join-main'> 
             <Header />
             <div className='join-list'>
                 <div className='list-header'>Присоединиться к игре</div>
                 <div className='games-container'>
                     {rooms.map((item, key) => (
                         <RoomItem key={key} {...item} choose={() => setChosenRoomId(item.hash)}/>
                     ))}
                 </div>
                 {chosenRoomId && <EnterRoomWindow
                     hash={chosenRoomId}
                     close={() => setChosenRoomId(null)}
                 />}
             </div>
     </div>

    )
}
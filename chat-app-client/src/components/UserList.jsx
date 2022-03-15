import React, {useEffect, useState } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

import { InviteIcon } from '../assets';


const ListContainer = ({children}) => {
    return (
        <div className='user-list__container'>
            <div className='user-list__header'>
                <p>Users</p>
                <p>Invite</p>
            </div>
            {children}
            {console.log(children)}
        </div>
    )
}


const USerItem = ({user, setSelectedUser }) => {
    const [ selected, setSelected] = useState(false);

    const handleSelect = () => {
        if(selected){
            setSelectedUser((prevUser) => prevUser.filter((prevUser)=> prevUser !== user.id))
        }else {
            setSelectedUser((prevUser) => [ ...prevUser, user.id])
        }
        setSelected((prevSelected)=> !prevSelected);
    }
    return (
        <div className='user-item__wrapper' onClick={handleSelect}>
            <div className='user-item__name-wrapper'>
                <Avatar image={user.image} name={user.fullName || user.id} size={32} />
                <p className='user-item__name'>{user.fullName || user.id}</p>
            </div>
            {selected ? <InviteIcon /> : (<div className='user-item__invite-empty'> </div>)}
        </div>
    )
}


const UserList = ({setSelectedUser}) => {
    const { client } = useChatContext();
    const [ users, setUsers] = useState([]);
    const [ loading, setLoading] = useState(false);
    const [ listEmpty, setListEmpty] = useState(false);
    const [ error, setError ] = useState(false)

    useEffect(() => {
      const getUSers = async () => {
          if(loading) return;
          setLoading(true)

          try {
              const res = await client.queryUsers(
                {id: {$ne: client.userID} },
                {id: 1},
                {limit: 8}
              );
              if(res.users.length){
                  setUsers(res.users)
              }else {
                  setListEmpty(true);
              }

              
          } catch (error) {
              setError(error)
          }
          setLoading(false)

      }
    
      if(client) getUSers()
    }, []);

    if(error){
        return (
            <ListContainer>
                <div className='user=list__mesaage'>
                    Error loading, please try again nexte time
                </div>
            </ListContainer>
        )
    }

    if(listEmpty){
        return (
            <ListContainer>
                <div className='user=list__mesaage'>
                    No users found   
                </div>
            </ListContainer>
        )
    }
    

  return (
    <ListContainer >
        {loading ? <div className='user-list__message'>Loading users ...</div>
            : (
                users.map((user, i) => (
                    <USerItem index={i} key={user.id} user={user} setSelectedUser={setSelectedUser} />
                ))
            )
    }
    </ListContainer>
  )
}

export default UserList
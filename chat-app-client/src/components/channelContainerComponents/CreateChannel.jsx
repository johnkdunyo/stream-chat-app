import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';

import { UserList} from '../index';
import { CloseCreateChannel } from '../../assets';

const ChannelNameInput = ({ channelName = '',  setChannelName }) => {  

  const handleChange = (e) => {
    e.preventDefault();
    setChannelName(e.target.value)
  }
  return (
    <div className='channel-name-input__wrapper'>
      <p>Name</p>
      <input value={channelName} onChange={handleChange} placeholder="Channel name" />
      <p>Add Members</p>
    </div>
  )
}


const CreateChannel = ({createType, setIsCreating}) => {
  const { client, setActiveChannel } = useChatContext();
  const [ selectedUser, setSelectedUser] = useState([client.userID || ''])
  const [ channelName , setChannelName] = useState('');


  const createChannelHandler = async(e) => {
    e.preventDefault();

    try {
      console.log(channelName)
      const newChannel = await client.channel(createType,channelName, 
        {name: channelName, members:selectedUser});

        await newChannel.watch();

        setChannelName('');
        setIsCreating(false);
        selectedUser([client.userID]);
        setActiveChannel(newChannel)
      
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='create-channel__container'>
      <div className='create-channel__header'>
        <p>{createType === 'team' ? "Create a new Channel" : "Send a Direct Messsage"}</p>
        <CloseCreateChannel setIsCreating={setIsCreating} />
      </div>
      {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName} /> }
      <UserList selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      <div className='create-channel__button-wrapper' onClick={ createChannelHandler }>
        <p> {createType === 'team' ? 'Create Channel' : 'Create Message Group '}</p>
      </div>
    </div>
  )
}

export default CreateChannel
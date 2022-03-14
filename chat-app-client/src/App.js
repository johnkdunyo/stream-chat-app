import React, {useState} from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import  { ChannelContainer, ChannelListContainer, Auth  }from './components';

import 'stream-chat-react/dist/css/index.css'

const apiKey = '8z6f36qkxsmk'
const client = StreamChat.getInstance(apiKey);
const cookies = new Cookies();
const authToken = cookies.get("token")

if(authToken){
  client.connectUser( {
    id : cookies.get('userID'),
    name : cookies.get('userName'),
    fullName : cookies.get('fullName'),
    phoneNumber : cookies.get('phoneNumber'),
    image : cookies.get('avatarURL'),
    hashPassword : cookies.get('hashPassword'),
  }, authToken);
}

function App() {

  const [ createType, setCreateType] = useState('');
  const [ isCreating, setIsCreating ] = useState(false);
  const [ isEditing, setIsEditing] = useState(false)

  if(!authToken){
    return <Auth />
  }

  return (
    <React.Fragment>
      <div className='app__wrapper'>
        <Chat client={client} theme='theme light'>
          <ChannelListContainer 
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            setCreateType={setCreateType}
            setIsEditing={setIsEditing}
          />
          <ChannelContainer 
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            createType={createType}
          />
        </Chat>

      </div>
    </React.Fragment>
  );
}

export default App;

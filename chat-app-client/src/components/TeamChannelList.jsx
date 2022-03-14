import React from 'react';

import {AddChannel} from '../assets/AddChannel';

const TeamChannelList = ({children, error =false, loading, type, isCreating, setCreateType, setIsCreating, setIsEditing}) => {
    if(error){
        return type === 'team' ? (
            <div className='team-channel-list'>
                <p className='team-channel-list__message'>
                    Connection error, please try again
                </p>
            </div>
        ) : null;
    }

    if(loading){
        return (
            <div className='team-channel-list'>
                <p className='team-channel-list__message loading'>
                    { type === 'team' ? 'Channels' : 'Messages'} loading ...
                </p>
            </div>
        )
    }
  return (
    <div className='team-channel-list'>
        <div className='team-channel-list__header'>
            <p className='team-channel-list__header__tittle'>
                {type === 'team' ? 'Channels' : 'Direct Messages'}
            </p>
            {/* button... add channel */}
            <AddChannel
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                setIsEditing={setIsEditing}
                setCreateType={setCreateType}
                type={type=== 'team' ? 'team' : 'messaging'}
            />
        </div>
        {children}
    </div>
  )
}

export default TeamChannelList
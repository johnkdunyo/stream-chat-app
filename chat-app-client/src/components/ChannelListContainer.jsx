import React, { useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import {ChannelSearch, TeamChannelList, TeamChannelPreview } from './';


import HospitalIcon from '../assets/hospital.png';
import Logout from '../assets/logout.png';


// create a new cookie instance
const cookies = new Cookies();


const SideBar = ({logout}) => (
    <div className='channel-list__sidebar'>
        <div className='channel-list__sidebar__icon1'>
            <div className='icon1__inner'>
                <img src={HospitalIcon} alt='hospital icon' width='30' />
            </div>
        </div>

        <div className='channel-list__sidebar__icon2'>
            <div className='icon1__inner' onClick={logout}>
                <img src={Logout} alt='log out icon' width='30' />
            </div>
        </div>
    </div>
);


const CompanyHeader = () => (
    <div className='channel-list__header'>
        <p className='channel-list__header__text'>Medicap Pages</p>
    </div>
)

const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team')
}

const customChannelMessageFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'message')
}

const ChannelListContent = ({ isCreating, setIsCreating, setIsEditing, setCreateType}) => {

    const { client } = useChatContext();

    const filters = { members : {$in:[client.userID]}};

    const logout = () => {
        cookies.remove("token");
        cookies.remove('userID');
        cookies.remove('userName');
        cookies.remove('fullName');
        cookies.remove('phoneNumber');
        cookies.remove('avatarURL');
        cookies.remove('hashPassword');

        window.location.reload();

    }
  return (
    <React.Fragment>
        <SideBar logout={logout} />
        <div className='channel-list__list__wrapper'>
            <CompanyHeader />
            <ChannelSearch />
            <ChannelList
                filters={filters}
                channelRenderFilterFn={customChannelTeamFilter}
                List={(listProps)=>(
                    <TeamChannelList
                    { ...listProps} 
                    type="team"
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setIsEditing={setIsEditing}
                    setCreateType={setCreateType}
                    />
                )}
                Preview={(previewProps) => (
                    <TeamChannelPreview 
                    {...previewProps}
                    type="team"
                    />
                )}
             />


            <ChannelList
                filters={filters}
                channelRenderFilterFn={customChannelMessageFilter}
                List={(listProps)=>(
                    <TeamChannelList
                    { ...listProps} 
                    type="messaging"
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setIsEditing={setIsEditing}
                    setCreateType={setCreateType}
                    />
                )}
                Preview={(previewProps) => (
                    <TeamChannelPreview 
                    {...previewProps}
                    type="messaging"
                    />
                )}
             />


        </div>
    </React.Fragment>
  )
}


const ChannelListContainer = ({setCreateType, setIsCreating, setIsEditing}) => {
    const [toggleContainer, setToggleContainer] = useState(false);


    return (
        <React.Fragment>
        <div className='channel-list__container'>
            <ChannelListContent
                setIsCreating={setIsCreating}
                setCreateType={setCreateType}
                setIsEditing={setIsEditing}
            />
        </div>

        {/* <div className='channel-list__container-responsive'
            style={{left: toggleContainer ? "0%" : "-89%", backgroundColor: "#005fff" }}
        >
            <div className='channel-list__container-toggle' onClick={setToggleContainer((prevToggle) => !prevToggle)}></div>
            <ChannelListContent
                setIsCreating={setIsCreating}
                setCreateType={setCreateType}
                setIsEditing={setIsEditing}
                setToggleContainer={setToggleContainer}
            />

        </div> */}
        </React.Fragment>
    )

}

export default ChannelListContainer
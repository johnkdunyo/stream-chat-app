import React, {useState, useEffect} from 'react';
import { useChatContext } from 'stream-chat-react';

import {SearchIcon} from '../assets/SearchIcon';

const ChannelSearch = () => {

    const [query, setQuery ] = useState('');
    const [loading, setLoading] = useState(false);

    const onSearchHandler = (e) => {
        e.preventDefault();

        setLoading(true);
        setQuery(e.target.value);
        getChatChannel(e.target.value);
    }

    const getChatChannel = async (text) => {
        try {
            // TODO: fetch channels
        } catch (error) {
            setQuery('');
            
        }
    }

  return (
    <div className='channel-search__container'>
        <div className='channel-search__input__wrapper'>
            <div className='channel-search__input__icon'>
                <SearchIcon />
            </div>
            <input 
                className='channel-search__input__text'
                placeholder='search'
                type='text'
                value={query}
                onChange={onSearchHandler}
            
            />
        </div>

    </div>
  )
}

export default ChannelSearch
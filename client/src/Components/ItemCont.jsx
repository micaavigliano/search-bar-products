import React, { useState, useEffect, useCallback } from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios'
//componentes
import Searchbar from './SearchBar';
import List from './List';

const ItemCont = () => {
    let history = useHistory();
    const [loading, setLoading] = useState(false);
    const [itemsListResults, setItemsListResults] = useState({});
    const [results, setResults] = useState(false);
    const getItemsListResults = useCallback(
        async (query) => {
          setLoading(true);
          try {
            const response = await axios.get(
              `http://localhost:8080/api/items?q=${query}`
            );
            if (response.data.error) {
              console.error(response);
              setLoading(false);
              setItemsListResults(response.data);
            } else {
              setLoading(false);
              setResults(true);
              setItemsListResults(response.data.items);
              console.log(response.data.items)
              history.push(`/items?search=${query}`);
            }
          } catch (error) {
            setLoading(false);
            setItemsListResults(error);
          }
        },
        [history, setResults]
      );

    const handleSearch = useCallback((query) => {
        return getItemsListResults(query);
      }, [getItemsListResults]
    );

    console.log(itemsListResults)

    return (
      <div>
        <Searchbar onSubmit={(query) => handleSearch(query)}/>
        {
          loading ? (<p>Loading</p>) : results ? (<List  items={itemsListResults}/>) : null
        }
      </div>
    )
}

export default ItemCont;
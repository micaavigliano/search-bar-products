import React, { useState, useCallback } from 'react';
import { useHistory, Switch, Route } from 'react-router-dom'
import axios from 'axios'
//componentes
import Searchbar from './SearchBar';
import List from './List';
import ItemDetails from './ItemDetails';

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
              console.log(response.data)
              history.push(`/items?search=${query}`);
            }
          } catch (error) {
            setLoading(false);
            setItemsListResults(error);
          }
        },
        [setResults]
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
          loading ? (<p>Loading</p>) : (
            <Switch>
              <Route exact path="/items">
                {results && <List items={itemsListResults}/>}
              </Route>
              <Route  path="/items/:id" component={ItemDetails}/>
            </Switch>
          )}
      </div>
    )
}

export default ItemCont;
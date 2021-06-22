import React from 'react';
import styled from 'styled-components';
import Items from './Item';

const List = ({items}) => {
    console.log('list', items)
    return (
        <ListContainer>
            {items.length > 0 && items.map((item, id) => {
                return <Items item={item} key={id} />
            })}
            <p>AHHHHH</p>
        </ListContainer>
    )
}

const ListContainer = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    padding: auto;
    background-color: purple;
    width: 70%;
    height: auto;
    list-style: none;
    border-bottom: 2px solid grey;
`

export default List;
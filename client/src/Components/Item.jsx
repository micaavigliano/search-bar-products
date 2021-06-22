import React from 'react'
import styled from 'styled-components'

const Items = ({ item }) => {
    console.log('item', item.title)
    return (
        <ItemContainer>
            {/* <img src={item.picture} alt="" />
            <div>
                <p>{item.title}</p>
                <p>title</p>
                <p>info</p>
            </div>
            <div>
                <p>{item.location}</p>
            </div>
            <p>{item.title}</p> */}
            <p>AYUDA</p>
        </ItemContainer>
        //<p>{item.title}</p>
    )
}

const ItemContainer = styled.ul`
    background-color: pink;
    width: 70%;
`

export default Items;

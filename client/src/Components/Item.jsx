import React from 'react'
import ShippingLogo from '../img/ic_shipping.png'
import styled from 'styled-components'
import { useHistory } from 'react-router';


const Items = ({ item }) => {
    let history = useHistory();
    let formatter = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
      });
    let price = formatter.format(item.price.amount)
    return (
        <ItemContainer onClick={() => history.push(`/items/${item.id}`)}>
            <ImgContainer src={item.picture} alt="" />
            <div>
                <PriceInfo>
                    <p>{price}</p>
                    <ShippingImg src={ShippingLogo} alt=""/>
                </PriceInfo>
                <p>{item.title}</p>
            </div>
            <LocationContainter>
                <p>{item.location}</p>
            </LocationContainter>
        </ItemContainer>
    )
}

const ItemContainer = styled.button`
    background-color: white;
    border: none;
    width: 70%;
    display: flex;
    flex-direction: row;
    margin: 10px 0 10px 0;
    padding: 14px 0 14px 10px;
`
const ImgContainer = styled.img`
    margin-right: 16px;
    width: 20%;
    height: 20%;
    justify-self: center;
`

const PriceInfo = styled.div`
    display: flex;
    flex-direction: row;
`

const ShippingImg = styled.img`
    margin-top: 12px;
    margin-left: 10px;
    width: 15px;
    height: 15px;
`
const LocationContainter = styled.div `
    align-self: unset;
    background-color: violet;
`

export default Items;

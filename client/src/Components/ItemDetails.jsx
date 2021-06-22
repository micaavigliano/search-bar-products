import React, {useState, useCallback, useEffect} from 'react'
import axios from 'axios';
import styled from 'styled-components'
import NumberFormat from 'react-number-format';

const ItemDetails = (props) => {
    const id = props.match.params.id;
    const [itemDetails, setItemDetails] = useState({});
    const [hasItem, setHasItem] = useState(false);
    const [loading, setLoading] = useState(false);
    // let formatter = new Intl.NumberFormat('es-AR', {
    //     style: 'currency',
    //     currency: 'ARS',
    //   });
    // let price = formatter.format(itemDetails.price.amount)
  
    const getDetails = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:8080/api/items/${id}`);
            setLoading(false);
            if (res.data.error) {
                console.log(res.data.error)
              } else {
                setItemDetails(res.data);
                setHasItem(true)
              }
        } catch(error) {
            console.log(error)
        }
    }, [id])

    useEffect(() => {
        getDetails();
        console.log(itemDetails)
      }, [getDetails]);

    return (
        <Container>
            {loading ? (<p>loading</p>) : (
                <>
                    {hasItem && 
                        (<div>
                            <InfoWrapper>
                                <ImgContainer src={itemDetails.picture}/>
                                <ItemInfo>
                                    <p>{itemDetails.condition} - {itemDetails.soldQuantity} vendidos</p>
                                    <p>{itemDetails.title}</p>
                                    <NumberFormat 
                                        value={itemDetails.price.amount} displayType={'text'}
                                        decimalSeparator="," 
                                        thousandSeparator="."
                                        prefix={'$ '}/>
                                    <div>Comprar</div>
                                </ItemInfo>
                            </InfoWrapper>
                            <div>
                                <p>Descripción del producto</p>
                                <p>{itemDetails.description}</p>
                            </div>
                        </div>)}
                </>)}
        </Container>
    )
}

const Container = styled.div`
    margin-top: -16px;
    width: 60%;
    margin: auto;
    height: auto;
    border: 2px solid grey;
`

const ImgContainer = styled.img`
    width: 40%;
    height: 15%;
    margin: 2% 15% 8% 15%;
`

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
`
const ItemInfo = styled.div`
    margin: 2% 0 0 0;
`


export default ItemDetails;
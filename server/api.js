const axios = require('axios')

const author = {
    name: 'Micaela',
    lastName: 'Avigliano',
};

exports.getItems = (query) => {
    const url = `https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4`

    return axios
        .get(url)
        .then((res) => {
            const items = res.data.results.map((item) => {
                return {
                  id: item.id,
                  title: item.title,
                  price: {
                    currency: item.currency_id,
                    amount: Math.floor(item.price),
                    decimals: item.price % 1,
                  },
                  picture: item.thumbnail,
                  condition: item.condition,
                  freeShipping: item.shipping.free_shipping,
                  location: item.address.state_name,
                };
              });
        
            //   const categories = !_.isEmpty(res.data.filters)
            //     ? res.data.filters[0].values[0].path_from_root.map(
            //         (value) => value.name
            //       )
            //     : [];
        
              return {
                author,
                //categories,
                items,
              };
            })
        .catch(function (error) {
            console.log(error);
        });
};

exports.getItemsDetails = async(query) => {
    const firstRequest = axios.get(`https://api.mercadolibre.com/items/${query}`);
    const secondRequest = axios.get(
      `https://api.mercadolibre.com/items/${query}/description`
    );
  
    try {
      const responses = await Promise.all([firstRequest, secondRequest]);
      const [item, description] = responses;
  
      const itemDetails = {
        id: item.data.id,
        title: item.data.title,
        price: {
          currency: item.data.currency_id,
          amount: Math.floor(item.data.price),
          decimals: item.data.price % 1,
        },
        picture: item.data.pictures[0].url,
        condition: item.data.condition === 'new' ? 'Nuevo' : 'Usado',
        freeShipping: item.data.shipping.free_shipping,
        soldQuantity: item.data.sold_quantity,
        description: description.data.plain_text,
      };
  
      return [
        author,
        itemDetails,
      ];
    } catch (error) {
      console.log(error);
    }
}

import { useState, useEffect } from 'react';
import { API_KEY, API_URL } from '../config';

import Preloader from './Preloader';
import GoodsList from './GoodsList';
import Cart from './Cart';
import BasketList from './BasketList';
import Alert from './Alert';

console.log(API_KEY);

function Shop() {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [isBasketShow, setBasketShow] = useState(false);
  const [alertName, setAlertName] = useState('');

  useEffect(function getGoods() {
    fetch(API_URL, {
      headers: { Authorization: API_KEY },
    })
      .then((response) => response.json())
      .then((data) => {
        data.featured && setGoods(data.featured);
        setLoading(false);
      });
  }, []);

  const addToBasket = (item) => {
    const itemIndex = order.findIndex((orderItem) => orderItem.id === item.id);

    if (itemIndex !== -1) {
      const newOrder = order.map((orderItem, index) => {
        if (index === itemIndex) {
          return {
            ...orderItem,
            quantity: orderItem.quantity + 1,
          };
        } else {
          return orderItem;
        }
      });
      setOrder(newOrder);
    } else {
      const newItem = {
        ...item,
        quantity: 1,
      };
      setOrder([...order, newItem]);
    }

    setAlertName(item.name);
  };

  const handleBasketShow = () => {
    setBasketShow(!isBasketShow);
  };

  const deleteItemFromBasket = (id) => {
    const newOrder = order.filter((item) => item.id !== id);
    setOrder(newOrder);
  };

  const incQuantity = (itemId) => {
    const newOrder = order.map((orderItem) => {
      if (orderItem.id === itemId) {
        return {
          ...orderItem,
          quantity: orderItem.quantity + 1,
        };
      } else {
        return orderItem;
      }
    });
    setOrder(newOrder);
  };

  const decQuantity = (itemId) => {
    const newOrder = order.map((orderItem) => {
      if (orderItem.id === itemId) {
        if (orderItem.quantity > 1) {
          return {
            ...orderItem,
            quantity: orderItem.quantity - 1,
          };
        }
      }
      return orderItem;
    });
    setOrder(newOrder);
  };

  const closeAlert = () => setAlertName('');

  return (
    <main className="container content">
      <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
      {loading ? (
        <Preloader />
      ) : (
        <GoodsList goods={goods} addToBasket={addToBasket} />
      )}

      {isBasketShow && (
        <BasketList
          order={order}
          handleBasketShow={handleBasketShow}
          deleteItemFromBasket={deleteItemFromBasket}
          incQuantity={incQuantity}
          decQuantity={decQuantity}
        />
      )}

      {alertName && <Alert name={alertName} closeAlert={closeAlert} />}
    </main>
  );
}

export default Shop;

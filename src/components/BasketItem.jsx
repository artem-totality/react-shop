function BasketItem(props) {
  const {
    id,
    name,
    price,
    quantity,
    deleteItemFromBasket = Function.prototype,
    incQuantity = Function.prototype,
    decQuantity = Function.prototype,
  } = props;
  return (
    <li className="collection-item ">
      {name}{' '}
      <i
        className="material-icons basket-quantity"
        onClick={() => decQuantity(id)}
      >
        remove
      </i>{' '}
      x {quantity}{' '}
      <i
        className="material-icons basket-quantity"
        onClick={() => incQuantity(id)}
      >
        add
      </i>{' '}
      = {price * quantity} руб.
      <span
        className="secondary-content"
        onClick={() => deleteItemFromBasket(id)}
      >
        <i className="material-icons iteme-delete">close</i>
      </span>
    </li>
  );
}

export default BasketItem;

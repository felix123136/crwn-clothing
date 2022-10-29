import { CartItemContainer, ItemDetails, ItemDetail } from "./cart-item.styles";

const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <ItemDetail>{name}</ItemDetail>
        <ItemDetail>
          {quantity} x ${price}
        </ItemDetail>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;

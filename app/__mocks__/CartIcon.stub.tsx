import React from 'react';

export default function CartIconStub(props: { onClick?: () => void }) {
  return <button data-testid="cart-icon-stub" onClick={props.onClick}>Cart</button>;
}

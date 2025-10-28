import React from 'react';

export default function CardVentasStub(props: Readonly<{ productos?: any[] }>) {
  const count = props.productos?.length ?? 0;
  return <div data-testid="card-ventas">Card Ventas - {count} productos</div>;
}

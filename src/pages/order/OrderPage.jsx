import '../../App.css';
import '../../api/OrderApi.js';
import OrderComponents from '../../components/order/OrderComponents.jsx';
import React, { useEffect, useState } from 'react';

function OrderPage() {

  return (
      <div><OrderComponents/></div>
  );
}

export default OrderPage;
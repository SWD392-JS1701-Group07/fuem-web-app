import OrderTable from './component/OrderTable'
import { getOrders } from '@/api/orderApi'
import React, { useState } from 'react'
import { Order } from   '@/constants/models/Ticket'

const OrderList = () => {
  const [data, setData] = useState<Order[]>([])

  const getOrder = async () => {
    const response = await getOrders()
    setData(response.data)
  }
  React.useEffect(() => {
    getOrder()
  }, [])

  return (
    <div className="h-screen w-10/12 p-4">
      <p className="text-3xl font-semibold">Orders</p>
      <OrderTable data={data} />
    </div>
  )
}

export default OrderList

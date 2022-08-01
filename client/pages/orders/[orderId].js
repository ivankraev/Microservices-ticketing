import React, { useState, useEffect } from 'react'

const OrderShow = ({ order }) => {
    const [timeLeft, setTimeLeft] = useState(0)

    useEffect(() => {
        const findTimeLeft = () => {
            const msLeft = new Date(order.expiresAt) - new Date()
            setTimeLeft(Math.round(msLeft / 1000))
        }
        findTimeLeft()
        const timeId = setInterval(findTimeLeft, 1000)

        return () => {
            clearInterval(timeId)
        }

    }, [])


    if (timeLeft < 0) {
        return (
            <div>Order expired.</div>
        )
    }

    return (
        <div>
            {timeLeft} seconds until order expires
        </div>
    )
}

OrderShow.getInitialProps = async (ctx, client) => {
    const { orderId } = ctx.query
    const { data } = await client.get(`/api/orders/${orderId}`)


    return { order: data }

}

export default OrderShow
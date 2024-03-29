import React, { useState } from 'react'
import useRequest from '../../hooks/use-request'
import Router from 'next/router'


const NewTicket = () => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")

    const { doRequest, errors } = useRequest({
        url: '/api/tickets',
        method: 'post',
        body: {
            title, price
        },
        onSuccess: () => { Router.push('/') }
    })

    const onSubmit = (e) => {
        e.preventDefault()

        doRequest()
    }





    const formatPrice = () => {
        const value = parseFloat(price)

        if (isNaN(value)) {
            return
        }

        setPrice(value.toFixed(2))
    }


    return (
        <div>
            <h1>Create a ticket</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input value={title} className="form-control" type="text" onChange={(e) => { setTitle(e.target.value) }} />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input value={price}
                        className="form-control"
                        type="text"
                        onChange={(e) => { setPrice(e.target.value) }}
                        onBlur={formatPrice}
                    />
                </div>
                {errors}
                <button className="btn btn-primary mt-2">Submit</button>
            </form>
        </div>

    )
}

export default NewTicket
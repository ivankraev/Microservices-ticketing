import axios from 'axios'
import { useState } from 'react'

export default ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null)
    const doRequest = async () => {
        try {
            const res = await axios[method](url, body)
            if (onSuccess) {
                onSuccess()
            }
            return res.data
        } catch (err) {
            setErrors(
                <div className="alert alert-danger">
                    <h4>Oops...</h4>
                    <ul className="my-0"></ul>
                    {err.response.data.errors.map(err => <li key={err.message}>{err.message}</li>)}
                </div>
            )
        }
    }

    return { doRequest, errors }

}
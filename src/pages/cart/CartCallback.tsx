import { CircleCheckBig, OctagonX } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface VnpayResponse {
  success?: string
  orderId?: string
  orderDescription?: string
}

const CartCallback: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [vnpayResponse, setVnpayResponse] = useState<VnpayResponse>({})
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    params.forEach((value, key) => {
      console.log(`${key}: ${value}`)
    })

    const response: VnpayResponse = {
      success: params.get('success') || '',
      orderId: decodeURIComponent(params.get('orderId') as string) || '',
      orderDescription: decodeURIComponent(params.get('orderDescription') as string) || ''
    }

    setVnpayResponse(response)

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer)
          navigate('/event')
        }
        return prevCountdown - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [location.search, navigate])

  return (
    <div>
      <div
        id="section"
        className="relative bg-black bg-no-repeat py-14 pb-28 font-poppins text-white"
      >
        <div
          id="row"
          className="relative m-auto flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat py-7"
        >
          <h1 className="font-jura text-9xl font-extrabold">
            {vnpayResponse.success === 'true' ? (
              <div className="flex flex-row">
                <CircleCheckBig color="#00ff40" className="h-32 w-32" />
                <h1 className="ml-5 text-9xl font-extrabold">Success</h1>
              </div>
            ) : (
              <div className="flex flex-row">
                <OctagonX className="h-32 w-32" />
                <h1 className="ml-5 text-9xl font-extrabold">Failed</h1>
              </div>
            )}
          </h1>
          <h2 className="mt-10 font-jura text-3xl font-extrabold">
            {vnpayResponse.success === 'true'
              ? 'Thank you for your purchase! Enjoy your event!'
              : 'Something went wrong.'}
          </h2>
          {vnpayResponse.success === 'true' ? (
            <h2 className="mt-10 text-center font-jura text-3xl font-extrabold">
              Order Id: <span className="text-crayola">{vnpayResponse.orderId}</span>
              <br />
              You can view your purchased tickets in Profile.
            </h2>
          ) : (
            <></>
          )}
          <h2 className="mt-10 text-center font-jura text-3xl font-extrabold">
            You will be redirected back to events in {countdown} seconds.
          </h2>
        </div>
      </div>
    </div>
  )
}

export default CartCallback

import { Sponsor } from '@/constants/models/Sponsor'
import SponsorTable from './component/SponsorTable'
import { getAll } from '@/api/sponsorApi'
import React, { useState } from 'react'

const SponsorList = () => {
  const [data, setData] = useState<Sponsor[]>([])
  React.useEffect(() => {
    getSponsor()
  }, [])
  const getSponsor = async () => {
    const response = await getAll()
    console.log('DATA IS: ', response)
    setData(response.data)
  }
  return (
    <div className="h-screen w-full">
      <p className="text-3xl">Sponsor</p>
      <SponsorTable data={data} />
    </div>
  )
}

export default SponsorList

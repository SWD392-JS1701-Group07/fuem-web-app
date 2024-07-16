import SponsorshipTable from './component/SponsorshipTable'
import { getSponsorshipsBySponsorId } from '@/api/sponsorApi'
import React, { useState } from 'react'
import { Sponsorships } from '@/constants/models/Event'
import { Account } from '@/constants/models/Account'

const getAccountId = () => {
  const userProfile = localStorage.getItem('userProfile')
  if (userProfile) {
    const parsedProfile: Account = JSON.parse(userProfile)
    return parsedProfile.id
  }
  return null
}

const SponsorshipList = () => {
  const [data, setData] = useState<Sponsorships[]>([])

  const getSponsorship = async () => {
    const response = await getSponsorshipsBySponsorId(getAccountId() as number)
    setData(response.data)
  }
  React.useEffect(() => {
    getSponsorship()
  }, [])

  return (
    <div className="h-screen w-full p-4">
      <p className="text-3xl font-semibold">Sponsor</p>
      <SponsorshipTable data={data} />
    </div>
  )
}

export default SponsorshipList

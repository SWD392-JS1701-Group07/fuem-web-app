import { getById } from '@/api'
import { Button } from '@/components/ui/button'
import { Event } from '@/constants/models/Event'
import { AVATAR_PLACEHOLDER_URL, EVENT_PLACEHOLDER_URL } from '@/constants/models/url'
import { formatDateTime } from '@/lib/utils'
import * as Avatar from '@radix-ui/react-avatar'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const EventDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [event, setEvent] = useState<Event>()

  useEffect(() => {
    const getEventDetail = async () => {
      try {
        const response = await getById(parseInt(id as string))
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        setEvent(response)
      } catch (error) {
        console.error('Failed to fetch event details', error)
      }
    }

    if (id) {
      getEventDetail()
    }
  }, [id])

  return (
    <div
      id="section"
      className="relative bg-black bg-no-repeat py-14 pb-28 font-poppins text-white"
    >
      <div
        id="row"
        className="relative m-auto flex w-4/5 max-w-6xl flex-wrap justify-center bg-cover bg-center bg-no-repeat py-7"
      >
        <h1 className="font-jura text-9xl font-extrabold"></h1>
      </div>

      <div
        id="row"
        className="relative m-auto flex w-4/5 max-w-6xl flex-wrap space-x-10 bg-home-dots bg-cover bg-center bg-no-repeat py-7"
      >
        <div
          id="column"
          className="relative min-h-px w-full max-w-xl flex-1 bg-cover bg-center bg-no-repeat"
        >
          <img src={event?.avatarUrl || EVENT_PLACEHOLDER_URL}></img>
        </div>
        <div
          id="column"
          className="relative min-h-px w-full max-w-xl flex-1 bg-cover bg-center bg-no-repeat"
        >
          <h1 className="font-jura text-7xl font-extrabold">{event?.name || 'Unknown'}</h1>
          <p className="mt-6 font-jura text-4xl font-bold text-crayola">
            {formatDateTime(event?.startSellDate as string, 'date')} to{' '}
            {formatDateTime(event?.endSellDate as string, 'date')}
          </p>
          <Button className="mt-4 h-14 rounded-none border border-crayola bg-black px-8 text-xl text-crayola hover:bg-crayola hover:text-white">
            Tham Gia
          </Button>
        </div>
      </div>
      <div
        id="row"
        className="relative m-auto mb-10 flex w-4/5 max-w-6xl flex-row flex-wrap justify-evenly bg-cover bg-center bg-no-repeat py-7"
      >
        <div id="avatar" className="flex flex-row items-center">
          <Avatar.Root className="bg-blackA1 inline-flex h-40 w-40 select-none items-center justify-center overflow-hidden rounded-full align-middle">
            <Avatar.Image
              className="h-full w-full rounded-[inherit] object-cover"
              src={AVATAR_PLACEHOLDER_URL}
              alt="Avatar"
            />
            <Avatar.Fallback
              className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
              delayMs={600}
            >
              {event?.ownerId}
            </Avatar.Fallback>
          </Avatar.Root>
          <div className="flex flex-col pl-5">
            <h3 className="font-jura text-4xl font-extrabold text-yellow-sun">EVENT ORGANIZER</h3>
            <h2 className="pt-3 font-poppins text-2xl font-bold">{event?.ownerId}</h2>
          </div>
        </div>
        <div id="ticket" className="flex flex-row items-center">
          <div className="flex flex-col pl-5">
            <h3 className="font-jura text-4xl font-extrabold text-yellow-sun">Ticket Price: </h3>
            <div className="flex flex-row items-center space-x-4">
              <div>
                <h2 className="pt-3 font-poppins text-2xl font-bold">
                  {event?.price} <u>đ</u>
                </h2>
                <p className="text-xl text-gray-400">100 left</p>
              </div>
              <div className="flex items-center">
                <Button className="mt-2 h-14 rounded-none border border-yellow-sun bg-transparent px-8 text-xl text-yellow-sun hover:bg-yellow-sun hover:text-black">
                  Mua Vé
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="row"
        className="relative m-auto mb-10 flex w-4/5 max-w-6xl flex-col flex-wrap justify-center bg-cover bg-center bg-no-repeat py-7"
      >
        <h1 className="pb-10 text-center font-jura text-7xl font-extrabold">Details</h1>
        <p className="text-2xl leading-9">{event?.description || '...'}</p>
      </div>
      <div
        id="row"
        className="relative m-auto mb-10 mt-20 flex w-4/5 max-w-6xl flex-wrap justify-center bg-cover bg-center bg-no-repeat py-7"
      >
        <h1 className="text-center font-jura text-7xl font-extrabold">Sponsors & partners</h1>
      </div>

      <div
        id="sponsors-partners"
        className="mx-auto flex max-w-6xl flex-wrap justify-between gap-8 p-4"
      >
        <div className="flex flex-col items-center">
          <img
            className="h-full w-full"
            src="https://www.elegantthemes.com/layouts/wp-content/uploads/2020/08/logo_08-white.png"
            alt="Sponsor"
          />
        </div>

        <div className="flex flex-col items-center">
          <img
            className="h-full w-full"
            src="https://www.elegantthemes.com/layouts/wp-content/uploads/2020/08/logo_06-white.png"
            alt="Sponsor"
          />
        </div>

        <div className="flex flex-col items-center">
          <img
            className="h-full w-full"
            src="https://www.elegantthemes.com/layouts/wp-content/uploads/2020/08/logo_05-white.png"
            alt="Sponsor"
          />
        </div>

        <div className="flex flex-col items-center">
          <img
            className="h-full w-full"
            src="https://www.elegantthemes.com/layouts/wp-content/uploads/2020/08/logo_03-white.png"
            alt="Sponsor"
          />
        </div>
      </div>
    </div>
  )
}

export default EventDetail

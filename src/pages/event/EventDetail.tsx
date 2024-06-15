import { getById } from '@/api'
import { Event } from '@/constants/models/Event'
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
        <h1 className="font-jura text-9xl font-extrabold">{event.name}</h1>
      </div>

      <div
        id="row"
        className="relative m-auto flex w-4/5 max-w-6xl flex-wrap bg-home-dots-2 bg-cover bg-center bg-no-repeat py-7"
      >
        <div
          id="column"
          className="relative mr-14 min-h-px w-full max-w-xl flex-1 bg-cover bg-center bg-no-repeat"
        >
          <p className="font-poppins text-2xl leading-10">
            Chào mừng bạn đến với trang quản lý sự kiện của Đại học FPT, điểm đến hàng đầu của bạn
            cho tất cả các hội thảo, hội nghị và sự kiện bán vé sắp tới tại Thành phố Hồ Chí Minh.
          </p>
        </div>
        <div
          id="column"
          className="relative mr-14 min-h-px w-full max-w-xl flex-1 bg-cover bg-center bg-no-repeat"
        >
          <p className="font-poppins text-xl leading-8">
            Là một trong những cơ sở giáo dục hàng đầu, Đại học FPT cam kết xây dựng một cộng đồng
            học tập và chuyên nghiệp sôi động. Nền tảng của chúng tôi cung cấp trải nghiệm liền mạch
            để bạn có thể cập nhật thông tin về các sự kiện học thuật và chuyên nghiệp mới nhất, mua
            vé và tham gia các hoạt động bổ ích. Dù bạn là sinh viên, cựu sinh viên hay chuyên gia
            trong ngành, loạt sự kiện đa dạng của chúng tôi được thiết kế để nâng cao kiến thức,
            mạng lưới và triển vọng nghề nghiệp của bạn. Tham gia cùng chúng tôi và trở thành một
            phần của cộng đồng năng động cam kết với sự xuất sắc và đổi mới.
          </p>
        </div>
      </div>

      <div
        id="row"
        className="relative m-auto mb-10 flex w-4/5 max-w-6xl flex-wrap justify-center bg-cover bg-center bg-no-repeat py-7"
      >
        <h1 className="text-center font-jura text-7xl font-extrabold">Event Organizers</h1>
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

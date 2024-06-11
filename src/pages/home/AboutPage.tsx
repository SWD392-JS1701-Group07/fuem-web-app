import * as Avatar from '@radix-ui/react-avatar'

const AboutPage = () => {
  return (
    <div
      id="section"
      className="relative bg-black bg-no-repeat py-14 pb-28 font-poppins text-white"
    >
      <div
        id="row"
        className="relative m-auto flex w-4/5 max-w-6xl flex-wrap justify-center bg-cover bg-center bg-no-repeat py-7"
      >
        <h1 className="font-jura text-9xl font-extrabold">About The Page</h1>
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
        id="event-organizers"
        className="mx-auto flex max-w-6xl flex-wrap justify-between gap-8 p-4"
      >
        {/* Placeholder, can change later */}
        {[
          {
            name: 'Antonio French',
            src: 'https://www.elegantthemes.com/layouts/wp-content/uploads/2020/08/portrait-square-10.jpg',
            fallback: 'AF'
          },
          {
            name: 'Maria Johnson',
            src: 'https://randomuser.me/api/portraits/women/65.jpg',
            fallback: 'MJ'
          },
          {
            name: 'James Smith',
            src: 'https://randomuser.me/api/portraits/men/32.jpg',
            fallback: 'JS'
          },
          {
            name: 'Elena Rossi',
            src: 'https://randomuser.me/api/portraits/women/44.jpg',
            fallback: 'ER'
          },
          {
            name: 'David Lee',
            src: 'https://randomuser.me/api/portraits/men/75.jpg',
            fallback: 'DL'
          }
        ].map((organizer, index) => (
          <div key={index} id="avatar" className="flex max-w-48 flex-col items-center">
            <Avatar.Root className="bg-blackA1 inline-flex h-40 w-40 select-none items-center justify-center overflow-hidden rounded-full align-middle">
              <Avatar.Image
                className="h-full w-full rounded-[inherit] object-cover"
                src={organizer.src}
                alt={`Avatar of ${organizer.name}`}
              />
              <Avatar.Fallback
                className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
                delayMs={600}
              >
                {organizer.fallback}
              </Avatar.Fallback>
            </Avatar.Root>
            <h3 className="pt-4 font-poppins font-normal text-yellow-sun">EVENT ORGANIZER</h3>
            <h2 className="pt-4 font-poppins text-2xl font-bold">{organizer.name}</h2>
          </div>
        ))}
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

export default AboutPage

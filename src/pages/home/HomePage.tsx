import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

// Dummy hard coded data, can change logic later
const events = [
  {
    date: 'June 5',
    title: 'POST-A-TREE TRỞ LẠI VỚI MÙA 4',
    location: 'Địa điểm: Sảnh trống đồng',
    participants: '122 participants',
    backgroundImage:
      'url(http://ali.sandbox.etdevs.com/virtual-conference/wp-content/uploads/sites/21/2021/05/virtual-conference-35.png)',
    backgroundColor: 'bg-[#ff6af0]',
    textColor: 'text-black'
  },
  {
    date: 'June 26',
    title: 'FPTU JOB FAIR 2024 | RIDE WAVE - RIGHT WAY',
    location: 'Địa điểm: Sảnh trống đồng',
    participants: '122 participants',
    backgroundImage:
      'url(http://ali.sandbox.etdevs.com/virtual-conference/wp-content/uploads/sites/21/2021/05/virtual-conference-33.png)',
    backgroundColor: 'bg-electric-indigo',
    textColor: 'text-white'
  },
  {
    date: 'July 7',
    title: 'HỒ SEN CHỜ AI 34 - F&E INSIGHTS',
    location: 'Địa điểm: Sảnh trống đồng',
    participants: '122 participants',
    backgroundImage:
      'url(http://ali.sandbox.etdevs.com/virtual-conference/wp-content/uploads/sites/21/2021/05/virtual-conference-34.png)',
    backgroundColor: 'bg-yellow-sun',
    textColor: 'text-black'
  }
]

const HomePage = () => {
  return (
    <div>
      <div id="main">
        <article>
          <div id="content">
            <div id="inner-content" className="relative">
              <div id="section" className="bg-black py-14">
                <span
                  id="parallax-wrap"
                  className="absolute bottom-0 left-0 right-0 top-0 overflow-hidden"
                >
                  <span className="absolute bottom-0 left-0 z-0 block h-full w-full bg-home-dots bg-cover bg-fixed bg-top bg-no-repeat"></span>
                </span>

                <div
                  id="row"
                  className="relative m-auto w-4/5 max-w-6xl bg-cover bg-center bg-no-repeat py-7"
                >
                  <div>
                    <div id="line-container">
                      <h1 className="font-jura text-9xl font-bold text-yellow-sun">
                        FPTU Event Page
                      </h1>
                    </div>
                  </div>
                  <div>
                    <div id="line-container">
                      <h1 className="font-jura text-9xl font-normal text-white">Summer 2024</h1>
                    </div>
                  </div>
                </div>

                <div
                  id="row"
                  className="relative m-auto flex w-4/5 max-w-6xl flex-wrap bg-cover bg-center bg-no-repeat py-7"
                >
                  <div
                    id="column"
                    className="relative mr-14 min-h-px w-full max-w-xl flex-1 bg-cover bg-center bg-no-repeat pb-44"
                  >
                    <div
                      id="text-container"
                      className="relative mb-7 bg-yellow-sun bg-column-blob bg-cover bg-top bg-no-repeat pb-10 pl-10 pr-10 pt-24"
                    >
                      <div id="text-inner">
                        <h2 className="pb-3 font-jura text-6xl font-light text-black">
                          <strong className="font-bold">June</strong>
                          <br />
                          12-15
                        </h2>
                      </div>
                    </div>
                    <div id="text-inner">
                      <h2 className="font-jura text-7xl font-normal text-white">On Campus.</h2>
                    </div>
                  </div>
                  <div
                    id="column"
                    className="bg-initial relative min-h-px w-full max-w-xl flex-1 border-8 border-electric-indigo bg-column-dots bg-cover bg-center bg-repeat-round pb-32 pl-16 pr-16 pt-56"
                  >
                    <div
                      id="clickable"
                      className="absolute bottom-auto left-auto right-0 top-0 mb-7 h-28 w-28 cursor-pointer bg-electric-indigo pt-6 transition-all duration-300 ease-in-out"
                    >
                      <Link to="/event">
                        <div id="clickable-content" className="relative mx-auto w-full text-center">
                          <div id="clickable-image" className="mb-8 inline-block max-w-full">
                            <span className="m-auto mb-8 ml-1 block">
                              <span className="text-6xl font-normal text-white">➜</span>
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div id="row" className="mb-5">
                      <div id="text-inner">
                        <h3 className="font-jura text-5xl font-bold leading-[3.8rem] text-white">
                          Đăng Ký
                          <br />
                          Sự Kiện FPTU Ngay
                        </h3>
                      </div>
                    </div>

                    <div id="row">
                      <div id="text-inner">
                        <p className="font-poppins text-xl leading-9 text-white">
                          Đăng ký ngay để nhận được thông tin chi tiết và tham gia vào các hoạt động
                          đặc sắc! Hẹn gặp bạn tại sự kiện.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="section" className="relative z-10 bg-black py-14">
                <div
                  id="row"
                  className="relative m-auto flex h-80 w-4/5 max-w-6xl flex-wrap bg-cover bg-center bg-no-repeat py-7"
                >
                  <div
                    id="column"
                    className="relative mr-14 min-h-px w-full max-w-xl flex-1 bg-cover bg-center bg-no-repeat pb-44"
                  >
                    <div
                      id="image-container"
                      style={{ marginTop: '-60%', marginLeft: '-60%' }}
                      className="mr-0 text-right"
                    >
                      <span className="relative inline-block max-w-full">
                        <img
                          className="relative h-auto max-w-full"
                          decoding="async"
                          src="https://daihoc.fpt.edu.vn/wp-content/uploads/2022/07/dai-hoc-fpt-2-1659081213-910x607.jpg"
                          alt=""
                          title="tech-03"
                        />
                      </span>
                    </div>
                  </div>
                  <div
                    id="column"
                    className="relative mr-14 min-h-px w-full max-w-xl flex-1 bg-cover bg-center bg-no-repeat pb-44"
                  >
                    <h1 className="font-jura text-8xl font-semibold text-white">About the Page</h1>
                  </div>
                </div>
                <div
                  id="row"
                  className="relative m-auto w-4/5 max-w-6xl bg-cover bg-center bg-no-repeat py-7"
                >
                  <div
                    id="column"
                    className="relative h-40 min-h-px w-full flex-1 bg-cover bg-center bg-no-repeat pb-44"
                  >
                    <p className="w-full font-poppins text-2xl leading-10 text-white">
                      Chào mừng đến với Trang Sự Kiện FPTU! Trang này là trung tâm tập trung cho tất
                      cả các sự kiện hấp dẫn diễn ra tại Đại học FPT. Tại đây, bạn có thể tìm thông
                      tin về các sự kiện sắp tới, hội thảo, seminar và nhiều hơn nữa. Dù bạn là sinh
                      viên, giáo viên hoặc khách mời, trang này là điểm đến dành cho bạn để cập nhật
                      thông tin và tham gia vào cộng đồng sôi động của FPTU.
                    </p>
                  </div>
                </div>
              </div>
              <div id="section" className="relative z-10 bg-black py-14">
                <h1 className="py-8 text-center font-jura text-7xl font-semibold text-white">
                  Có gì hot? 🔥
                </h1>
                <div
                  id="events-container"
                  className="relative m-auto flex w-4/5 max-w-6xl flex-row py-7 font-poppins"
                >
                  {events.map((event, index) => (
                    <div
                      key={index}
                      id="event"
                      className={`mr-8 flex w-1/3 flex-col justify-between bg-cover bg-bottom bg-no-repeat px-10 pb-10 pt-10 ${event.backgroundColor} ${event.textColor}`}
                      style={{ backgroundImage: event.backgroundImage }}
                    >
                      <div>
                        <h4 className="pb-3 text-lg font-medium">{event.date}</h4>
                        <h2 className="pb-3 font-jura text-5xl font-bold">{event.title}</h2>
                        <h4 className="pb-3 text-lg font-medium">{event.location}</h4>
                        <h4 className="pb-3 text-lg font-medium">{event.participants}</h4>
                      </div>
                      <Button className="mt-10 h-14 rounded-none bg-black px-8 text-xl">
                        Xem Chi Tiết
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div id="section" className="relative bg-black py-14 pb-28">
                <div
                  id="row"
                  className="relative m-auto flex w-4/5 max-w-6xl flex-wrap bg-black bg-cover bg-center bg-no-repeat py-7"
                >
                  <div
                    id="column"
                    className="relative mr-14 min-h-px w-full max-w-xl flex-1 bg-cover bg-center bg-no-repeat"
                  >
                    <div
                      id="row"
                      className="bg-initial relative mr-14 min-h-px w-full max-w-xl flex-1 border-8 border-yellow-sun bg-column-dots bg-cover bg-center bg-repeat-round p-16"
                    >
                      <div id="text-inner">
                        <h3 className="font-jura text-7xl font-bold leading-[4.5rem] text-white">
                          Đặt Vé
                          <br />
                          Online
                        </h3>
                      </div>
                    </div>

                    <div id="row" className="relative mr-14 min-h-px w-full max-w-xl flex-1">
                      <div
                        id="clickable"
                        className="absolute bottom-auto left-auto right-0 top-0 mb-7 h-28 w-28 cursor-pointer bg-yellow-sun pt-6 transition-all duration-300 ease-in-out"
                      >
                        <Link to="/event">
                          <div
                            id="clickable-content"
                            className="relative mx-auto w-full text-center"
                          >
                            <div id="clickable-image" className="mb-8 inline-block max-w-full">
                              <span className="m-auto mb-8 ml-1 block">
                                <span className="text-6xl font-normal">➜</span>
                              </span>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div id="text-inner">
                        <h1 className="mr-56 py-7 font-jura text-5xl font-bold text-white">
                          Tiện lợi, chỉ với 1 click
                        </h1>
                        <p className="font-poppins text-xl leading-9 text-white">
                          Hãy tận hưởng sự tiện lợi của việc mua vé một cách dễ dàng cho các sự kiện
                          đặc biệt của Đại học FPT. Đảm bảo chỗ của bạn ngay bây giờ và chuẩn bị cho
                          một cuộc phiêu lưu đang chờ đợi!
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    id="column"
                    className="relative mr-14 min-h-px w-full max-w-xl flex-1 bg-cover bg-center bg-no-repeat"
                  >
                    <div id="image" className="-mr-40">
                      <img
                        src="http://ali.sandbox.etdevs.com/virtual-conference/wp-content/uploads/sites/21/2021/04/virtual-conference-15.png"
                        alt=""
                      ></img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

export default HomePage

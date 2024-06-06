import { Link } from 'react-router-dom'

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
                    className="bg-initial border-electric-indigo relative min-h-px w-full max-w-xl flex-1 border-8 bg-column-dots bg-cover bg-center bg-repeat-round pb-32 pl-16 pr-16 pt-56"
                  >
                    <div
                      id="clickable"
                      className="bg-electric-indigo absolute bottom-auto left-auto right-0 top-0 mb-7 h-28 w-28 cursor-pointer pt-6 transition-all duration-300 ease-in-out"
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
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

export default HomePage

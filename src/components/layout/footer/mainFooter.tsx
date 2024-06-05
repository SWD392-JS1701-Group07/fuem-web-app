import { Facebook, Instagram, MousePointer, Youtube } from 'lucide-react'

const MainFooter = () => {
  return (
    <div>
      <div className="relative bg-purple-700 bg-footer bg-cover bg-center py-14">
        <div
          id="container"
          className="relative m-auto flex w-4/5 max-w-6xl bg-cover bg-center bg-no-repeat py-7"
        >
          <div
            id="column"
            className="relative mr-14 min-h-px w-full max-w-xl flex-1 bg-cover bg-center bg-no-repeat"
          >
            <div id="row" className="mb-7 cursor-pointer">
              <div
                id="button"
                className="inline-block rounded-none border-0 bg-black py-10 pl-14 pr-8 font-jura text-8xl text-white"
              >
                <span>
                  Xem Sự Kiện <MousePointer className="mt-5" size={80} />
                </span>
              </div>
            </div>
            <div className="relative mb-4 py-1 font-poppins text-2xl font-semibold text-white">
              Follow
            </div>
            <ul className="relative py-1 font-poppins text-2xl text-white">
              <li className="inline-block pr-10 text-9xl">
                <a href="#/">
                  <Facebook size={54} />
                </a>
              </li>
              <li className="inline-block pr-10 text-9xl">
                <a href="#/">
                  <Instagram size={54} />
                </a>
              </li>
              <li className="inline-block text-9xl">
                <a href="#/">
                  <Youtube size={54} />
                </a>
              </li>
            </ul>
          </div>
          <div
            id="column"
            className="bg-footer-column bg-initial bg-pos-x-right-0 relative min-h-px w-full max-w-xl flex-1 bg-white bg-cover bg-top bg-no-repeat pb-16 pl-10 pr-10 pt-40"
          >
            <div id="title" className="mb-6">
              <h3 className="font-jura text-5xl font-bold leading-[3.7rem] text-black">
                Đăng ký
                <br />
                Nhận bản tin
              </h3>
            </div>
            <div id="form">
              <form>
                <div id="newsletter" className="flex flex-wrap justify-between">
                  <p className="mb-4 w-full pb-3">
                    <input
                      className="w-full overflow-hidden rounded-none border-0 border-b-2 border-l-0 border-r-0 border-black bg-transparent bg-white px-4 py-3 font-poppins text-base font-semibold focus:outline-none"
                      name="email"
                      type="text"
                      placeholder="Email"
                    />
                  </p>
                  <p className="w-full">
                    <a
                      href="#"
                      className="block w-full rounded-none border-0 bg-black pb-3 pl-2 pr-2 pt-3 text-center font-poppins text-xl text-white"
                    >
                      <span>Đăng Ký</span>
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainFooter

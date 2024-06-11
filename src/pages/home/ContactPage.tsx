import { Button } from '@/components/ui/button'
import * as Form from '@radix-ui/react-form'

const ContactPage = () => {
  return (
    <div
      id="section"
      className="relative bg-black bg-home-dots bg-cover bg-no-repeat py-14 pb-28 text-white"
    >
      <div
        id="row"
        className="relative m-auto flex w-4/5 max-w-6xl flex-wrap bg-cover bg-center bg-no-repeat py-7"
      >
        <div
          id="column"
          className="relative mr-14 min-h-px w-full max-w-xl flex-1 bg-cover bg-center bg-no-repeat"
        >
          <h1 className="font-jura text-9xl font-extrabold">Contact Us</h1>
        </div>

        <div
          id="column"
          className="relative mr-14 min-h-px w-full max-w-xl flex-1 bg-cover bg-center bg-no-repeat"
        >
          <div
            id="row"
            className="bg-initial relative mr-14 min-h-px w-full max-w-xl flex-1 border-8 border-yellow-sun bg-column-dots bg-cover bg-center bg-repeat-round p-16"
          >
            <div id="text-inner">
              <h3 className="font-poppins text-xl font-bold text-yellow-sun">EMAIL</h3>
              <h4 className="mt-5 font-jura text-xl font-bold">eventmanagement@fpt.edu.vn</h4>
              <h3 className="mt-7 font-poppins text-xl font-bold text-yellow-sun">ADDRESS</h3>
              <h4 className="mt-5 font-jura text-xl font-bold">
                Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh
              </h4>
              <Button className="mt-10 h-14 rounded-none border-2 border-yellow-sun bg-black px-8 text-xl text-yellow-sun transition-colors duration-300 hover:bg-yellow-sun hover:text-black">
                Contact
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div
        id="row"
        className="relative m-auto flex w-4/5 max-w-6xl flex-wrap bg-cover bg-center bg-no-repeat py-7"
      >
        <Form.Root className="w-full">
          <div className="mb-[10px] flex space-x-10">
            <Form.Field className="grid flex-1" name="username">
              <div className="flex items-baseline justify-between">
                <Form.Label className="font-medium leading-[35px] text-white">Username</Form.Label>
                <Form.Message className="text-[13px] text-white opacity-[0.8]" match="valueMissing">
                  Please enter your username
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  className="box-border inline-flex h-12 appearance-none items-center justify-center border-gray-500 bg-black px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_2px] shadow-gray-500 outline-none selection:bg-black focus:shadow-[0_0_0_2px] focus:shadow-yellow-sun"
                  type="text"
                  required
                />
              </Form.Control>
            </Form.Field>

            <Form.Field className="grid flex-1" name="email">
              <div className="flex items-baseline justify-between">
                <Form.Label className="font-medium leading-[35px] text-white">Email</Form.Label>
                <Form.Message className="text-[13px] text-white opacity-[0.8]" match="valueMissing">
                  Please enter your email
                </Form.Message>
                <Form.Message className="text-[13px] text-white opacity-[0.8]" match="typeMismatch">
                  Please provide a valid email
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  className="box-border inline-flex h-12 appearance-none items-center justify-center border-gray-500 bg-black px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_2px] shadow-gray-500 outline-none selection:bg-black focus:shadow-[0_0_0_2px] focus:shadow-yellow-sun"
                  type="email"
                  required
                />
              </Form.Control>
            </Form.Field>
          </div>

          <Form.Field className="mb-[10px] grid" name="message">
            <div className="flex items-baseline justify-between">
              <Form.Label className="font-medium leading-[35px] text-white">Message</Form.Label>
              <Form.Message className="text-[13px] text-white opacity-[0.8]" match="valueMissing">
                Please enter a message
              </Form.Message>
            </div>
            <Form.Control asChild>
              <textarea
                className="selection:color-white box-border inline-flex h-36 w-full resize-none appearance-none items-center justify-center border-gray-500 bg-black p-[10px] text-[15px] leading-none text-white shadow-[0_0_0_2px] shadow-gray-500 outline-none selection:bg-black focus:shadow-[0_0_0_2px] focus:shadow-yellow-sun"
                required
              />
            </Form.Control>
          </Form.Field>

          <Form.Submit asChild>
            <button className="mt-[10px] box-border inline-flex h-16 items-center justify-center border-2 border-gray-500 bg-black px-7 text-xl font-medium leading-none text-white transition-colors duration-300 hover:border-white hover:bg-yellow-sun hover:text-black focus:outline-none">
              Submit
            </button>
          </Form.Submit>
        </Form.Root>
      </div>
    </div>
  )
}

export default ContactPage

const MainFooter = () => {
    return (
        <div>
            <div className="bg-footer relative bg-purple-700 bg-cover bg-center py-14">
                <div
                    id="container"
                    className="relative m-auto w-4/5 max-w-6xl bg-cover bg-center bg-no-repeat py-7"
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
                                Xem Sự Kiện
                            </div>
                        </div>
                    </div>
                    <div
                        id="column"
                        className="relative mr-14 min-h-px w-full max-w-xl flex-1 bg-cover bg-center bg-no-repeat"
                    ></div>
                </div>
            </div>
        </div>
    );
}
export default MainFooter;
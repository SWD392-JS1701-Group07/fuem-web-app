import { useState } from "react";

const HomePages = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <header className="bg-blue-600 w-full py-4 text-white">
                <nav className="container mx-auto flex justify-between items-center px-4">
                    <div className="text-3xl font-bold">My Homepage</div>
                    <ul className="flex space-x-6 relative">
                        <li className="hover:underline"><a href="#home">Home</a></li>
                        <li className="hover:underline"><a href="#about">About</a></li>
                        <li className="hover:underline"><a href="#services">Services</a></li>
                        <li className="hover:underline"><a href="#contact">Contact</a></li>
                        <li className="relative">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="hover:underline focus:outline-none"
                            >
                                More
                            </button>
                            {menuOpen && (
                                <ul className="absolute right-0 mt-2 bg-white text-black shadow-lg">
                                    <li className="px-4 py-2 hover:bg-gray-200"><a href="#blog">Blog</a></li>
                                    <li className="px-4 py-2 hover:bg-gray-200"><a href="#careers">Careers</a></li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </nav>
            </header>
            <main className="flex-grow flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-semibold text-gray-800">Hello, World!</h2>
                <p className="mt-4 text-lg text-gray-600">
                </p>
            </main>
            <footer className="bg-blue-600 w-full py-4 text-white text-center">
                <p>© 2024 My Homepage</p>
            </footer>
        </div>
    );
}
export default HomePages;
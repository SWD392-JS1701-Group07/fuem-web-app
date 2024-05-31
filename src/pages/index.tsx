import { useState } from "react";

const HomePages = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <main className="flex-grow flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-semibold text-gray-800">Hello, World!</h2>
                <p className="mt-4 text-lg text-gray-600">
                </p>
            </main>
        </div>
    );
}
export default HomePages;
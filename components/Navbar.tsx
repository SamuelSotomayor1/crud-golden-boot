
export default function Navbar() {
    return (
    <>
    <div className="w-full">
        <nav className="flex w-full h-28 pt-0 text-white bg-slate-900 shadow-md lg:px-8 lg:py-3">
            <div className="flex w-full items-center justify-center text-gray-100">
                <div className="mr-4 block cursor-pointer py-1.5 text-gray-200 font-bold text-2xl">
                    Bota de Oro 2024/25
                </div>
                <a href="https://github.com/SamuelSotomayor1" target="_blank" 
                className="ml-auto block cursor-pointer pr-0 py-1.5 text-base text-gray-200 font-semibold">
                    Samuel Sotomayor
                </a>
            </div>
        </nav>
    </div>
    </>
    );
}
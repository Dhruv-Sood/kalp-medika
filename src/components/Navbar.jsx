import { FaGithub } from "react-icons/fa";
import HyperText from "./magicui/hyper-text";
import Link from 'next/link'
const Navbar = () => {
    return (
        <nav className="flex justify-between items-center p-4 ">
            <div className="logo font-bold text-xl">
                <HyperText text={"Kalp-Medika"}/>
            </div>
            <ul className="list-items flex gap-4 items-center">
                <Link href="/">
                    <HyperText className={"text-xl hover:cursor-pointer"} text={"Home"} />
                </Link>
                <span className="text-gray-500">/</span>
                
                <Link href="/dashboard">
                    <HyperText className={"text-xl hover:cursor-pointer"} text={"Dashboard"} />
                </Link>
                    <span className="text-gray-500">/</span>

                <Link href="/">
                </Link>
                <HyperText className={"text-xl hover:cursor-pointer"} text={"About"} />

            </ul>
            <div>
                <FaGithub size={24} />
            </div>
        </nav>
    );
}

export default Navbar;

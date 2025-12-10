import Link from "next/link";
export default function Signin() {
         return (
        <div className="bg-black flex justify-center items-center min-h-screen">
            <div className="bg-gray-900 w-lg h-130 p-8 shadow-lg rounded-lg">
                <div className="text-white flex justify-center items-center font-sans text-5xl tracking-tight font-semibold">
                    Log in
                </div>
                <div className="mt-16 ">
                    
                <input placeholder="email" type="text" className="mt-10 w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500">

                
                </input>

                <input placeholder="password" type="password" className="mt-10 w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500">

                
                </input>
                </div>
                <div className="flex justify-center items-center ">
                <button className="flex justify-center items-center w-full hover:cursor-pointer">
                    <div className="mt-10 w-full flex justify-center  items-center p-3 rounded bg-blue-800 text-white font-semibold hover:bg-blue-700 text-center">
                        Log in
                    </div>
                </button></div>

                <div className="flex justify-center items-center mt-10">
                    <span className="text-neutral-400">
                        Don't have an account yet ? 
                        <Link href="/signup">
                        <span className="text-blue-300 cursor-pointer hover:text-blue-400 "> Sign up</span>
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}
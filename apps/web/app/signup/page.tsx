export default function Signup() {
    return (
        <div className="bg-gray-900 flex justify-center items-center min-h-screen">
            <div className="bg-black w-lg h-130 p-8 shadow-lg rounded-lg">
                <div className="text-white flex justify-center items-center font-sans text-4xl tracking-tight font-semibold">
                    Sign up
                </div>
                <div className="mt-6">
                <input placeholder="email" type="text" className="mt-10 w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500">

                
                </input>
                


                <input placeholder="password" type="text" className="mt-10 w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500">

                
                </input>
                </div>
                <div className="flex justify-center items-center ">
                <button className="flex justify-center items-center w-full hover:cursor-pointer">
                    <div className="mt-10 w-full flex justify-center  items-center p-3 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 text-center">
                        Create Account
                    </div>
                </button></div>
            </div>
        </div>
    )
}

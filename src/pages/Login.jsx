
function Login() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between min-h-screen mx-8 sm:mx-30">
      <div className="flex flex-col space-y-6 max-w-xl text-white">
        <h1 className="text-5xl font-bold">Pagedone</h1>
        <h3 className="text-6xl font-medium">Login Page !</h3>
        <p>join the Waitlist for the Design system</p>

        <p className="text-gray-300 flex-wrap">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis recusandae sapiente ex blanditiis praesentium</p>
      </div>


       {/* SIDE BAR */}
      <div className="bg-white mx-auto flex flex-col p-10 space-x-7 text-center rounded-xl shadow">
        <div className="flex flex-col space-y-2 ">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-gray-500 ">Lets get started with your 30 days free trail </p>
        </div>
        <form className="my-10">
        <div className="flex flex-col space-y-6">
          <input type="text" placeholder="Username" className="border border-gray-400 py-1.5 pl-5 rounded-full" />
          <input type="text" placeholder="password" className="border border-gray-400 py-1.5 pl-5 rounded-full"/>
        </div>
        <p className="mt-1 text-gray-500">Forgot password ?</p>
        <button type="submit" className="bg-primary text-white w-full mt-5 py-1.5 rounded-full">Login</button>
        </form>

        <p className="text-gray-500">OR</p>

        <div className="flex items-center justify-between my-5">
          <div className="px-5 py-2 gap-1 rounded-full bg-gray-400/10 flex">
           <div>Google</div>
          </div>
          <div className="flex items-center justify-between px-5 py-2 gap-1 my-5">
          <div>Facebook</div>
          </div>
        </div>
        <div>
          <p className="font-semibold">Don't have an account ? <span className="text-gray-500">sign Up</span></p>
        </div>
      </div>
    </div>
  )
}

export default Login

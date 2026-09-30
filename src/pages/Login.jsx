import {
  ShieldCheck,
  Shield,
  Car,
  House,
  Mail,
  Lock,
  Eye,
  ArrowRight,
  Check,
} from "lucide-react";

function Login() {
  return (
    <div className="w-full min-h-screen flex bg-white">

      <div className="hidden md:flex w-[47%] min-h-screen bg-[#dceeff] relative flex-col overflow-hidden">

        <div className="px-10 pt-10 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#0756c9] flex items-center justify-center shadow-md">
            <ShieldCheck
              size={27}
              strokeWidth={2.5}
              className="text-white"
            />
          </div>

          <div>
            <h1 className="text-[21px] font-bold text-[#102f5d] leading-none">
              SecureLife
            </h1>

            <p className="text-[12px] text-[#61758e] mt-1">
              Insurance Agency
            </p>
          </div>
        </div>

        <div className="px-10 pt-12">
          <h2 className="text-[38px] leading-[1.12] font-bold text-[#092d5c]">
            Your Future
            <br />
            Our Priority
          </h2>

          <p className="text-[#536b86] text-[15px] leading-6 mt-4">
            Trusted insurance solutions for
            <br />
            you and your loved ones.
          </p>
        </div>

        <div className="px-10 mt-8 space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#eaf5ff] flex items-center justify-center">
              <Shield
                size={22}
                className="text-[#1764c5]"
              />
            </div>

            <div>
              <p className="text-[14px] font-semibold text-[#19395f]">
                Life Insurance
              </p>

              <p className="text-[11px] text-[#71849b]">
                Secure your tomorrow
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#eaf5ff] flex items-center justify-center">
              <Car
                size={22}
                className="text-[#1764c5]"
              />
            </div>

            <div>
              <p className="text-[14px] font-semibold text-[#19395f]">
                Health Insurance
              </p>

              <p className="text-[11px] text-[#71849b]">
                Stay healthy, stay protected
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#eaf5ff] flex items-center justify-center">
              <House
                size={22}
                className="text-[#1764c5]"
              />
            </div>

            <div>
              <p className="text-[14px] font-semibold text-[#19395f]">
                General Insurance
              </p>

              <p className="text-[11px] text-[#71849b]">
                Coverage for what matters
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[43%] overflow-hidden">

          <div className="absolute bottom-0 left-0 right-0 h-[75%] bg-[#c5e0fa] rounded-t-[50%]" />

          <div className="absolute bottom-[115px] left-1/2 -translate-x-1/2 w-[225px] h-[105px]">

            <div className="absolute top-0 left-0 w-[225px] h-[105px] bg-[#1766d1] rounded-[225px_225px_0_0]" />

            <div className="absolute top-0 left-[75px] w-[2px] h-[105px] bg-[#0b4ca9]" />

            <div className="absolute top-0 left-[150px] w-[2px] h-[105px] bg-[#0b4ca9]" />

            <div className="absolute left-[111px] top-[5px] w-[3px] h-[180px] bg-[#173c62]" />

            <div className="absolute left-[104px] top-[178px] w-8 h-3 border-b-[4px] border-r-[4px] border-[#173c62] rounded-br-full" />

          </div>

          <div className="absolute bottom-0 left-[18%] w-[95px] h-[190px]">
            <div className="absolute top-0 left-[27px] w-[45px] h-[48px] rounded-full bg-[#102f5c]" />

            <div className="absolute top-[42px] left-[15px] w-[70px] h-[150px] bg-[#163c71] rounded-t-[35px]" />
          </div>

          <div className="absolute bottom-0 left-[43%] w-[65px] h-[130px]">
            <div className="absolute top-0 left-[17px] w-[32px] h-[35px] rounded-full bg-[#183b63]" />

            <div className="absolute top-[30px] left-[5px] w-[55px] h-[100px] bg-[#1766c9] rounded-t-[25px]" />
          </div>

          <div className="absolute bottom-0 right-[15%] w-[105px] h-[185px]">
            <div className="absolute top-0 left-[28px] w-[50px] h-[55px] rounded-full bg-[#172f4d]" />

            <div className="absolute top-[48px] left-[10px] w-[85px] h-[137px] bg-[#54a9e8] rounded-t-[40px]" />
          </div>

          <div className="absolute bottom-0 left-3 text-[#29946b] text-5xl">
            🌿
          </div>

          <div className="absolute bottom-0 right-3 text-[#29946b] text-5xl">
            🌿
          </div>
        </div>
      </div>

      <div className="w-full md:w-[53%] min-h-screen flex items-center justify-center bg-white px-6 sm:px-10 lg:px-16 py-10">

        <div className="w-full max-w-[420px]">

          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-[#0756c9] flex items-center justify-center">
              <ShieldCheck
                size={25}
                strokeWidth={2.5}
                className="text-white"
              />
            </div>

            <div>
              <h1 className="text-[20px] font-bold text-[#102f5d] leading-none">
                SecureLife
              </h1>

              <p className="text-[11px] text-[#718198] mt-1">
                Insurance Agency
              </p>
            </div>
          </div>

          <div className="mb-7">
            <h2 className="text-[30px] font-bold text-[#092d5c]">
              Welcome Back
            </h2>

            <p className="text-[13px] text-[#718198] mt-2">
              Login to your account to continue
            </p>
          </div>

          <form className="space-y-5">

            <div>
              <label className="block text-[12px] font-semibold text-[#263b56] mb-2">
                Email or Mobile Number
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#63768d]"
                />

                <input
                  type="text"
                  placeholder="Enter your email or mobile number"
                  className="w-full h-[48px] rounded-lg border border-[#dce3eb] bg-white pl-10 pr-4 text-[12px] text-[#263b56] outline-none transition focus:border-[#2869d9] focus:ring-2 focus:ring-[#2869d9]/10"
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#263b56] mb-2">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#63768d]"
                />

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full h-[48px] rounded-lg border border-[#dce3eb] bg-white pl-10 pr-11 text-[12px] outline-none focus:border-[#2869d9] focus:ring-2 focus:ring-[#2869d9]/10"
                />

                <Eye
                  size={17}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#63768d] cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">

              <label className="flex items-center gap-2 cursor-pointer">
                <div className="w-[16px] h-[16px] rounded-[4px] bg-[#2869d9] flex items-center justify-center">
                  <Check
                    size={12}
                    strokeWidth={3}
                    className="text-white"
                  />
                </div>

                <span className="text-[11px] text-[#5e7188]">
                  Remember me
                </span>
              </label>

              <button
                type="button"
                className="text-[11px] font-medium text-[#2869d9] hover:underline"
              >
                Forgot password?
              </button>

            </div>

            <button
              type="submit"
              className="w-full h-[46px] rounded-lg bg-[#2869e8] hover:bg-[#1f5ed4] text-white text-[13px] font-semibold flex items-center justify-center relative transition shadow-[0_4px_12px_rgba(40,105,232,0.2)]"
            >
              Login

              <ArrowRight
                size={17}
                className="absolute right-4"
              />
            </button>

          </form>

          <div className="flex items-center gap-4 my-7">

            <div className="h-px bg-[#e3e7ec] flex-1" />

            <span className="text-[11px] text-[#8a98a9]">
              or
            </span>

            <div className="h-px bg-[#e3e7ec] flex-1" />

          </div>

          <button
            type="button"
            className="w-full h-[45px] border border-[#dce3eb] rounded-lg flex items-center justify-center gap-3 text-[12px] font-medium text-[#33465e] hover:bg-[#f8fafc] transition"
          >
            <span className="font-bold text-[18px] text-[#4285F4]">
              G
            </span>

            Continue with Google
          </button>

          <p className="text-center text-[11px] text-[#6d7d91] mt-12">
            Don't have an account?

            <button
              type="button"
              className="ml-1 text-[#2869d9] font-semibold hover:underline"
            >
              Contact us
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;
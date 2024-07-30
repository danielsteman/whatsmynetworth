import Logo from "./features/navigation/Logo";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="flex justify-center mb-8">
          <Logo width={170} />
        </div>
        <h1 className="text-3xl font-semibold">Sign in to your account</h1>
        <div className="mt-2 text-md">
          or{" "}
          <a href="/signup" className="font-semibold">
            create an account
          </a>
        </div>
        <div className="mt-8 text-left">
          <form className=" flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm">Email address</label>
              <input
                className="bg-yellow-100 p-2 text-sm rounded-lg border-2 border-slate-200 shadow-sm"
                id="email"
                type="email"
                placeholder="you@example.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm">Password</label>
              <input
                className="bg-yellow-100 p-2 text-sm rounded-lg border-2 border-slate-200 shadow-sm"
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white rounded-lg p-2"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

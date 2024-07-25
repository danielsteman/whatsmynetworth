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
      </div>
    </div>
  );
}

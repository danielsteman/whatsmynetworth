import Logo from "./features/navigation/Logo";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <Logo />
        </div>
        <h1 className="text-3xl font-semibold">Sign in to your account</h1>
        <p className="mt-4 text-md">Or create an account</p>
      </div>
    </div>
  );
}

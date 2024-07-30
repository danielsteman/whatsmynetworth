import Logo from "./features/navigation/Logo";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-screen bg-gray-100">
      <Logo />
      <div>Welcome</div>
    </div>
  );
}

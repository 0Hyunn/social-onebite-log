import logo from "@/assets/logo.png";

export default function GlobalLoader() {
  return (
    <div className="w-[100vw bg-muted flex h-[100vh] flex-col items-center justify-center">
      <div className="mb-15 flex animate-bounce items-center gap-4">
        <img src={logo} alt="한입 로그 로고" className="w-10" />
        <div className="text-2xl font-bold">한입 로그</div>
      </div>
    </div>
  );
}

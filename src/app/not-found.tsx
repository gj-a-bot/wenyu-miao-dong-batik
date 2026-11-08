import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wenyu-on-indigo mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <p className="wenyu-eyebrow text-xs uppercase tracking-[0.3em]">404</p>
      <h1 className="mt-4 font-serif text-3xl">页面未找到</h1>
      <Link href="/" className="wenyu-link mt-8 text-sm">
        返回首页
      </Link>
    </div>
  );
}

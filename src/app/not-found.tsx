import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-brand-gold">404</p>
      <h1 className="mt-4 font-serif text-3xl text-brand-primary">页面未找到</h1>
      <Link href="/" className="mt-8 text-sm text-brand-primary underline-offset-4 hover:underline">
        返回首页
      </Link>
    </div>
  );
}

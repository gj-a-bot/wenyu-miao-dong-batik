import { Button } from "@/components/ui/Button";

export function StudioCTA() {
  return (
    <section className="relative overflow-hidden bg-brand-primary py-24 text-brand-cream">
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-brand-gold/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">
            数字共创实验室
          </p>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl">
            传统纹样不止于欣赏，也可以成为现代设计的灵感。
          </h2>
          <p className="mt-6 text-brand-gray">
            在浏览器中调整色彩、排列与尺度，导出 PNG 保存你的实验作品。规则驱动的配色与布局助手已内置；AI 模型接口预留待接入。
          </p>
          <div className="mt-10">
            <Button href="/studio" variant="gold">
              进入数字共创
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

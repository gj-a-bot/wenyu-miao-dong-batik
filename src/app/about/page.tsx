export const metadata = { title: "关于纹语" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 md:px-8">
      <h1 className="font-serif text-4xl text-brand-primary">关于纹语</h1>
      <p className="mt-4 text-brand-muted">
        WENYU — Miao-Dong Batik Digital Interactive Heritage System
      </p>

      <section className="mt-12 space-y-4 text-brand-primary/85 leading-relaxed">
        <h2 className="font-serif text-2xl text-brand-primary">项目背景</h2>
        <p>
          「纹语」面向苗侗蜡染文化的数字传播与交互体验，尝试以纹样档案、工艺可视化与共创工具，构建可参与、可扩展的数字文化产品形态。
        </p>
      </section>

      <section className="mt-12 space-y-4 leading-relaxed text-brand-primary/85">
        <h2 className="font-serif text-2xl text-brand-primary">设计理念</h2>
        <p>
          让纹样有故事，让工艺可体验，让传统文化能够被重新理解和创造。视觉语言取法现代东方美学与数字博物馆展陈逻辑，避免模板化「科技大屏」审美。
        </p>
      </section>

      <section className="mt-12 space-y-4 leading-relaxed text-brand-primary/85">
        <h2 className="font-serif text-2xl text-brand-primary">项目目标</h2>
        <ul className="list-inside list-disc text-brand-muted">
          <li>形成可展示的完整交互原型</li>
          <li>建立可扩展的纹样与工艺数据结构</li>
          <li>提供真实可用的共创与导出能力</li>
        </ul>
      </section>

      <section className="mt-12 space-y-4 leading-relaxed text-brand-primary/85">
        <h2 className="font-serif text-2xl text-brand-primary">技术实现</h2>
        <p>
          Next.js 14、TypeScript、Tailwind CSS、Framer Motion、Canvas/SVG 本地渲染；收藏与共创作品使用
          localStorage。Supabase 同步接口已在代码中预留，未配置密钥时不影响运行。
        </p>
      </section>

      <section className="mt-12 space-y-4 leading-relaxed">
        <h2 className="font-serif text-2xl text-brand-primary">文化资料来源</h2>
        <p className="text-brand-muted">
          当前演示纹样均为项目原创几何实验素材，并在界面标注「数字实验素材」或「待核实」。工艺说明为概括性导读，具体参数与传承细节需补充田野与文献依据后方可升级为「已核实」状态。
        </p>
      </section>

      <section className="mt-12 space-y-4 leading-relaxed">
        <h2 className="font-serif text-2xl text-brand-primary">版权与原创声明</h2>
        <p className="text-brand-muted">
          站点 UI、Logo 图形、演示 SVG 纹样与展厅样例均为本项目创作或明确标注来源。未经授权的第三方非遗作品图片未纳入本仓库。详细素材清单见{" "}
          <code className="text-xs bg-brand-primary/5 px-1">docs/ASSET_SOURCES.md</code>。
        </p>
      </section>

      <section className="mt-12 border-t border-brand-primary/10 pt-8 text-sm text-brand-muted">
        <p>
          团队与指导教师信息：待填写（提交竞赛前请对照赛项规则确认是否需匿名或脱敏展示）。
        </p>
        <p className="mt-2">合作机构：待填写</p>
      </section>
    </div>
  );
}

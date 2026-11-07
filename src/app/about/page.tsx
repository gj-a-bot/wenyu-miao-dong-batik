import { BatikTextureSurface } from "@/components/ui/BatikTextureSurface";
import { SectionHeading } from "@/components/ui/SectionHeading";

const sections = [
  {
    n: "01",
    title: "项目背景",
    body: "「纹语」面向苗侗蜡染文化的数字传播与交互体验，以纹样档案、工艺可视化与共创工具，构建可参与、可扩展的数字文化产品形态。",
  },
  {
    n: "02",
    title: "设计理念",
    body: "让纹样有故事，让工艺可体验，让传统文化能够被重新理解和创造。视觉取法东方编辑设计与数字博物馆展陈，避免模板化科技大屏审美。",
  },
  {
    n: "03",
    title: "项目目标",
    body: "形成可展示的完整交互原型；建立可扩展的纹样与工艺数据结构；提供真实可用的共创与导出能力。",
  },
  {
    n: "04",
    title: "文化数字化思路",
    body: "以档案化、可核实标注与交互体验三层结构组织内容：实验素材与传统类型参考明确区分，工艺导读不写成唯一标准，共创工具支持再设计而非替代传承。",
  },
  {
    n: "05",
    title: "技术实现",
    body: "Next.js 14、TypeScript、Tailwind CSS、Framer Motion、Canvas/SVG 本地渲染；收藏与共创作品使用 localStorage。Supabase 同步接口已预留。",
  },
  {
    n: "06",
    title: "文化资料来源",
    body: "演示纹样含项目原创实验素材与带来源说明的类型参考条目；工艺说明为概括性导读，具体参数需补充田野与文献依据后方可升级为「已核实」。",
  },
  {
    n: "07",
    title: "版权与原创声明",
    body: "站点 UI、Logo、演示 SVG 与展厅样例均为本项目创作或明确标注来源。未经授权的第三方非遗作品图片未纳入仓库。详见 docs/ASSET_SOURCES.md。",
  },
];

export const metadata = { title: "关于纹语" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 md:px-8">
      <SectionHeading
        eyebrow="Project Archive"
        title="关于纹语"
        subtitle="WENYU — Miao-Dong Batik Digital Interactive Heritage System"
      />

      <BatikTextureSurface
        as="div"
        variant="divider"
        className="mt-14"
        aria-hidden
      />

      <div className="mt-16 space-y-16">
        {sections.map((s) => (
          <section key={s.n} className="border-t border-brand-border pt-10">
            <p className="font-serif text-sm tracking-[0.35em] text-brand-goldInk">
              {s.n}
            </p>
            <h2 className="mt-2 font-serif text-2xl text-brand-primary">{s.title}</h2>
            <p className="mt-4 leading-relaxed text-brand-muted">{s.body}</p>
          </section>
        ))}
      </div>

      <section className="mt-16 border-t border-brand-border pt-8 text-sm text-brand-muted">
        <p>团队与指导教师信息：待填写（提交竞赛前请对照赛项规则确认是否需匿名或脱敏展示）。</p>
        <p className="mt-2">合作机构：待填写</p>
      </section>
    </div>
  );
}

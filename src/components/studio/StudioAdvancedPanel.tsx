"use client";

import {
  layoutPresets,
  presetPalettes,
} from "@/data/studio-assets";
import { ColorField, RangeField } from "@/components/ui/Field";
import type { StudioConfig } from "@/types";

type Props = {
  config: StudioConfig;
  onChange: (partial: Partial<StudioConfig>) => void;
  onPalette: (p: (typeof presetPalettes)[0]) => void;
  onLayout: (l: (typeof layoutPresets)[0]) => void;
};

export function StudioAdvancedPanel({
  config,
  onChange,
  onPalette,
  onLayout,
}: Props) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-[10px] uppercase tracking-[0.28em] text-brand-goldInk">
          配色预设
        </h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {presetPalettes.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => onPalette(p)}
              className="wenyu-chip text-[11px]"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-[10px] uppercase tracking-[0.28em] text-brand-goldInk">
          排列预设
        </h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {layoutPresets.map((l) => (
            <button
              key={l.name}
              type="button"
              onClick={() => onLayout(l)}
              className="wenyu-chip text-[11px]"
            >
              {l.name}
            </button>
          ))}
        </div>
      </div>
      <div className="border-t border-brand-border pt-4">
        <h3 className="text-[10px] uppercase tracking-[0.28em] text-brand-primary">
          颜色与几何
        </h3>
        <div className="mt-4 space-y-4">
          <ColorField
            label="主色"
            value={config.primaryColor}
            onChange={(v) => onChange({ primaryColor: v })}
          />
          <ColorField
            label="点缀色"
            value={config.accentColor}
            onChange={(v) => onChange({ accentColor: v })}
          />
          <ColorField
            label="背景色"
            value={config.backgroundColor}
            onChange={(v) => onChange({ backgroundColor: v })}
          />
          <RangeField
            label="尺度"
            value={config.scale}
            min={0.2}
            max={1.5}
            step={0.05}
            onChange={(v) => onChange({ scale: v })}
            format={(v) => v.toFixed(2)}
          />
          <RangeField
            label="旋转"
            value={config.rotation}
            min={0}
            max={360}
            onChange={(v) => onChange({ rotation: v })}
            format={(v) => `${v}°`}
          />
          <RangeField
            label="横向重复"
            value={config.repeatX}
            min={1}
            max={8}
            onChange={(v) => onChange({ repeatX: v })}
          />
          <RangeField
            label="纵向重复"
            value={config.repeatY}
            min={1}
            max={8}
            onChange={(v) => onChange({ repeatY: v })}
          />
          <RangeField
            label="间距"
            value={config.spacing}
            min={0}
            max={40}
            onChange={(v) => onChange({ spacing: v })}
            format={(v) => `${v}px`}
          />
          <RangeField
            label="水平偏移"
            value={config.offsetX}
            min={-120}
            max={120}
            onChange={(v) => onChange({ offsetX: v })}
            format={(v) => `${v}px`}
          />
          <RangeField
            label="垂直偏移"
            value={config.offsetY}
            min={-120}
            max={120}
            onChange={(v) => onChange({ offsetY: v })}
            format={(v) => `${v}px`}
          />
        </div>
      </div>
      <div className="border-t border-brand-border pt-4">
        <h3 className="text-[10px] uppercase tracking-[0.28em] text-brand-primary">
          蜡染工艺模拟
        </h3>
        <p className="mt-1 text-[10px] leading-relaxed text-brand-secondary">
          渗染与冰裂叠加在纹样之上，模拟蓝染留白质感。
        </p>
        <div className="mt-4 space-y-4">
          <RangeField
            label="靛蓝渗染"
            value={config.waxBleed ?? 0}
            min={0}
            max={1}
            step={0.02}
            onChange={(v) => onChange({ waxBleed: v })}
            format={(v) => `${Math.round(v * 100)}%`}
          />
          <RangeField
            label="蜡裂纹理"
            value={config.waxCrackle ?? 0}
            min={0}
            max={1}
            step={0.02}
            onChange={(v) => onChange({ waxCrackle: v })}
            format={(v) => `${Math.round(v * 100)}%`}
          />
        </div>
      </div>
    </div>
  );
}

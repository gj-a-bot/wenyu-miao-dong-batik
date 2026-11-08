"use client";

export function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-wider text-brand-primary">
        {label}
      </span>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="wenyu-color mt-2"
      />
    </label>
  );
}

export function RangeField({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
}) {
  const display = format ? format(value) : String(value);
  return (
    <label className="block">
      <div className="flex justify-between text-xs">
        <span className="font-medium uppercase tracking-wider text-brand-primary">
          {label}
        </span>
        <span className="tabular-nums font-medium text-brand-goldInk">
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) =>
          onChange(
            step < 1 ? parseFloat(e.target.value) : parseInt(e.target.value, 10)
          )
        }
        className="wenyu-range mt-3"
      />
    </label>
  );
}

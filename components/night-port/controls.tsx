"use client";

import { useEffect, useId, useRef } from "react";

/*
 * Night Port controls: signage buttons, inset fields, segmented tabs.
 * Control edges are steel, not edge grey, so they pass 3:1 on the dark panels.
 * Live states come from :hover, :focus-visible and :active; `force` pins one on for the state matrix.
 */
export type Forced = "hover" | "focus" | "pressed";

const FOCUS_RING = "outline-2 outline-offset-2 outline-np-signal";
const LIVE_FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-np-signal";

function cx(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export function Button({
  variant = "primary",
  force,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary"; force?: Forced }) {
  const primary = {
    rest: "bg-np-amber hover:bg-[#ffc24d] active:bg-[#e69a10]",
    hover: "bg-[#ffc24d]",
    focus: cx("bg-np-amber", FOCUS_RING),
    pressed: "translate-y-px bg-[#e69a10]",
  };
  const secondary = {
    rest: "border-np-steel hover:border-np-signal hover:bg-[#1f242d] active:bg-np-edge",
    hover: "border-np-signal bg-[#1f242d]",
    focus: cx("border-np-steel", FOCUS_RING),
    pressed: "translate-y-px border-np-signal bg-np-edge",
  };
  const states = variant === "primary" ? primary : secondary;
  return (
    <button
      type="button"
      className={cx(
        "inline-flex h-10 cursor-pointer items-center justify-center rounded-[2px] px-4 font-np-display text-[15px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap active:translate-y-px disabled:cursor-not-allowed disabled:translate-y-0",
        LIVE_FOCUS,
        variant === "primary"
          ? "text-np-night disabled:bg-np-edge disabled:text-np-steel"
          : "border text-np-signal disabled:border-np-edge disabled:bg-transparent disabled:text-np-steel",
        states[force ?? "rest"],
        className,
      )}
      {...props}
    />
  );
}

export function TextLink({ force, className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { force?: Forced }) {
  return (
    <a
      className={cx(
        "cursor-pointer font-np-mono text-sm whitespace-nowrap text-np-signal underline decoration-np-steel underline-offset-4",
        LIVE_FOCUS,
        "hover:decoration-np-signal active:text-np-steel",
        force === "hover" && "decoration-np-signal",
        force === "focus" && FOCUS_RING,
        force === "pressed" && "text-np-steel",
        className,
      )}
      {...props}
    />
  );
}

/* Fields sit inset: darker than the panel around them. */
const FIELD =
  "h-10 w-full rounded-[2px] border bg-np-night px-3 font-np-body text-base text-np-signal placeholder:text-np-steel disabled:cursor-not-allowed disabled:border-np-edge disabled:bg-np-panel disabled:text-np-steel";

function fieldState(force: Forced | undefined, invalid?: boolean) {
  return cx(
    invalid ? "border-np-signal border-2" : "border-np-steel",
    "hover:border-np-signal focus:outline-2 focus:outline-offset-2 focus:outline-np-signal",
    force === "hover" && "border-np-signal",
    force === "focus" && FOCUS_RING,
  );
}

export function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1 block font-np-mono text-[11px] uppercase tracking-wider text-np-steel">
      {children}
    </label>
  );
}

export function TextField({
  label,
  force,
  error,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; force?: Forced; error?: string }) {
  const id = useId();
  return (
    <div className={className}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cx(FIELD, fieldState(force, Boolean(error)))}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 font-np-mono text-xs">
          ! {error}
        </p>
      )}
    </div>
  );
}

export function Select({
  label,
  options,
  force,
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; options: string[]; force?: Forced }) {
  const id = useId();
  return (
    <div className={className}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        <select id={id} className={cx(FIELD, "cursor-pointer appearance-none pr-9", fieldState(force))} {...props}>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <span aria-hidden className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 font-np-mono text-xs text-np-steel">
          ▾
        </span>
      </div>
    </div>
  );
}

function boxForce(force?: Forced) {
  return cx(force === "hover" && "border-np-signal", force === "focus" && FOCUS_RING, force === "pressed" && "scale-90");
}

export function Checkbox({
  label,
  force,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & { label: React.ReactNode; force?: Forced }) {
  return (
    <label className="group relative inline-flex cursor-pointer items-center gap-2.5 has-[:disabled]:cursor-not-allowed">
      <input type="checkbox" className="peer sr-only" {...props} />
      <span
        aria-hidden
        className={cx(
          "flex size-[18px] shrink-0 items-center justify-center rounded-[2px] border border-np-steel bg-np-night font-np-mono text-xs text-transparent transition-transform",
          "group-hover:border-np-signal group-active:scale-90 peer-checked:border-np-signal peer-checked:bg-np-signal peer-checked:text-np-night",
          "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-np-signal",
          "peer-disabled:border-np-edge peer-disabled:group-hover:border-np-edge peer-disabled:peer-checked:bg-np-edge",
          boxForce(force),
        )}
      >
        ✓
      </span>
      <span className="font-np-body text-base peer-disabled:text-np-steel">{label}</span>
    </label>
  );
}

export function Radio({
  label,
  force,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & { label: React.ReactNode; force?: Forced }) {
  return (
    <label className="group relative inline-flex cursor-pointer items-center gap-2.5 has-[:disabled]:cursor-not-allowed">
      <input type="radio" className="peer sr-only" {...props} />
      <span
        aria-hidden
        className={cx(
          "flex size-[18px] shrink-0 items-center justify-center rounded-full border border-np-steel bg-np-night transition-transform",
          "group-hover:border-np-signal group-active:scale-90 peer-checked:border-np-signal peer-checked:[&>span]:bg-np-signal",
          "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-np-signal",
          "peer-disabled:border-np-edge peer-disabled:group-hover:border-np-edge",
          boxForce(force),
        )}
      >
        <span className="size-2 rounded-full" />
      </span>
      <span className="font-np-body text-base peer-disabled:text-np-steel">{label}</span>
    </label>
  );
}

export function Toggle({
  label,
  checked,
  onChange,
  disabled,
  force,
}: {
  label: string;
  checked: boolean;
  onChange?: (next: boolean) => void;
  disabled?: boolean;
  force?: Forced;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={cx("group inline-flex cursor-pointer items-center gap-2.5 disabled:cursor-not-allowed", LIVE_FOCUS, force === "focus" && FOCUS_RING)}
    >
      <span
        aria-hidden
        className={cx(
          "flex h-6 w-11 items-center rounded-[2px] border px-0.5 transition-colors group-disabled:border-np-edge",
          checked ? "border-np-signal bg-np-signal" : "border-np-steel bg-np-night group-hover:border-np-signal",
          force === "hover" && "border-np-signal",
        )}
      >
        <span
          className={cx(
            "size-4 rounded-[1px] transition-transform group-active:scale-90",
            checked ? "translate-x-5 bg-np-night" : "bg-np-steel group-disabled:bg-np-edge",
            force === "pressed" && "scale-90",
          )}
        />
      </span>
      <span className="font-np-body text-base group-disabled:text-np-steel">{label}</span>
    </button>
  );
}

/* Segmented tabs: the selected segment lights up. */
export function Tabs<T extends string>({
  items,
  value,
  onChange,
  label,
  force,
}: {
  items: { id: T; label: string }[];
  value: T;
  onChange?: (id: T) => void;
  label: string;
  force?: { id: T; state: Forced | "disabled" };
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: React.KeyboardEvent, index: number) {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (index + step + items.length) % items.length;
    refs.current[next]?.focus();
    onChange?.(items[next].id);
  }

  return (
    <div role="tablist" aria-label={label} className="inline-flex max-w-full gap-0.5 rounded-[2px] border border-np-steel p-0.5">
      {items.map((item, i) => {
        const selected = item.id === value;
        const forced = force?.id === item.id ? force.state : undefined;
        return (
          <button
            key={item.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            disabled={forced === "disabled"}
            onClick={() => onChange?.(item.id)}
            onKeyDown={(event) => onKeyDown(event, i)}
            className={cx(
              "cursor-pointer rounded-[1px] px-2.5 py-1.5 font-np-display text-sm font-semibold uppercase tracking-[0.06em] whitespace-nowrap active:translate-y-px disabled:cursor-not-allowed disabled:text-np-edge sm:px-3",
              LIVE_FOCUS,
              selected ? "bg-np-signal text-np-night" : "text-np-steel hover:bg-[#1f242d] hover:text-np-signal",
              forced === "hover" && "bg-[#1f242d] text-np-signal",
              forced === "focus" && FOCUS_RING,
              forced === "pressed" && "translate-y-px bg-np-edge text-np-signal",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

export function Chip({
  selected,
  force,
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { selected: boolean; force?: Forced }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cx(
        "inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-[2px] border px-3 font-np-mono text-xs uppercase whitespace-nowrap active:translate-y-px disabled:cursor-not-allowed disabled:border-np-edge disabled:text-np-steel",
        LIVE_FOCUS,
        selected ? "border-np-signal bg-np-signal text-np-night hover:bg-[#c9ccd1]" : "border-np-steel text-np-signal hover:bg-[#1f242d]",
        force === "hover" && (selected ? "bg-[#c9ccd1]" : "bg-[#1f242d]"),
        force === "focus" && FOCUS_RING,
        force === "pressed" && "translate-y-px bg-np-edge",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/* Detail panel: a monitor window with a channel bar, in a native dialog. */
export function DetailPanel({
  open,
  onClose,
  title,
  channel,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  channel?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => event.target === event.currentTarget && onClose()}
      className="m-auto w-[min(32rem,calc(100vw-2rem))] rounded-[2px] border border-np-steel bg-np-panel p-0 text-np-signal backdrop:bg-black/60"
    >
      <div className="flex items-center justify-between gap-4 border-b border-np-edge px-4 py-2">
        <p className="font-np-mono text-[11px] uppercase tracking-wider text-np-steel">{channel}</p>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className={cx("size-8 shrink-0 cursor-pointer rounded-[2px] border border-np-steel font-np-mono hover:border-np-signal hover:bg-[#1f242d] active:translate-y-px", LIVE_FOCUS)}
        >
          ×
        </button>
      </div>
      <div className="px-5 py-5">
        <h2 id={titleId} className="font-np-display text-3xl font-bold uppercase leading-none tracking-tight">
          {title}
        </h2>
        <div className="mt-4">{children}</div>
      </div>
    </dialog>
  );
}

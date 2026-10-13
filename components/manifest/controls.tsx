"use client";

import { useEffect, useId, useRef } from "react";

/*
 * Manifest controls. Live states come from :hover, :focus-visible and :active.
 * `force` pins one state on so the design system can show states side by side.
 */
export type Forced = "hover" | "focus" | "pressed";

const FOCUS_RING = "outline-2 outline-offset-2 outline-mf-ink";
const LIVE_FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mf-ink";

function cx(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/* ---------- Button ---------- */

export function Button({
  variant = "primary",
  force,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary"; force?: Forced }) {
  const primary = {
    rest: "bg-mf-stamp hover:bg-[#a42c24] active:bg-[#8e251e]",
    hover: "bg-[#a42c24]",
    focus: cx("bg-mf-stamp", FOCUS_RING),
    pressed: "translate-y-px bg-[#8e251e]",
  };
  const secondary = {
    rest: "hover:bg-mf-rule/40 active:bg-mf-rule/70",
    hover: "bg-mf-rule/40",
    focus: FOCUS_RING,
    pressed: "translate-y-px bg-mf-rule/70",
  };
  const states = variant === "primary" ? primary : secondary;

  return (
    <button
      type="button"
      className={cx(
        "inline-flex h-10 cursor-pointer items-center justify-center gap-2 px-4 font-mf-mono text-sm font-semibold uppercase tracking-wider whitespace-nowrap active:translate-y-px disabled:cursor-not-allowed disabled:translate-y-0",
        LIVE_FOCUS,
        variant === "primary"
          ? "text-mf-paper disabled:bg-mf-rule disabled:text-mf-umber"
          : "border border-mf-ink text-mf-ink disabled:border-mf-rule disabled:bg-transparent disabled:text-mf-umber",
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
        "cursor-pointer font-mf-mono text-sm whitespace-nowrap underline underline-offset-4",
        LIVE_FOCUS,
        "decoration-mf-rule hover:decoration-mf-ink active:text-mf-stamp",
        force === "hover" && "decoration-mf-ink",
        force === "focus" && FOCUS_RING,
        force === "pressed" && "text-mf-stamp decoration-mf-ink",
        className,
      )}
      {...props}
    />
  );
}

/* ---------- Text input and select ---------- */

const FIELD_BOX =
  "h-10 w-full border bg-mf-paper px-3 font-mf-condensed text-base text-mf-ink placeholder:text-mf-umber disabled:cursor-not-allowed disabled:border-mf-rule disabled:bg-mf-kraft disabled:text-mf-umber";

function fieldState(force: Forced | undefined, invalid: boolean | undefined) {
  return cx(
    invalid ? "border-mf-stamp" : "border-mf-ink",
    "hover:shadow-[inset_0_0_0_1px_var(--color-mf-ink)] focus:outline-2 focus:outline-offset-2 focus:outline-mf-ink",
    force === "hover" && "shadow-[inset_0_0_0_1px_var(--color-mf-ink)]",
    force === "focus" && FOCUS_RING,
  );
}

export function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1 block font-mf-mono text-[11px] font-medium uppercase tracking-wider text-mf-umber">
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
        className={cx(FIELD_BOX, fieldState(force, Boolean(error)))}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 font-mf-condensed text-sm text-mf-stamp">
          {error}
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
        <select id={id} className={cx(FIELD_BOX, "cursor-pointer appearance-none pr-9", fieldState(force, false))} {...props}>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <span aria-hidden className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 font-mf-mono text-xs">
          ▾
        </span>
      </div>
    </div>
  );
}

/* ---------- Checkbox, radio, toggle ---------- */

function boxForce(force?: Forced) {
  return cx(force === "hover" && "border-2", force === "focus" && FOCUS_RING, force === "pressed" && "scale-90");
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
          "flex size-5 shrink-0 items-center justify-center border border-mf-ink bg-mf-paper font-mf-mono text-xs text-transparent transition-transform",
          "group-hover:border-2 group-active:scale-90 peer-checked:bg-mf-ink peer-checked:text-mf-paper",
          "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-mf-ink",
          "peer-disabled:border-mf-rule peer-disabled:bg-mf-kraft peer-disabled:group-hover:border",
          "peer-disabled:peer-checked:bg-mf-rule",
          boxForce(force),
        )}
      >
        ✓
      </span>
      <span className="font-mf-condensed text-base peer-disabled:text-mf-umber">{label}</span>
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
      {/* Radios stay round: the one exception to square corners, so single choice reads at a glance. */}
      <span
        aria-hidden
        className={cx(
          "flex size-5 shrink-0 items-center justify-center rounded-full border border-mf-ink bg-mf-paper transition-transform",
          "group-hover:border-2 group-active:scale-90 peer-checked:[&>span]:bg-mf-ink",
          "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-mf-ink",
          "peer-disabled:border-mf-rule peer-disabled:bg-mf-kraft peer-disabled:group-hover:border",
          boxForce(force),
        )}
      >
        <span className="size-2.5 rounded-full" />
      </span>
      <span className="font-mf-condensed text-base peer-disabled:text-mf-umber">{label}</span>
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
          "flex h-6 w-11 items-center border border-mf-ink px-0.5 transition-colors group-hover:border-2 group-disabled:border-mf-rule group-disabled:group-hover:border",
          checked ? "bg-mf-ink" : "bg-mf-paper",
          force === "hover" && "border-2",
        )}
      >
        <span
          className={cx(
            "size-4 transition-transform group-active:scale-90",
            checked ? "translate-x-5 bg-mf-paper" : "bg-mf-ink group-disabled:bg-mf-rule",
            force === "pressed" && "scale-90",
          )}
        />
      </span>
      <span className="font-mf-condensed text-base group-disabled:text-mf-umber">{label}</span>
    </button>
  );
}

/* ---------- Tabs (manila folder tabs) ---------- */

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
    <div role="tablist" aria-label={label} className="flex border-b border-mf-ink">
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
              "-mb-px cursor-pointer border-x border-t px-2 py-2 font-mf-mono text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap sm:px-3 sm:text-xs active:translate-y-px disabled:cursor-not-allowed disabled:text-mf-rule",
              LIVE_FOCUS,
              selected
                ? "border-mf-ink bg-mf-paper text-mf-ink"
                : "border-transparent text-mf-umber hover:bg-mf-rule/40 hover:text-mf-ink",
              forced === "hover" && "bg-mf-rule/40 text-mf-ink",
              forced === "focus" && FOCUS_RING,
              forced === "pressed" && "translate-y-px bg-mf-rule/70 text-mf-ink",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

/* ---------- Filter chip ---------- */

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
        "inline-flex h-8 cursor-pointer items-center gap-1.5 border border-mf-ink px-3 font-mf-mono text-xs font-medium uppercase tracking-wider whitespace-nowrap active:translate-y-px disabled:cursor-not-allowed disabled:border-mf-rule disabled:text-mf-umber",
        LIVE_FOCUS,
        selected ? "bg-mf-ink text-mf-paper hover:bg-[#2e3c5e]" : "text-mf-ink hover:bg-mf-rule/40",
        force === "hover" && (selected ? "bg-[#2e3c5e]" : "bg-mf-rule/40"),
        force === "focus" && FOCUS_RING,
        force === "pressed" && "translate-y-px bg-mf-rule/70",
        className,
      )}
      {...props}
    >
      {selected && <span aria-hidden>✓</span>}
      {children}
    </button>
  );
}

/* ---------- Detail panel (native dialog: focus trap and Esc for free) ---------- */

export function DetailPanel({
  open,
  onClose,
  title,
  eyebrow,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  eyebrow?: string;
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
      className="m-auto w-[min(32rem,calc(100vw-2rem))] border-2 border-mf-ink bg-mf-paper p-0 text-mf-ink backdrop:bg-mf-ink/50"
    >
      <div className="flex items-start justify-between gap-4 border-b border-mf-ink px-5 py-4">
        <div>
          {eyebrow && <p className="font-mf-mono text-[11px] uppercase tracking-wider text-mf-umber">{eyebrow}</p>}
          <h2 id={titleId} className="font-mf-condensed text-2xl font-semibold leading-tight">
            {title}
          </h2>
        </div>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className={cx("size-9 shrink-0 cursor-pointer border border-mf-ink font-mf-mono text-lg hover:bg-mf-rule/40 active:translate-y-px", LIVE_FOCUS)}
        >
          ×
        </button>
      </div>
      <div className="px-5 py-4">{children}</div>
    </dialog>
  );
}

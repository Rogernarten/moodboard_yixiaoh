"use client";

import { useEffect, useId, useRef } from "react";

/*
 * Pink Paper controls: sentence-case sans buttons, underlined fields, section-style tabs.
 * Live states come from :hover, :focus-visible and :active; `force` pins one on for the state matrix.
 */
export type Forced = "hover" | "focus" | "pressed";

const FOCUS_RING = "outline-2 outline-offset-2 outline-pp-ink";
const LIVE_FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pp-ink";

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
    rest: "bg-pp-teal hover:bg-[#0b3e42] active:bg-[#082f32]",
    hover: "bg-[#0b3e42]",
    focus: cx("bg-pp-teal", FOCUS_RING),
    pressed: "translate-y-px bg-[#082f32]",
  };
  const secondary = {
    rest: "hover:bg-pp-tint active:bg-[#efd5c0]",
    hover: "bg-pp-tint",
    focus: FOCUS_RING,
    pressed: "translate-y-px bg-[#efd5c0]",
  };
  const states = variant === "primary" ? primary : secondary;
  return (
    <button
      type="button"
      className={cx(
        "inline-flex h-10 cursor-pointer items-center justify-center px-4 font-pp-sans text-[15px] font-semibold whitespace-nowrap active:translate-y-px disabled:cursor-not-allowed disabled:translate-y-0",
        LIVE_FOCUS,
        variant === "primary"
          ? "text-pp-salmon disabled:bg-pp-rule disabled:text-pp-graphite"
          : "border border-pp-ink text-pp-ink disabled:border-pp-rule disabled:bg-transparent disabled:text-pp-graphite",
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
        "cursor-pointer font-pp-serif text-base whitespace-nowrap underline decoration-pp-rule underline-offset-4",
        LIVE_FOCUS,
        "hover:decoration-pp-ink active:decoration-2",
        force === "hover" && "decoration-pp-ink",
        force === "focus" && FOCUS_RING,
        force === "pressed" && "decoration-pp-ink decoration-2",
        className,
      )}
      {...props}
    />
  );
}

/* Fields are underlined, like a form printed in the paper. */
const FIELD =
  "h-10 w-full border-b bg-transparent px-0.5 font-pp-serif text-base text-pp-ink placeholder:text-pp-graphite placeholder:italic disabled:cursor-not-allowed disabled:border-pp-rule disabled:text-pp-graphite";

function fieldState(force: Forced | undefined, invalid?: boolean) {
  return cx(
    invalid ? "border-pp-ink border-b-2" : "border-pp-ink",
    "hover:border-b-2 focus:outline-2 focus:outline-offset-2 focus:outline-pp-ink",
    force === "hover" && "border-b-2",
    force === "focus" && FOCUS_RING,
  );
}

export function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block font-pp-sans text-xs font-semibold uppercase tracking-[0.12em] text-pp-graphite">
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
        <p id={`${id}-error`} className="mt-1 font-pp-serif text-sm italic">
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
        <select id={id} className={cx(FIELD, "cursor-pointer appearance-none pr-7", fieldState(force))} {...props}>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <span aria-hidden className="pointer-events-none absolute top-1/2 right-1 -translate-y-1/2 font-pp-sans text-xs">
          ▾
        </span>
      </div>
    </div>
  );
}

function boxForce(force?: Forced) {
  return cx(force === "hover" && "bg-pp-tint", force === "focus" && FOCUS_RING, force === "pressed" && "scale-90");
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
          "flex size-[18px] shrink-0 items-center justify-center border border-pp-ink font-pp-sans text-xs text-transparent transition-transform",
          "group-hover:bg-pp-tint group-active:scale-90 peer-checked:bg-pp-ink peer-checked:text-pp-salmon",
          "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-pp-ink",
          "peer-disabled:border-pp-rule peer-disabled:group-hover:bg-transparent peer-disabled:peer-checked:bg-pp-rule",
          boxForce(force),
        )}
      >
        ✓
      </span>
      <span className="font-pp-serif text-base peer-disabled:text-pp-graphite">{label}</span>
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
          "flex size-[18px] shrink-0 items-center justify-center rounded-full border border-pp-ink transition-transform",
          "group-hover:bg-pp-tint group-active:scale-90 peer-checked:[&>span]:bg-pp-ink",
          "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-pp-ink",
          "peer-disabled:border-pp-rule peer-disabled:group-hover:bg-transparent",
          boxForce(force),
        )}
      >
        <span className="size-2 rounded-full" />
      </span>
      <span className="font-pp-serif text-base peer-disabled:text-pp-graphite">{label}</span>
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
          "flex h-5 w-9 items-center rounded-full border border-pp-ink px-0.5 transition-colors group-disabled:border-pp-rule",
          checked ? "bg-pp-ink" : "group-hover:bg-pp-tint",
          force === "hover" && !checked && "bg-pp-tint",
        )}
      >
        <span
          className={cx(
            "size-3.5 rounded-full transition-transform group-active:scale-90",
            checked ? "translate-x-4 bg-pp-salmon" : "bg-pp-ink group-disabled:bg-pp-rule",
            force === "pressed" && "scale-90",
          )}
        />
      </span>
      <span className="font-pp-serif text-base group-disabled:text-pp-graphite">{label}</span>
    </button>
  );
}

/* Section tabs: the selected one is underlined in ink, like a newspaper section bar. */
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

  // Every tab is a Tab stop (users didn't discover arrow-only tabs); arrows are a shortcut.
  function onKeyDown(event: React.KeyboardEvent, index: number) {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (index + step + items.length) % items.length;
    refs.current[next]?.focus();
    onChange?.(items[next].id);
  }

  return (
    <div role="tablist" aria-label={label} className="flex gap-5 border-b border-pp-rule">
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
            disabled={forced === "disabled"}
            onClick={() => onChange?.(item.id)}
            onKeyDown={(event) => onKeyDown(event, i)}
            className={cx(
              "-mb-px cursor-pointer border-b-2 py-2 font-pp-sans text-[15px] font-semibold whitespace-nowrap active:translate-y-px disabled:cursor-not-allowed disabled:text-pp-rule",
              LIVE_FOCUS,
              selected ? "border-pp-ink text-pp-ink" : "border-transparent text-pp-graphite hover:border-pp-rule hover:text-pp-ink",
              forced === "hover" && "border-pp-rule text-pp-ink",
              forced === "focus" && FOCUS_RING,
              forced === "pressed" && "translate-y-px border-pp-rule text-pp-ink",
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
        "inline-flex h-8 cursor-pointer items-center gap-1.5 border px-3 font-pp-sans text-sm whitespace-nowrap active:translate-y-px disabled:cursor-not-allowed disabled:border-pp-rule disabled:text-pp-graphite",
        LIVE_FOCUS,
        selected ? "border-pp-ink bg-pp-ink font-semibold text-pp-salmon hover:bg-[#3a3f4b]" : "border-pp-graphite text-pp-ink hover:bg-pp-tint",
        force === "hover" && (selected ? "bg-[#3a3f4b]" : "bg-pp-tint"),
        force === "focus" && FOCUS_RING,
        force === "pressed" && "translate-y-px bg-[#efd5c0]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/* Detail panel: a boxed sidebar article in a native dialog. */
export function DetailPanel({
  open,
  onClose,
  title,
  kicker,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  kicker?: string;
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
      className="m-auto w-[min(32rem,calc(100vw-2rem))] border-t-4 border-double border-pp-ink bg-pp-salmon p-0 text-pp-ink backdrop:bg-pp-ink/40"
    >
      <div className="flex items-start justify-between gap-4 px-6 pt-5">
        <div>
          {kicker && <p className="font-pp-sans text-xs font-semibold uppercase tracking-[0.12em] text-pp-graphite">{kicker}</p>}
          <h2 id={titleId} className="mt-1 font-pp-display text-3xl font-medium leading-tight tracking-tight">
            {title}
          </h2>
        </div>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className={cx("size-9 shrink-0 cursor-pointer border border-pp-ink font-pp-sans text-lg hover:bg-pp-tint active:translate-y-px", LIVE_FOCUS)}
        >
          ×
        </button>
      </div>
      <div className="px-6 pt-4 pb-6">{children}</div>
    </dialog>
  );
}

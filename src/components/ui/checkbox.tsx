"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"

import { Debris } from "@/components/debris/Debris"
import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"

function Checkbox({
  className,
  debris = false,
  id,
  ...props
}: CheckboxPrimitive.Root.Props & { debris?: boolean }) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      id={id}
      className={cn(
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:shadow-glow-interaction disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:shadow-glow-attention aria-invalid:aria-checked:border-primary dark:bg-input/30 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary",
        debris && "overflow-hidden",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
      >
        <CheckIcon
        />
      </CheckboxPrimitive.Indicator>
      {debris && <Debris seed={id ?? "checkbox"} name="checkbox" count={2} />}
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }

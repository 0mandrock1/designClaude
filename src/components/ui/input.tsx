import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { Debris } from "@/components/debris/Debris"
import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  debris = false,
  id,
  name,
  ...props
}: React.ComponentProps<"input"> & { debris?: boolean }) {
  const input = (
    <InputPrimitive
      type={type}
      data-slot="input"
      id={id}
      name={name}
      className={cn(
        "h-8 w-full min-w-0 rounded-control border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:shadow-glow-interaction disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:shadow-glow-attention md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50",
        className
      )}
      {...props}
    />
  )

  if (!debris) return input

  return (
    <span className="relative block w-full overflow-hidden rounded-control">
      {input}
      <Debris seed={id ?? name ?? type ?? "input"} name="input" count={2} />
    </span>
  )
}

export { Input }

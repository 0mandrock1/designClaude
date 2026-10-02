import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"

import { Debris } from "@/components/debris/Debris"
import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  variant = "default",
  debris = false,
  children,
  ...props
}: SeparatorPrimitive.Props & {
  /**
   * `void` is a 4px true-black band between two hairlines. Void alone barely
   * differs from the page (~1.05:1), so the hairlines carry the edge and the
   * band carries the weight — it is the heavy break, not the default one.
   */
  variant?: "default" | "void"
  debris?: boolean
}) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      data-variant={variant}
      orientation={orientation}
      className={cn(
        "relative shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        variant === "void" &&
          "border-border bg-void data-horizontal:h-1.5 data-horizontal:border-y data-vertical:w-1.5 data-vertical:border-x",
        className
      )}
      {...props}
    >
      {children}
      {debris && (
        <Debris
          seed={variant === "default" ? orientation : `${orientation}-${variant}`}
          name="separator"
          count={1}
        />
      )}
    </SeparatorPrimitive>
  )
}

export { Separator }

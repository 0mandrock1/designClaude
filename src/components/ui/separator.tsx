import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"

import { Debris } from "@/components/debris/Debris"
import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  debris = false,
  children,
  ...props
}: SeparatorPrimitive.Props & { debris?: boolean }) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "relative shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      )}
      {...props}
    >
      {children}
      {debris && <Debris seed={orientation} name="separator" count={1} />}
    </SeparatorPrimitive>
  )
}

export { Separator }

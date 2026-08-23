import { Debris } from "@/components/debris/Debris"
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  id,
  debris = false,
  ...props
}: React.ComponentProps<"div"> & { debris?: boolean }) {
  return (
    <div
      data-slot="skeleton"
      id={id}
      className={cn(
        "relative animate-pulse rounded-md bg-muted",
        debris && "overflow-hidden",
        className
      )}
      {...props}
    >
      {props.children}
      {debris && (
        // Skeleton is only ever mounted while something is actually
        // loading, so unlike Button/Card the chaos layer defaults to
        // alive=true here — it pulses for as long as the placeholder does.
        <Debris seed={id ?? "skeleton"} name="skeleton" count={2} alive />
      )}
    </div>
  )
}

export { Skeleton }

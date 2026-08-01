import type { PreviewDevice } from "@/types/project";
import { cn } from "@/lib/utils";

const FRAMES: Record<
  PreviewDevice,
  { width: number; height: number; label: string; radius: string }
> = {
  mobile: { width: 390, height: 844, label: "iPhone", radius: "rounded-[28px]" },
  tablet: { width: 768, height: 1024, label: "iPad", radius: "rounded-[18px]" },
  desktop: { width: 1280, height: 800, label: "Desktop", radius: "rounded-md" },
};

interface DeviceFrameProps {
  device: PreviewDevice;
  zoom: number;
  children: React.ReactNode;
  className?: string;
}

export function DeviceFrame({
  device,
  zoom,
  children,
  className,
}: DeviceFrameProps): React.JSX.Element {
  const frame = FRAMES[device];
  const scale = zoom / 100;

  return (
    <div
      className={cn(
        "flex items-start justify-center p-4 overflow-auto h-full w-full",
        className,
      )}
    >
      <div
        style={{
          width: frame.width * scale,
          height: frame.height * scale,
        }}
        className="shrink-0"
      >
        <div
          className={cn(
            "border-2 border-charcoal dark:border-cream/25 bg-white shadow-brutal origin-top-left overflow-hidden",
            frame.radius,
            device !== "desktop" && "ring-4 ring-charcoal/10 dark:ring-cream/10",
          )}
          style={{
            width: frame.width,
            height: frame.height,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export { FRAMES };

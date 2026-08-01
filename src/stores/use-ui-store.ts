import { create } from "zustand";
import type { PreviewDevice } from "@/types/project";

export type MobilePane = "chat" | "code" | "preview";

interface UiState {
  commandOpen: boolean;
  publishOpen: boolean;
  previewDevice: PreviewDevice;
  previewZoom: number;
  previewKey: number;
  leftCollapsed: boolean;
  mobilePane: MobilePane;
  setCommandOpen: (open: boolean) => void;
  toggleCommand: () => void;
  setPublishOpen: (open: boolean) => void;
  setPreviewDevice: (device: PreviewDevice) => void;
  setPreviewZoom: (zoom: number) => void;
  refreshPreview: () => void;
  setLeftCollapsed: (value: boolean) => void;
  setMobilePane: (pane: MobilePane) => void;
}

export const useUiStore = create<UiState>((set) => ({
  commandOpen: false,
  publishOpen: false,
  previewDevice: "desktop",
  previewZoom: 100,
  previewKey: 0,
  leftCollapsed: false,
  mobilePane: "chat",
  setCommandOpen: (open) => set({ commandOpen: open }),
  toggleCommand: () => set((s) => ({ commandOpen: !s.commandOpen })),
  setPublishOpen: (open) => set({ publishOpen: open }),
  setPreviewDevice: (device) => set({ previewDevice: device }),
  setPreviewZoom: (zoom) =>
    set({ previewZoom: Math.min(150, Math.max(50, zoom)) }),
  refreshPreview: () => set((s) => ({ previewKey: s.previewKey + 1 })),
  setLeftCollapsed: (value) => set({ leftCollapsed: value }),
  setMobilePane: (pane) => set({ mobilePane: pane }),
}));

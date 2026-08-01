import { useCallback, useRef, useState } from "react";
import { ImagePlus, Send, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAgentStore } from "@/stores/use-agent-store";
import { useFileStore } from "@/stores/use-file-store";
import { useUiStore } from "@/stores/use-ui-store";
import { DEMO_PROPOSAL_MODIFIED } from "@/lib/demo-data";
import type { ChatAttachment } from "@/types/agent";

export function PromptInput(): React.JSX.Element {
  const [value, setValue] = useState("");
  const [attachments, setAttachments] = useState<ChatAttachment[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const isStreaming = useAgentStore((s) => s.isStreaming);
  const addMessage = useAgentStore((s) => s.addMessage);
  const runDemoPipeline = useAgentStore((s) => s.runDemoPipeline);
  const abort = useAgentStore((s) => s.abort);
  const setProposal = useFileStore((s) => s.setProposal);
  const files = useFileStore((s) => s.files);
  const setMobilePane = useUiStore((s) => s.setMobilePane);

  const onPickImage = useCallback((filesList: FileList | null) => {
    if (!filesList) return;
    const next: ChatAttachment[] = [];
    Array.from(filesList)
      .slice(0, 3)
      .forEach((file) => {
        if (!file.type.startsWith("image/")) return;
        next.push({
          id: crypto.randomUUID(),
          name: file.name,
          mimeType: file.type,
          previewUrl: URL.createObjectURL(file),
        });
      });
    setAttachments((prev) => [...prev, ...next].slice(0, 4));
  }, []);

  const submit = async () => {
    const prompt = value.trim();
    if (!prompt || isStreaming) return;
    addMessage({
      role: "user",
      content: prompt,
      ...(attachments.length > 0 ? { attachments } : {}),
    });
    setValue("");
    setAttachments([]);
    const original = files.get("src/App.tsx")?.content ?? "";
    setProposal({
      path: "src/App.tsx",
      original,
      modified: DEMO_PROPOSAL_MODIFIED,
      language: "tsx",
      summary: prompt.slice(0, 120),
    });
    // On phone, switch to Code so HitL is visible after pipeline
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches) {
      setMobilePane("code");
    }
    await runDemoPipeline();
  };

  return (
    <div className="border-t-2 border-charcoal/10 dark:border-cream/10 p-2.5 sm:p-3 space-y-2 bg-cream dark:bg-slate">
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {attachments.map((a) => (
            <div
              key={a.id}
              className="relative h-12 w-12 border-2 border-charcoal/20 overflow-hidden"
            >
              <img
                src={a.previewUrl}
                alt={a.name}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                className="absolute -top-1 -right-1 h-5 w-5 bg-charcoal text-cream text-[10px] leading-none"
                aria-label={`Remove ${a.name}`}
                onClick={() =>
                  setAttachments((prev) => prev.filter((x) => x.id !== a.id))
                }
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Popíš zmenu… (Enter odoslať)"
        aria-label="Prompt input"
        className="min-h-[64px] max-h-[28dvh] text-sm shadow-none text-base sm:text-sm"
        // text-base (16px) on mobile prevents iOS zoom-on-focus
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            void submit();
          }
        }}
        disabled={isStreaming}
      />
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(e) => onPickImage(e.target.files)}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-11 w-11"
            aria-label="Attach image"
            onClick={() => fileRef.current?.click()}
            disabled={isStreaming}
          >
            <ImagePlus className="h-4 w-4" aria-hidden />
          </Button>
        </div>
        {isStreaming ? (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="min-h-11 px-4"
            onClick={abort}
            aria-label="Stop generation"
          >
            <Square className="h-3.5 w-3.5" aria-hidden />
            Stop
          </Button>
        ) : (
          <Button
            type="button"
            size="sm"
            className="min-h-11 px-5"
            onClick={() => void submit()}
            disabled={!value.trim()}
            aria-label="Send prompt"
          >
            <Send className="h-3.5 w-3.5" aria-hidden />
            Send
          </Button>
        )}
      </div>
    </div>
  );
}

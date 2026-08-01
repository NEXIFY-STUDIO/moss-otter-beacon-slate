export type AgentType = "G0" | "G1" | "G2" | "ORCHESTRATOR";

export type AgentPhase =
  | "idle"
  | "planning"
  | "coding"
  | "auditing"
  | "awaiting_approval"
  | "done"
  | "error"
  | "aborted";

export type AgentStatusState = "idle" | "running" | "success" | "error";

export interface AgentStatus {
  type: AgentType;
  label: string;
  state: AgentStatusState;
  message?: string | undefined;
  latencyMs?: number | undefined;
}

export type ChatRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  agentType?: AgentType | undefined;
  createdAt: number;
  attachments?: ChatAttachment[] | undefined;
}

export interface ChatAttachment {
  id: string;
  name: string;
  mimeType: string;
  previewUrl: string;
}

export type HitLDecision = "APPROVED" | "REJECTED";

export interface RejectionFeedback {
  reason: string;
  freeText?: string | undefined;
}

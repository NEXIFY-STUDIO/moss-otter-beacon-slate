export type DiffLineType = "same" | "add" | "del";

export interface DiffLine {
  type: DiffLineType;
  text: string;
  /** Index in original (del/same) or -1 */
  originalIndex: number;
  /** Index in modified (add/same) or -1 */
  modifiedIndex: number;
}

/** LCS-based line diff for HitL / fallback editor. */
export function computeLines(original: string, modified: string): DiffLine[] {
  const a = original.split("\n");
  const b = modified.split("\n");
  const n = a.length;
  const m = b.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    Array.from({ length: m + 1 }, () => 0),
  );
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      const row = dp[i];
      const nextRow = dp[i + 1];
      if (!row || !nextRow) continue;
      if (a[i] === b[j]) {
        row[j] = (nextRow[j + 1] ?? 0) + 1;
      } else {
        row[j] = Math.max(nextRow[j] ?? 0, row[j + 1] ?? 0);
      }
    }
  }
  const lines: DiffLine[] = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      lines.push({
        type: "same",
        text: a[i] ?? "",
        originalIndex: i,
        modifiedIndex: j,
      });
      i++;
      j++;
    } else if ((dp[i + 1]?.[j] ?? 0) >= (dp[i]?.[j + 1] ?? 0)) {
      lines.push({
        type: "del",
        text: a[i] ?? "",
        originalIndex: i,
        modifiedIndex: -1,
      });
      i++;
    } else {
      lines.push({
        type: "add",
        text: b[j] ?? "",
        originalIndex: -1,
        modifiedIndex: j,
      });
      j++;
    }
  }
  while (i < n) {
    lines.push({
      type: "del",
      text: a[i] ?? "",
      originalIndex: i,
      modifiedIndex: -1,
    });
    i++;
  }
  while (j < m) {
    lines.push({
      type: "add",
      text: b[j] ?? "",
      originalIndex: -1,
      modifiedIndex: j,
    });
    j++;
  }
  return lines;
}

/**
 * Accept a single hunk: keep adds/dels at `lineIndex` from the modified side.
 * For del: drop original line; for add: keep modified line. Recalculates remaining proposal.
 */
export function applyHunkAt(
  original: string,
  modified: string,
  lineIndex: number,
): { original: string; modified: string } | null {
  const lines = computeLines(original, modified);
  const target = lines[lineIndex];
  if (!target || target.type === "same") return null;

  const orig = original.split("\n");
  const mod = modified.split("\n");

  if (target.type === "add" && target.modifiedIndex >= 0) {
    // Keep this addition in original by inserting it permanently
    // Find how many same/del before this in original stream
    let insertAt = 0;
    for (let k = 0; k < lineIndex; k++) {
      const L = lines[k];
      if (!L) continue;
      if (L.type === "same" || L.type === "del") insertAt++;
    }
    orig.splice(insertAt, 0, target.text);
  } else if (target.type === "del" && target.originalIndex >= 0) {
    orig.splice(target.originalIndex, 1);
  }

  return {
    original: orig.join("\n"),
    modified: mod.join("\n"),
  };
}

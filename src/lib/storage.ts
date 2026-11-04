const FAVORITES_KEY = "wenyu_pattern_favorites";
const STUDIO_WORKS_KEY = "wenyu_studio_works";

export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(patternId: string): string[] {
  const current = getFavorites();
  const next = current.includes(patternId)
    ? current.filter((id) => id !== patternId)
    : [...current, patternId];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  return next;
}

export function isFavorite(patternId: string): boolean {
  return getFavorites().includes(patternId);
}

export function getStudioWorks<T>(): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STUDIO_WORKS_KEY);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

export function saveStudioWork<T extends { id: string }>(work: T): void {
  const list = getStudioWorks<T>();
  const idx = list.findIndex((w) => w.id === work.id);
  if (idx >= 0) list[idx] = work;
  else list.unshift(work);
  localStorage.setItem(STUDIO_WORKS_KEY, JSON.stringify(list));
}

export function deleteStudioWork(id: string): void {
  const list = getStudioWorks<{ id: string }>().filter((w) => w.id !== id);
  localStorage.setItem(STUDIO_WORKS_KEY, JSON.stringify(list));
}

/** 预留：未来接入 Supabase 同步收藏与作品 */
export const storageApiExtension = {
  syncFavorites: async (_userId: string) => {
    /* TODO: Supabase */
  },
  syncStudioWorks: async (_userId: string) => {
    /* TODO: Supabase */
  },
};

const FAVORITES_KEY = "wenyu_pattern_favorites";
const STUDIO_WORKS_KEY = "wenyu_studio_works";

function setItemSafe(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(patternId: string): {
  ok: boolean;
  favorites: string[];
} {
  const current = getFavorites();
  const next = current.includes(patternId)
    ? current.filter((id) => id !== patternId)
    : [...current, patternId];
  const ok = setItemSafe(FAVORITES_KEY, JSON.stringify(next));
  return { ok, favorites: ok ? next : current };
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

export function saveStudioWork<T extends { id: string }>(work: T): boolean {
  const list = getStudioWorks<T>();
  const idx = list.findIndex((w) => w.id === work.id);
  if (idx >= 0) list[idx] = work;
  else list.unshift(work);
  return setItemSafe(STUDIO_WORKS_KEY, JSON.stringify(list));
}

export function deleteStudioWork(id: string): boolean {
  const list = getStudioWorks<{ id: string }>().filter((w) => w.id !== id);
  return setItemSafe(STUDIO_WORKS_KEY, JSON.stringify(list));
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

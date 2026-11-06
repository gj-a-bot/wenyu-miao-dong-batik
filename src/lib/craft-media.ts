/** craft.json 中 image 字段可为静态图或 public 下的 mp4 路径 */
export function isCraftVideoSrc(src: string): boolean {
  return /\.mp4(\?.*)?$/i.test(src);
}

/** public 静态路径含中文等非 ASCII 时，编码各段以便 <video src> 稳定请求 */
export function encodePublicAssetPath(path: string): string {
  if (!path.startsWith("/")) return path;
  const segments = path.split("/");
  return segments
    .map((seg, i) => (i === 0 ? "" : encodeURIComponent(seg)))
    .join("/");
}

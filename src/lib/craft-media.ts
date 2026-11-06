/** craft.json 中 image 字段可为静态图或 public 下的 mp4 路径 */
export function isCraftVideoSrc(src: string): boolean {
  return /\.mp4(\?.*)?$/i.test(src);
}

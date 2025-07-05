export function parseAsLocal(d: string | Date) {
  if (d instanceof Date) return d;
  // 刪掉尾部 .000Z
  const localIso = d.replace(/\.?0+Z$/, '').replace(' ', 'T');
  return new Date(localIso);  // 這裡 new Date("2025-06-29T15:00:00")
}

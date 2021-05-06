import {func} from "testdouble";

const MIMETYPE_ZIP = [
  'application/zip',
  'application/x-zip',
  'application/x-zip-compressed',
]

export function isZip(file: File | Blob): boolean {
  return (
    ('name' in file && file.name.endsWith('.zip')) ||
    MIMETYPE_ZIP.includes(file.type)
  )
}

/**
 * 数组对象根据某个键值去重处理
 * @param data
 * @param key
 */
export function clearReArray(data: [] | object, key: string):any {
  const res: any[] = [];
  if (Array.isArray(data)) {
    data.forEach(item => {
      if (item && typeof item === 'object') {
        if (!res.find(item => item[key])) {
          res.push(item);
        }
      }
    })
  }
  return res;
}

let timer: NodeJS.Timeout | null;
export function debounce(func: any, time: number) {
  if (timer !== null) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    typeof func === 'function' && func();
  }, time);
}

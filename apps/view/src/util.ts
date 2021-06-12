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

export function GetUrlRelativePath(url: any) {
  if (url) {
    const arrUrl = url.split("//");
    const start = arrUrl[1].indexOf("/");
    let relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

    if(relUrl.indexOf("?") != -1){
      relUrl = relUrl.split("?")[0];
    }
    return relUrl;
  }
  return url;
}

export function isNumber(val: any) {
  const regPos = /^\d+(\.\d+)?$/; //非负浮点数
  const regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
  if(regPos.test(val) && regNeg.test(val)){
    return true;
  }else{
    return false;
  }
}

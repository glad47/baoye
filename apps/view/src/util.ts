import Cookies from "js-cookie";

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

export function isNumber(value: any) {
  return typeof value === "number" && !isNaN(value);
}


/**
 * 获取url参数
 * @param variable
 * @constructor
 */
export function getQueryVariable(variable: string) {
  const query = window.location.search.substring(1);
  const vars = query.split("&");
  for (let i=0;i<vars.length;i++) {
    const pair = vars[i].split("=");
    if(pair[0] == variable){return pair[1];}
  }
  return false;
}

export function checkEmail(email: any) {
  const reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
  return reg.test(email);
}

/**
 * 查询数组对象 某个键值出现的次数
 * @param arr
 * @param key
 * @param value
 */
export function getKeysNumForArr(arr: any, key: any, value: any) {
  let num: number = 0;
  if (Array.isArray(arr)) {
    num = arr.reduce((pre, cur) => {
      if (cur[key] === value) {
        pre++;
      }
      return pre;
    }, 0)
  }
  return num;
}

/**
 * 判断对象是否有空值
 * @param obj
 */
// @ts-ignore
export function hasNull(obj: any) {
  for (let key in obj) {
    if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
      return hasNull(obj[key]);
    } else {
      if (!obj[key]) {
        return true;
      }
    }
  }
  return false;
}

export function ArrayDiff(arr1: any, arr2: any, key: any) {
 const keys = arr1.map((item: any) => item[key]);
 const res = arr2.filter((item: any) => !keys.includes(item[key]));
 return res
}

// stencil 属性 和pcb订单对应
export function Fields_Stencil_PCB(array: any) {
  const _Match: any = {
    quantity: 'quantityPcs',
    totalStencilFee: 'subtotal',
    totalAssemblyFee: 'subtotal'
  }
  const res = array.reduce((pre: any, cur: any, index: number) => {
    Object.keys(cur).forEach((item: any) => {
      const m = _Match[item];
      if (m) {
        cur[m] = cur[item];
        // 删除原有属性
        // delete cur[item];
      }
    });
    pre.push(cur);
    return pre;
  }, []);
  return res;
}

export const MetaTips = {
  timer: null,
  step: 0,
  show(title: any) {
    timer = setTimeout(function () {
      MetaTips.show(title);
      MetaTips.step ++;
      if (MetaTips.step === 3) {MetaTips.step = 1};
      if (MetaTips.step === 1) {document.title = title};
      if (MetaTips.step === 2) {document.title = "(1) New Messages!"};
    }, 520)
  },
  clear(title?: any) {
    // @ts-ignore
    clearTimeout(timer);
    document.title = 'Buy PCB Online | PCB Online Quote | PCB Assembly Order - PCBONLINE'
  }
}

/**
 * 是否登录
 * @constructor
 */
export function IsLogin() {
  return Boolean(sessionStorage.getItem("username"));
}
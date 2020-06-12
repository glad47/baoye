/*
 * @Author: 
 * @Date: 2020-06-12 10:46:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-12 14:59:37
 * @Description: file content
 * @FilePath: /project/pcbonline-v2/apps/view/src/country/index.ts
 */

import imgArray from './image'

export function getCountryImg(country:any) {
    console.log(imgArray[country])
    return imgArray[country]
}
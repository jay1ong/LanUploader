export function longToByteArray(long) {
  var byteArray = [0, 0, 0, 0, 0, 0, 0, 0]
  for (var index = 0; index < byteArray.length; index++) {
    var byte = long & 0xff
    if (byte > 127) {
      byteArray[index] = -(~byte & 0xff) - 1
    } else {
      byteArray[index] = byte
    }
    long = (long - byte) / 256
  }
  return byteArray
}

/**
 * 获取文件部分md5
 * 头chunk+中部chunk+尾部chunk
 * chunks=1 只取chunk_head
 * chunks=2 只取chunk_head / chunk_tail
 * chunks>=3 取 head/mid/tail
 */
export function getFilePartMD5(file) {
  /**
   * 通常情况512为一个md5的chunk计算范围,故此取512bit作为chunk单位
   */
  const chunkSize = 512 / 8 // 512bit / 8 = 64bytes
  return new Promise((resolve, reject) => {
    const SparkMD5 = require('spark-md5')
    const spark = new SparkMD5.ArrayBuffer()
    const fileReader = new FileReader()
    const blobSlice =
      File.prototype.slice ||
      File.prototype.mozSlice ||
      File.prototype.webkitSlice
    const chunks = Math.ceil(file.size / chunkSize)
    const mid = Math.ceil(chunks / 2.0)
    // console.log('chunks', chunks)
    // console.log('mid', mid)
    let currentChunk = 0

    // 由于后端在linux上无法读取精确的毫秒数,所以手动丢失精度.但仍然使用 8位 long存储
    // let lastModifiedSec = file.lastModified / 1000 * 1000

    fileReader.onload = e => {
      // 已读取了第一快
      spark.append(e.target.result)
      if (chunks === 1) {
        // console.log(1, currentChunk)
        return resolve(spark.end())
      } else if (chunks === 2) {
        // 读取尾部
        // console.log(2, currentChunk)
        if (currentChunk === chunks - 1) {
          return resolve(spark.end())
        }
        currentChunk = chunks - 1
      } else {
        // console.log(3, currentChunk)
        if (currentChunk === chunks - 1) {
          return resolve(spark.end())
        }
        if (currentChunk === mid) {
          currentChunk = chunks - 1 // 最后一块
        } else {
          // 读取中间
          currentChunk = mid
        }
      }
      load()
    }
    fileReader.onerror = e => reject(e)

    let load = () => {
      var start = currentChunk * chunkSize
      var end = start + chunkSize >= file.size ? file.size : start + chunkSize
      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
    }

    load()
  })
}

export function getUploader(component, bind) {
  let parent = component.$parent
  while (parent) {
    if (bind) {
      if (parent.$refs[bind]) {
        return parent.$refs[bind]
      } else {
        parent = parent.$parent
      }
    } else {
      if (parent['lan-uploader']) {
        return parent['lan-uploader']
      } else {
        parent = parent.$parent
      }
    }
  }
  return null
}

export function each(ary, func, context) {
  if (typeof ary.length !== 'undefined') {
    for (var i = 0, len = ary.length; i < len; i++) {
      if (func.call(context, ary[i], i, ary) === false) {
        break
      }
    }
  } else {
    for (var k in ary) {
      if (func.call(context, ary[k], k, ary) === false) {
        break
      }
    }
  }
}

import ChunkUploadHandler from './ChunkUploadHandler'
// import {
//   default as request
//   createRequest,
//   sendFormRequest
// } from '../utils/request'

/**
 * 自定义的chunkUpload处理器
 */
export default class LanChunkUploadHandler extends ChunkUploadHandler {
  get startBody() {
    return {
      ...this.file.startBody,
      ...this.file.data
    }
  }

  get uploadBody() {
    return {
      ...this.file.uploadBody,
      ...this.file.data
    }
  }

  get finishBody() {
    return {
      ...this.file.finishBody,
      ...this.file.data
    }
  }

  /**
   * 过滤已上传过的 chunks
   */
  get filterChunks() {
    if (this.file.uploadedChunks) {
      return this.file.uploadedChunks.join(',')
    } else {
      return []
    }
  }

  /**
   * Updates the progress of the file with the handler's progress
   */
  updateFileProgress() {
    // this.file.uploader.update(this.file, { progress: this.progress })
    this.file.progress = this.progress
    this.file.uploader.refreshProgress()
  }

  /**
   * Creates all the chunks in the initial state
   */
  createChunks() {
    this.chunks = []

    let start = 0
    let end = this.chunkSize
    let index = 0 // chunk序号
    while (start < this.fileSize) {
      if (this.filterChunks.indexOf(index) !== -1) {
        // 过滤
        start = end
        end = start + this.chunkSize
        index++
        continue
      }
      this.chunks.push({
        blob: this.file.file.slice(start, end),
        startOffset: start,
        active: false,
        retries: this.maxRetries,
        index: index
      })
      start = end
      end = start + this.chunkSize
      index++
    }
  }
}

import ChunkUploadHandler from './ChunkUploadHandler'

export default class LanChunkUploadHandler extends ChunkUploadHandler {
  get startBody() {
    return this.file.startBody || {}
  }
  get uploadBody() {
    return this.file.uploadBody || {}
  }
  get finishBody() {
    return this.file.finishBody || {}
  }

  /**
   * Updates the progress of the file with the handler's progress
   */
  updateFileProgress() {
    this.file.uploader.update(this.file, { progress: this.progress })
    // this.file.progress = this.progress
  }
}

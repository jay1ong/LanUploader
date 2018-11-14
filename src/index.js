import FileUpload from './components/FileUpload.vue'
import Button from './components/Button.vue'

const uploader = {
  version: '2.8.20',
  install,
  FileUpload,
  Button
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}

export default uploader

function install(Vue) {
  if (install.installed) {
    return
  }
  Vue.component(FileUpload.name, FileUpload)
  Vue.component(Button.name, Button)
}

// module.exports = require('./FileUpload.vue')

<template>
  <button 
    class="el-button uploader-btn" 
    @click="handleClick" 
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus" 
    :type="nativeType"
    :class="[
      type ? 'el-button--' + type : '',
      buttonSize ? 'el-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      },
      this.uploader.features.html5 ? 'file-uploads-html5' : 'file-uploads-html4',
      this.uploader.features.directory && this.directory ? 'file-uploads-directory' : undefined,
      this.uploader.features.drop && this.uploader.drop ? 'file-uploads-drop' : undefined,
    ]">
    <i class="el-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
    <input-file></input-file>
  </button>
</template>

<script>
import { getUploader } from '../utils/utils.js'
import InputFile from './InputFile.vue'

export default {
  name: 'uploader-btn',
  components: {
    InputFile
  },
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },
  props: {
    bind: {
      type: String,
      default: 'upload'
    },
    directory: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
    },
    capture: {
    },
    // el-button ///////////////////
    type: {
      type: String,
      default: 'default'
    },
    size: String,
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean
  },
  data() {
    return {
      uploader: getUploader(this, this.bind)
    }
  },
  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize
    },
    buttonSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
    },
    buttonDisabled() {
      return this.disabled || (this.elForm || {}).disabled
    }
  },
  methods: {
    handleClick(evt) {
      if (this.buttonDisabled) {
        if (evt.preventDefault) {
          evt.preventDefault()
          return false
        }
        return false
      }
      let input = this.$el.querySelector('input')
      input.click()
      this.$emit('click', evt)
    }
  }
}
</script>
<style>
.uploader-btn.file-uploads-html4 input[type='file'],
.uploader-btn.file-uploads-html5 label {
  /* background fix ie  click */
  background: #fff;
  opacity: 0;
  font-size: 20em;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  width: 100%;
  height: 100%;
}
.uploader-btn.file-uploads-html5 input[type='file'],
.uploader-btn.file-uploads-html4 label {
  /* background fix ie  click */
  background: rgba(255, 255, 255, 0);
  overflow: hidden;
  position: fixed;
  width: 1px;
  height: 1px;
  z-index: -1;
  opacity: 0;
}
</style>

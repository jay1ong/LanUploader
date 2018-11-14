<template>
  <!-- <input type="file" :name="$parent.name" :id="$parent.inputId || $parent.name" :accept="$parent.accept" :capture="$parent.capture"
    @change="change" :webkitdirectory="$parent.directory && $parent.features.directory" :directory="$parent.directory && $parent.features.directory"
    :multiple="$parent.multiple && $parent.features.html5" /> -->
  <!--  -->
  <input type="file" v-if="$parent.uploader" @change="change" :accept="$parent.accept" :capture="$parent.capture" :webkitdirectory="$parent.directory && $parent.uploader.features.directory" :directory="$parent.directory && $parent.uploader.features.directory"
    :multiple="$parent.multiple && $parent.uploader.features.html5" />
</template>
<script>
export default {
  name: 'input-file',
  methods: {
    change(e) {
      this.$parent.uploader.addInputFile(e.target).then(() => {
        e.target.value = ''
        if (!e.target.files) {
          // ie9 fix #219
          this.$destroy()
          // eslint-disable-next-line
          new this.constructor({
            parent: this.$parent,
            el: this.$el,
          })
        }
      })
    }
  }
}
</script>

<template>
  <div class="notes">
    <div
      class="note"
      :class="[{ full: !grid}, elem.selected]"
      v-for="(elem, index) in notes"
      :key="index"
    >
      <span class="closer" @click="removeNote(index)">&times;</span>

      <div class="note-header">
        <div v-show="elem.edit == false">
          <h2 @click="elem.edit = true">{{elem.title}}</h2>
        </div>
        <input
          v-show="elem.edit == true"
          v-model="elem.title"
          @blur="close(elem)"
          @keyup.esc="close(elem)"
          @keyup.enter="close(elem)"
        />
      </div>

      <div class="note-body">
        <div v-show="elem.edit == false">
          <p @click="elem.edit = true">{{ elem.descr }}</p>
        </div>
        <textarea
          v-show="elem.edit == true"
          v-model="elem.descr"
          @blur="close(elem)"
          @keyup.esc="close(elem)"
        ></textarea>

        <div v-show="elem.edit == false">
          <h2 @click="elem.edit = true">{{elem.date}}</h2>
        </div>
        <input
          type="date"
          v-show="elem.edit == true"
          v-model="elem.date"
          @blur="close(elem)"
          @keyup.esc="close(elem)"
          @keyup.enter="close(elem)"
        />

        <br />
        <br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notes: {
      type: Array,
      required: true
    },
    grid: {
      type: Boolean,
      required: true
    }
  },

  methods: {
    // removeNote(index) {
    //   this.$emit("remove", index);
    // },
removeNote(index){
  this.$store.dispatch('removeNote', index)
},

    close(elem) {
      elem.edit = false;
      $emit("update");
    }
  }
};
</script>
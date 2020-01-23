<template>
  <div>
    <div class="new-note">
      <label>Title</label>
      <input v-model="note.title" type="text" />
    </div>
    <label>Description</label>
    <textarea v-model="note.descr" cols="5" rows="2"></textarea>
    <div>Important your note
        <select v-model="note.selected">
            <option v-for='(item, i) in note.select' :value="item" :key="i">{{item}}</option>
        </select>
    </div>
    <button @click="addNote" class="btn btnPrimary">New note</button>
  </div>
</template>

<script>
export default {
  props:{
    note:{
      type: Object,
      required: true
    }
  },
  methods:{
    addNote(){
      this.$emit('addNote', this.note)
    }
  }
}
</script>
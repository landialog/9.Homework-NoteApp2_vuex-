<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <section>
        <div class="container">
          <!-- message error -->
          <msg :propmsg="message" v-if="message" />
          <!--new note -->
          <newNote :note="note" @addNote="addNote" />
          <div class="note-header">
            <h1 class="title">{{ title }}</h1>
            <!-- search -->
            <search :value="search" placeholder="Find your note" @search="search = $event" />
            <div class="icons">
              <svg
                :class="{ active: grid }"
                @click="toggleGrid('grid')"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              <svg
                :class="{ active: !grid }"
                @click="toggleGrid('column')"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3" y2="6" />
                <line x1="3" y1="12" x2="3" y2="12" />
                <line x1="3" y1="18" x2="3" y2="18" />
              </svg>
            </div>
          </div>
          <!--note list -->
          <notes :notes="notesFilter"  :grid="grid" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import msg from "@/components/Message";
import newNote from "@/components/NewNote";
import notes from "@/components/Notes";
import search from "@/components/Search";

export default {
  components: {
    msg,
    newNote,
    notes,
    search
  },

  data() {
    return {
      search:''
    }
  },

  computed: {
    grid() {
     return this.$store.getters.getGrid;
    },

    message() {
      return this.$store.getters.getMessage;
    },

    title() {
      return this.$store.getters.getTitle;
    },

    note() {
      return this.$store.getters.getNote;
    },

    notes() {
      return this.$store.getters.getNotes;
    },

    notesFilter() {
      let notes = this.notes;
      let search = this.search;
      if (search === "") return notes;

      search = search.trim().toLowerCase();
      notes = notes.filter(function(item) {
        if (item.title.toLowerCase().indexOf(search) !== -1) {
          return item;
        }
      });
      return notes;
    }
  },

  methods: {
    addNote() {
      this.$store.dispatch("addNote", this.note);
    },

    toggleGrid(param) {
     this.$store.dispatch("toggleGrid", param);
    }
  }
};
</script>

<style lang="scss">
.notes {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 40px 0;
}

.note {
  width: 49%;
  padding: 16px 20px;
  margin-bottom: 20px;
  background-color: #fff;
  position: relative;
  &:hover {
    box-shadow: 0 20px 20px grba(0, 0, 0, 0.4);
    transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
    transform: translate(0, -5px);
    transition-delay: 0s !important;
  }
  &.full {
    width: 100%;
  }
}

.closer {
  font-size: 40px;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  line-height: 35px;
  margin-right: 3px;
  font-weight: 300;
  color: #060886;
}

.note-header {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1,
  h2 {
    color: #060886;
  }
  h2 {
    font-size: 22px;
  }
  p {
    font-size: 22px;
    color: #2b2929;
  }
}

.icons {
  svg {
    cursor: pointer;
    color: #5c5a5a;
    &.active {
      color: #060886;
    }
  }
}

.note-body {
  p {
    margin: 20px 0;
  }
  span {
    font-size: 14px;
    color: #6d6969;
  }
}

.normal {
  border: 2px solid green;
}

.warning {
  border: 2px solid yellow;
}

.danger {
  border: 2px solid red;
}
</style>


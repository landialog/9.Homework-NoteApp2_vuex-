import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: "This is App notes",
    edit: false,
    message: null,
    grid: true,
    //search: "",
    note: {
      title: "",
      descr: "",
      selected: "normal",
      select: ["normal", "warning", "danger"]
    },

    notes: [{
        title: "Первый заголовок",
        descr: "Заметка и ее небольшой текст",
        date: new Date(Date.now()).toLocaleString(),
        selected: "",
        edit: false
      },
      {
        title: "Второй заголовок",
        descr: "Заметка и ее небольшой текст",
        date: new Date(Date.now()).toLocaleString(),
        selected: "",
        edit: false
      },
      {
        title: "Третий заголовок",
        descr: "Заметка и ее небольшой текст",
        date: new Date(Date.now()).toLocaleString(),
        selected: "",
        edit: false
      }
    ]
  },

  mutations: {
    addNote(state, payload) {
      let {title, descr, selected, edit} = state.note;
      if (title === "") {
        state.message = "This is place can't be blank";
        return false;
      }

      state.notes.push({
        title: title,
        descr: descr,
        selected: selected,
        date: new Date(Date.now()).toLocaleString(),
        edit: false
      });

      state.message = null;
      state.note.title = "";
      state.note.descr = "";
      state.note.selected = "normal";
    },


    removeNote(state, index) {
      state.notes.splice(index, 1);
    },

    toggleGrid(state, param) {
      param === "grid" ? (state.grid = true) : (state.grid = false);
    },
     
  },

  actions: {
    addNote({commit}, payload) {
      commit('addNote', payload)
    },

   removeNote({commit}, payload){
     commit('removeNote', payload)
   },

   toggleGrid({commit}, payload){
     commit('toggleGrid', payload)
   },


  },

  getters: {
    getMessage: (state) => state.message,
    getTitle: (state) => state.title,
    getNote: (state) => state.note,
    getNotes: (state) => state.notes,
    getGrid: (state) => state.grid
  },



})
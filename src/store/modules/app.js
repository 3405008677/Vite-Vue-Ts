import { defineStore } from "pinia";

export default defineStore("app", {
  state: () => {
    return {
      counter: 1
    }
  }
})
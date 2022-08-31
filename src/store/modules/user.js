import { defineStore } from "pinia";

export default defineStore("user", {
  state: () => {
    return {
      counter: 1
    }
  }
})
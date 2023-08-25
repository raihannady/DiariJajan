import { defineStore } from "pinia";
import axios from "axios";

export const useDataStore = defineStore("data", {
  state: () => ({
    datas: [],
  }),
  actions: {
    async fetchData() {
      try {
        const response = await axios.get(
          "https://649ab98dbf7c145d023960e3.mockapi.io/detail"
        );
        this.datas = response.data;
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    },
  },
});

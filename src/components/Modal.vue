<template>
  <div
    v-if="show"
    class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50"
  >
    <div class="modal-overlay absolute inset-0 bg-gray-900 opacity-50"></div>
    <div
      class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"
    >
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          @click.prevent="closeModal"
          type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="px-6 py-6 lg:px-8">
          <h3
            class="mb-4 text-xl font-medium text-gray-900 dark:text-white text-left"
          >
            Tambah Entri
          </h3>
          <form class="space-y-6" method="post" @submit.prevent="handleSubmit">
            <div>
              <label
                class="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                >Nama</label
              >
              <input
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                name="nama"
                v-model="todo.nama"
              />
            </div>
            <div>
              <label
                class="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                >Harga</label
              >
              <input
                type="number"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                name="pengeluaraan"
                v-model="todo.pengeluaraan"
              />
            </div>
            <div>
              <label
                class="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                >Jam</label
              >
              <input
                type="time"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                name="jam"
                v-model="todo.jam"
              />
            </div>
            <div>
              <label
                class="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                >Tanggal</label
              >
              <input
                type="date"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                name="tanggal"
                v-model="todo.tanggal"
              />
            </div>
            <button
              type="submit"
              class="w-full text-white bg-indigo-800 hover:bg-indigo-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Tambah Item
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import axios from "axios";
import { useDataStore } from "@/stores/DataStore";

const dataStore = useDataStore();
const { show } = defineProps(["show"]);
const emits = defineEmits(["close"]);

const todo = reactive({
  nama: "",
  pengeluaraan: null,
  jam: "",
  tanggal: "",
});

const clearInput = async () => {
  todo.nama = "";
  todo.pengeluaraan = 0;
  todo.jam = "";
  todo.tanggal = "";
};

const closeModal = () => {
  emits("close");
  clearInput();
};

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await axios.post(
      "https://649ab98dbf7c145d023960e3.mockapi.io/detail",
      todo
    );
    dataStore.fetchData();
    closeModal();
  } catch (error) {
    console.error("Terjadi kesalahan saat mengirim data:", error);
  }
};
</script>

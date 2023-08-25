<template>
  <div class="text-center leading-9">
    <h1 class="text-3xl font-semibold">Diari Jajan Tahun 2023</h1>
    <h1 class="my-2">
      Pengeluaran Tahun Ini <b>Rp. {{ formatCurrency(totalPengeluaran) }}</b>
    </h1>
    <button
      @click="showModal"
      class="text-white rounded px-5 bg-indigo-800 hover:bg-indigo-900"
    >
      Tambah Item
    </button>

    <Modal :show="isModalVisible" @close="closeModal"></Modal>
  </div>
  <Card></Card>
</template>

<script setup>
import { ref, computed } from "vue";
import Modal from "../components/Modal.vue";
import Card from "../components/Card.vue";
import { useDataStore } from "@/stores/DataStore";
import { onMounted } from "vue";

const dataStore = useDataStore();

const isModalVisible = ref(false);

const showModal = () => {
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

const totalPengeluaran = computed(() => {
  return calculateTotal(dataStore.datas);
});

const calculateTotal = (items) => {
  return items.reduce((total, item) => total + item.pengeluaraan, 0);
};

const formatCurrency = (amount) => {
  return amount.toLocaleString("id-ID");
};

onMounted(async () => {
  dataStore.fetchData();
});
</script>

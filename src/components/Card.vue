<template>
  <div class="my-2 flex flex-wrap justify-center">
    <div
      class="w-100% sm:w-1/2 md:w-1/4 p-7 m-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      v-for="(items, tanggal) in groupedData"
      :key="tanggal"
    >
      <div class="flex items-center justify-between mb-4">
        <h5
          class="text-xl font-bold leading-none text-gray-900 dark:text-white"
        >
          {{ formatDate(tanggal) }}
        </h5>
      </div>
      <div class="flow-root" v-if="items">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
          <li class="py-3" v-for="(item, index) in items" :key="index">
            <div class="flex items-center space-x-4">
              <div class="inline-flex">
                <p class="text-sm text-gray-900 dark:text-white">
                  {{ item.jam }}
                </p>
              </div>
              <div class="text-sm flex-1 items-center text-gray-900">
                {{ item.nama }}
              </div>
              <div
                class="text-sm inline-flex items-center text-gray-900 dark:text-white"
              >
                Rp. {{ formatCurrency(item.pengeluaraan) }}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="h-0.5 bg-black"></div>
      <div class="flex text-right items-center justify-between mb-4 py-2">
        <h1 class="flex-1 items-center font-bold text-gray-900 dark:text-white">
          Total
        </h1>
        <h1 class="flex-1 items-center font-bold text-gray-900 dark:text-white">
          Rp. {{ formatCurrency(calculateTotal(items)) }}
        </h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDataStore } from "@/stores/DataStore";
import { computed, onMounted } from "vue";

const dataStore = useDataStore();

const groupedData = computed(() => {
  const grouped = {};
  dataStore.datas.forEach((item) => {
    const tanggal = item.tanggal;
    if (!grouped[tanggal]) {
      grouped[tanggal] = [];
    }
    grouped[tanggal].push(item);
  });

  const sortedDates = Object.keys(grouped).sort((a, b) => {
    return new Date(b) - new Date(a);
  });

  const sortedGroupedData = {};
  sortedDates.forEach((tanggal) => {
    // Mengurutkan item berdasarkan jam dalam urutan menaik
    sortedGroupedData[tanggal] = grouped[tanggal].sort((a, b) => {
      // Mengonversi jam menjadi objek Date
      const dateA = new Date(`1970-01-01T${a.jam}`);
      const dateB = new Date(`1970-01-01T${b.jam}`);
      return dateA - dateB;
    });
  });

  return sortedGroupedData;
});

const calculateTotal = (items) => {
  return items.reduce((total, item) => total + item.pengeluaraan, 0);
};

const formatCurrency = (amount) => {
  return amount.toLocaleString("id-ID");
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", options);
};

onMounted(async () => {
  dataStore.fetchData();
});
</script>

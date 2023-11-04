<template>
  <div>
    <canvas ref="BarChart" width="600" height="400"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';
import Chart from 'chart.js/auto'; // Import Chart.js


    const BarChart = ref(null);
    const {chartData:chart} = defineProps(['chartData'])
const {labels:chartLabels, data:graphData} = chart




    onMounted(() => {
      const ctx = BarChart.value.getContext('2d');
      // Example data: replace this with your API data
      const data = {
        labels: chartLabels, // Months
        datasets: [
          {
            label: 'Number of Transactions',
            data: graphData, // Number of transactions
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ]
      };

      new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });

   // return { BarChart };
  //}
//};
</script>

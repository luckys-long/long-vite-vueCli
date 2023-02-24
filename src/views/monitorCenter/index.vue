<template>
    <div>
      <div style="padding:10px 13px" class="circle-wrap">
        <div class="myChart">
            <my-ecarts :options="options"></my-ecarts>
          </div>
          <div class="myChart">
            <my-ecarts :options="options"></my-ecarts>
          </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import {ref, onMounted } from "vue";
  import MyEcarts from '@/components/myEchart.vue';
  const options=ref({
    title: {
      text: '圆环图的例子',
      left: 'center',
      top: 'center'
    },
    series: [
      {
        type: 'pie',
        data: [
          {
            value: 335,
            name: 'A'
          },
          {
            value: 234,
            name: 'B'
          },
          {
            value: 1548,
            name: 'C'
          }
        ],
        radius: ['40%', '70%']
      }
    ]
  })
  
  </script>
  
  <style>
  .myChart{
     width: 580px;
     height: 300px;
  }
  .circle-wrap{
    display: flex;
    justify-content: space-between;
  }
  </style>
  
<template>
  <div>
    <div style="padding: 10px 13px" class="circle-wrap">
      <div class="myChart">
        <my-ecarts :options="options" ></my-ecarts>
      </div>
    </div>
  </div>
</template>

<script setup >
import { ref } from "vue";
import MyEcarts from "@/components/myEchart.vue";
import { getNodeInfo } from '@/api/iot'
import { useRoute } from 'vue-router';

const route =useRoute()
const options = ref({
  tooltip: {
    trigger: "item",
    triggerOn: "mousemove",
    formatter: (item) => {
      let tipsHtml =
        "名称：" +
        item.value.nodeName +
        "<br/>状态: " +
        (item.value.nodeStatus == 1 ? "在线" : "离线") +
        "<br/>ip地址: " +
        item.value.nodeIp;
      return tipsHtml;
    },
  },
  series: [
    {
      type: "tree",
      id: 0,
      name: "tree1",
      data: [],
      top: "10%",
      left: '8%',
      bottom: "22%",
      right: "15%",
      symbolSize: 10,
      symbol: "circle",
      edgeShape: "polyline",
      edgeForkPosition: "63%",
      initialTreeDepth: 3,
      lineStyle: {
        width: 2,
      },
      label: {
        position: "right",
        verticalAlign: "middle",
        fontSize: 14,
        align: "left",
      },
      leaves: {
        label: {
          position: "right",
          verticalAlign: "middle",
          align: "left",
          // overflow: 'break',//break为文字折行，  truncate为文字超出部分省略号显示
          // lineOverflow: 'truncate',//文字超出高度后 直接截取
        },
      },
      emphasis: {
        focus: "descendant",
      },
      expandAndCollapse: true,
      animationDuration: 550,
      animationDurationUpdate: 750,
    },
  ],
});
const initData= async ()=>{
  const { params } = route;
  const res =await getNodeInfo({target:params?.nodeName})
  options.value.series[0].data=[res]
}
initData()
</script>
<style>

.myChart {
  width: 98%;
  height: 800px;
}
.circle-wrap {
  display: flex;
  justify-content: space-between;
}
</style>

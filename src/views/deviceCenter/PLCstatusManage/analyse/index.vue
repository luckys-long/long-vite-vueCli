<template>
  <div>
    <div style="padding: 10px 13px" class="circle-wrap">
      <div class="myChart">
        <my-ecarts :options="options" ref=""></my-ecarts>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MyEcarts from "@/components/myEchart.vue";

const data = {
  name: "iot创新管理平台",
  value: {
    nodeIp: "159.75.108.94",
    nodeLevel: 0,
    nodeName: "iot创新管理平台",
    nodeParent: "",
    nodeStatus: 1,
    nodeSuggest: "请联系系统管理员",
  },
  children: [
    {
      name: "cs1",
      value: {
        nodeName: "cs1",
        nodeParent: "iot创新管理平台",
        nodeLevel: 1,
        nodeIp: "192.168.3.95",
        nodeSuggest: "",
        nodeStatus: 0,
      },
      children: [],
    },
    {
      name: "cs2",
      value: {
        nodeName: "cs2",
        nodeParent: "iot创新管理平台",
        nodeLevel: 1,
        nodeIp: "192.168.3.95",
        nodeSuggest: "",
        nodeStatus: 0,
      },
      children: [],
    },
    {
      name: "cs3",
      value: {
        nodeName: "cs3",
        nodeParent: "iot创新管理平台",
        nodeLevel: 1,
        nodeIp: "192.168.3.95",
        nodeSuggest: "",
        nodeStatus: 0,
      },
      children: [],
    },
    {
      name: "cs4",
      value: {
        nodeName: "cs4",
        nodeParent: "iot创新管理平台",
        nodeLevel: 1,
        nodeIp: "192.168.3.95",
        nodeSuggest: "",
        nodeStatus: 0,
      },
      children: [],
    },
    {
      name: "cs5",
      value: {
        nodeName: "cs5",
        nodeParent: "iot创新管理平台",
        nodeLevel: 1,
        nodeIp: "192.168.0.232",
        nodeSuggest: "",
        nodeStatus: 0,
      },
      children: [],
    },
    {
      name: "cs6",
      value: {
        nodeName: "cs6",
        nodeParent: "iot创新管理平台",
        nodeLevel: 1,
        nodeIp: "127.0.0.1",
        nodeSuggest: "",
        nodeStatus: 1,
      },
      children: [],
    },
    {
      name: "cs7",
      value: {
        nodeName: "cs7",
        nodeParent: "iot创新管理平台",
        nodeLevel: 1,
        nodeIp: "127.0.0.1",
        nodeSuggest: "",
        nodeStatus: 1,
      },
      children: [],
    },
  ],
};

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
      data: [data],
      top: "10%",
      left: "18%",
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

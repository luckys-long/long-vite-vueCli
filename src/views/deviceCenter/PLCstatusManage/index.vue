<template>
  <div class="search-wrap">
    <MyForm :formData="formData" :formColumns="formColumns"> </MyForm>
  </div>
  <div>
    <el-button :icon="Plus" @click="() => (isShow = true)">添加</el-button>
    <el-button :icon="PieChart">一键分析</el-button>
  </div>

  <div>
    <MyTable
      class="table-wrap"
      :column="column"
      :data="list"
      :header-cell-style="{ 'text-align': 'left' }"
      tooltip-effect="dark"
      show-overflow-tooltip
    >
    </MyTable>
  </div>
  <Add
    :isShow="isShow"
    :before-close="beforeClose"
    :doAddHandle="doAddHandle"
    v-if="isShow"
  ></Add>
</template>

<script setup lang="ts">
import MyForm from "@/components/Form/index.vue";
import { ref } from "vue";
import MyTable from "@/components/Table";
import Add from "./components/add.vue";
import { ElButton } from "element-plus";
import { Plus, PieChart } from "@element-plus/icons-vue";

const list = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const isShow = ref(false);

const beforeClose = () => {
  isShow.value = false;
};
const doAddHandle = () => {
  // todo  请求列表
  isShow.value = false;
};

const column = [
  {
    prop: "id",
    label: "设备id",
  },
  {
    prop: "nodeName",
    label: "节点名称",
    showOverflowTooltip: true,
  },

  {
    prop: "ip",
    label: "IP地址",
  },
  {
    prop: "status",
    label: "状态",
  },
  {
    prop: "frequency",
    label: "检测频率",
  },
  {
    prop: "spacing",
    label: "记录间隔",
  },
  {
    prop: "onlineTime",
    label: "在线时长",
  },
  {
    prop: "操作",
    label: "状态",
  },
];
const formData = {
  name: "",
};
const formColumns = [
  {
    placeholder: "请输入设备名称/设备编码",
    label: "",
    prop: "name",
    tag: "Input",
    span: 6,
  },
];
</script>

<style></style>

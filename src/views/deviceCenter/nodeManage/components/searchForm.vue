<template>
  <div class="search-wrap">
    <MyForm :formData="formData" :formColumns="formColumns"></MyForm>
  </div>
</template>

<script setup lang="ts">
import MyForm from "@/components/Form/index.vue";

const formData = {
  name: "",
  status: "",
};
const formColumns = [
  {
    label: "节点名称",
    prop: "nodeName",
    placeholder: "请输入节点名称",
    tag: "Input",
    span: 4,
  },
  {
    label: "节点地址",
    prop: "nodeIp",
    placeholder: "请输入节点地址",
    tag: "Input",
    span: 4,
  },
  {
    label: "父节点",
    prop: "nodeParent",
    placeholder: "请输入父节点",
    tag: "Input",
    span: 4,
  },
  {
    label: "节点状态",
    prop: "请选择节点状态",
    placeholder: "",
    span: 4,
    offset: 1,
    tag: "Select",
    options: [
      { value: "0", label: "离线" },
      { value: "1", label: "在线" },
    ],
  },
];
</script>

<style></style>

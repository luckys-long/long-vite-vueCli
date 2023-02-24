<template>
    <div class="search-wrap">
    <MyForm :formData="formData" :formColumns="formColumns"></MyForm>
  </div>
</template>
    
<script setup lang='ts'>
    import MyForm from "@/components/Form/index.vue";

const formData = {
  name: "",
  status: "",
};
const formColumns = [
  {
    placeholder: "请输入设备名称/设备编码",
    label: "",
    prop: "name",
    tag: "Input",
    span: 4,
  },
  {
    placeholder: "请输入设备状态",
    label: "",
    prop: "status",
    span: 4,
    offset: 1,
    tag: "Select",
    options:[{value:'0',label:'离线'},{value:'1',label:'在线'}]
  },
];

</script>
    
<style>

</style>
<template>
  <div style="margin-top: 10px">
    <MyForm :formData="formData" :formColumns="formColumns"></MyForm>
  </div>
  <el-button :icon="Plus" @click="handleAdd">分类</el-button>
  <MyTable
    :column="column"
    :data="list"
    :header-cell-style="{ 'text-align': 'left' }"
    tooltip-effect="dark"
    show-overflow-tooltip
  >
    <template #opt="{ row }">
      <div>
        <el-button type="text" @click="handleEdit(row)">编辑</el-button>
        <el-button type="text" style="color: red">删除</el-button>
      </div>
    </template>
  </MyTable>
  <pagination
    :total="totalPage"
    :current-page="currentPage"
    @current-change="currentChange"
    @size-change="sizeChange"
  />
  <Add
    :isShow="isShow"
    :before-close="beforeClose"
    :doAddHandle="doAddHandle"
    :title="title"
    :name="name"
    v-if="isShow"
  ></Add>
</template>

<script setup>
import { ref } from "vue";
import MyTable from "@/components/Table";
import Pagination from "@/components/Pagination.vue";
import { ElButton } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import MyForm from "@/components/Form/index.vue";
import Add from "./components/add.vue";

const isShow = ref(false);
const formData = ref({
  name: "",
});

const title = ref("新增分类");
// 编辑名称
const name = ref("");
const formColumns = [
  {
    placeholder: "请输入分类名称",
    label: "",
    prop: "name",
    tag: "Input",
    span: 6,
  },
];

const list = ref([{ name: "zhangsan" }, { name: "李四" }, { name: "王五" }]);
const currentPage = ref(1);
const pageSize = ref(10);
const totalPage = ref(0);

const handleEdit = (row) => {
  title.value = `编辑分类-${row.name}`;
  name.value = row.name;
  isShow.value = true;
};
const currentChange = (i) => {
  currentPage.value = i;
};

const sizeChange = (size) => {
  pageSize.value = size;
};

const handleAdd = () => {
  title.value = "新增分类";
  name.value = "";
  isShow.value = true;
};
const beforeClose = () => {
  isShow.value = false;
};
const doAddHandle = () => {
  // todo  请求列表
  isShow.value = false;
};
const column = [
  {
    prop: "name",
    label: "分类名称",
    showOverflowTooltip: true,
    align: "left",
  },
  {
    label: "操作",
    slotName: "opt",
    width: 150,
  },
];
</script>

<style></style>

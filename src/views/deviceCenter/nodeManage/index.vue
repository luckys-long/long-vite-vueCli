<template>
  <div>
    <SearchForm></SearchForm>
    <div style="margin-bottom: 10px">
      <el-button :icon="Plus" @click="handleAddNode">添加节点</el-button>
    </div>
    <MyTable
      class="table-wrap"
      :column="column"
      :data="tableDataList"
      :header-cell-style="{ 'text-align': 'left' }"
      tooltip-effect="dark"
      show-overflow-tooltip
    >
      <template #size="{ row }">
        {{ getfilesize(row.fileSize) }}
      </template>
      <template #opt="{ row }">
        <div class="opt-wrap">
          <el-button size="small" @click="handleCheck(row)"> 检测 </el-button>
          <el-button size="small" @click="handleView(row)"> 查看 </el-button>
          <el-button size="small" @click="handleEdit(row)"> 编辑 </el-button>
          <el-button size="small" type="danger" @click="handleDel(row)">
            删除
          </el-button>
        </div>
      </template>
    </MyTable>
    <Pagination
      :total="totalPage"
      :current-page="currentPage"
      @current-change="pageChange"
      @size-change="sizeChange"
    />
  </div>
  <Add
    :isShow="isShow"
    :before-close="beforeClose"
    :doAddHandle="doAddHandle"
    :title="title"
    :details="rowInfo"
    v-if="isShow"
  ></Add>
</template>

<script setup>
import { ref } from "vue";
import { ElButton, ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import useNodeManageList from "./useList";
import { getfilesize, } from "@/hooks/useFile";
import { useRouter } from "vue-router";
import { delNode } from "@/api/iot";

import Add from "./components/add.vue";
import MyTable from "@/components/Table";
import SearchForm from "./components/searchForm.vue";
import Pagination from "@/components/Pagination.vue";

const isShow = ref(false);
const rowInfo = ref({});
const title = ref("添加节点");
const router = useRouter();

const { getList, tableDataList, totalPage, currentPage, loading } = useNodeManageList();

getList(1);

const beforeClose = () => {
  isShow.value = false;
};
const doAddHandle = () => {
  // todo  请求列表
  isShow.value = false;
};

const handleAddNode = () => {
  rowInfo.value = {};
  isShow.value = true;
};

const handleCheck = (row) => {

};

const handleView = (row) => {
  router.push(`/device/analyse/${row.nodeName}`);
};

const handleDel = async (row) => {
  const res = await delNode({ nodeName: row.nodeName });
  if (res) {
    ElMessage({
      message: "删除成功",
      type: "success",
    });
    getList(1);
  }
};
const pageChange = (i) => {
  currentPage.value = i;
  console.log("当前page==》", i);
};

const sizeChange = (size) => {
  console.log("当前size==》", size);
};

const handleEdit = (row) => {
  title.value = `修改节点`;
  rowInfo.value = row;
  isShow.value = true;
};

const column = [
  {
    prop: "nodeName",
    label: "节点名称",
    showOverflowTooltip: true,
  },

  {
    prop: "nodeIp",
    label: "节点IP地址",
    showOverflowTooltip: true,
  },

  {
    prop: "nodeParent",
    label: "父节点",
  },
  {
    prop: "nodeStatus",
    label: "节点状态",
    // slotName: "status",
  },
  {
    prop: "nodeSuggest",
    label: "节点描述",
  },
  {
    label: "操作",
    slotName: "opt",
  },
];
</script>

<style></style>

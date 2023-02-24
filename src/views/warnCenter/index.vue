<template>
  <div class="search-wrap" >
    <MyForm :formData="formData" :formColumns="formColumns" ></MyForm>
  </div>
  <div class="alert-warp">
    <el-alert :title="tipMessage" type="info" show-icon />
  </div>
  <MyTable
    class="table-wrap"
    :column="column"
    :data="list"
    tooltip-effect="dark"
    show-overflow-tooltip
  >
    <template #status="{ row }">
      <div>
        <el-tag class="ml-2" type="info" style="margin-left: 5px">{{
          row.status
        }}</el-tag>
      </div>
    </template>
    <template #warnInfo="{ row }">
      <div>
        <el-tag
          v-for="item in row?.warnInfo"
          class="ml-2"
          type="info"
          :key="item"
          style="margin-left: 5px"
          >{{ item }}</el-tag
        >
      </div>
    </template>
    <template #opt>
      <div>
        <el-button> 一键修复 </el-button>
      </div>
    </template>
  </MyTable>
  <pagination
    :total="totalPage"
    :current-page="currentPage"
    @current-change="currentChange"
    @size-change="sizeChange"
  />
</template>

<script setup>
import MyForm from "@/components/Form/index.vue";
import MyTable from "@/components/Table";
import Pagination from "@/components/Pagination.vue";
import { ElAlert, ElButton, ElTag } from "element-plus";

import { ref } from "vue";

const list = ref([
  {
    name: "zhangsan",
    warnInfo: ["内存满", "以太网异常", "掉卡", "Modem无服务"],
    status: "离线",
  },
  { name: "李四", warnInfo: ["内存满", "以太网异常", "掉卡"], status: "离线" },
  { name: "王五", warnInfo: ["内存满", "以太网异常", "掉卡"], status: "离线" },
]);
const tipMessage = "告警信息：已处理为绿色，未处理为红色，离线为灰色";
const currentPage = ref(1);
const pageSize = ref(10);
const totalPage = ref(0);

const currentChange = (i) => {
  currentPage.value = i;
};

const sizeChange = (size) => {
  pageSize.value = size;
};

const column = [
  {
    prop: "name",
    label: "设备编号",
    showOverflowTooltip: true,
  },
  {
    prop: "name",
    label: "设备名称",
    showOverflowTooltip: true,
  },
  {
    prop: "name",
    label: "状态",
    slotName: "status",
  },
  {
    prop: "name",
    label: "上报时间",
  },
  {
    prop: "warnInfo",
    label: "告警信息",
    slotName: "warnInfo",
    showOverflowTooltip: true,
  },
  {
    slotName: "opt",
    label: "操作",
    fixed: "right",
    width: 200,
  },
];

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

<style lang="scss">
.alert-warp {
  margin-bottom: 10px;
  .el-alert {
    background-color: #e6f7ff;
    border: 1px solid #91d5ff;
    color: rgba(0, 0, 0, 0.85);
    .el-icon {
      color: #1890ff;
    }
  }
}
.search-wrap {
  margin-top: 10px;
}
</style>

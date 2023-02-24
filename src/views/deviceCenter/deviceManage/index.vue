<template>
  <SearchForm></SearchForm>
  <ActionBar></ActionBar>
  <MyAlert :tipMessage="tipMessage" type="info" show-icon />
  <MyTable
    class="table-wrap"
    :column="column"
    :data="list"
    :header-cell-style="{ 'text-align': 'left' }"
    tooltip-effect="dark"
    show-overflow-tooltip
    @selection-change="handleSelectionChange"
  >
    <template #opt>
      <div class="opt-wrap">
        <el-button> 配置 </el-button>
        <el-button> 编辑 </el-button>
        <el-button> 删除 </el-button>
      </div>
    </template>
  </MyTable>
</template>

<script setup>
import MyTable from "@/components/Table";
import { ElButton } from "element-plus";
import MyAlert from "@/components/alert.vue";
import ActionBar from "./components/actionBar.vue"
import  SearchForm from "./components/searchForm.vue";
import { ref } from "vue";

const tipMessage = "说明：下载模版后，里面的设备分布地址(ID，名称)和设备分类(ID，名称)，按上面提供的填写，没有则新建设备分布地址和设备分类";
const list = ref([
  {
    deviceSn: "CY860_0001238BAE01",
    deviceName: "CY860_000123D9DD01",
    networkMode: "NR",
    updateTime: "2023-02-21 09:48:31",
  },
]);
const currentPage = ref(1);
const pageSize = ref(10);

const handleSelectionChange = (val) => {
  const seletedList = [];
  val.forEach((item) => {
    seletedList.push(item?.id);
  });
};

const column = [
  {
    type: "selection",
    width: 50,
  },
  {
    prop: "deviceSn",
    label: "设备编号",
    showOverflowTooltip: true,
  },
  {
    prop: "deviceName",
    label: "设备名称",
    showOverflowTooltip: true,
  },

  {
    prop: "size",
    label: "设备状态",
    slotName: "status",
  },
  {
    prop: "networkMode",
    label: "当前网络模式",
  },
  {
    prop: "mimetype",
    label: "接收功率",
  },
  {
    prop: "mimetype",
    label: "信噪比",
  },
  {
    prop: "updateTime",
    label: "设备IP",
    showOverflowTooltip: true,
  },
  {
    prop: "updateTime",
    label: "设备分类",
    showOverflowTooltip: true,
  },

  {
    prop: "updateTime",
    label: "修改时间",
    showOverflowTooltip: true,
  },
  {
    prop: "uploadStatus",
    label: "状态",
  },
  {
    slotName: "opt",
    label: "操作",
    fixed: "right",
    width: 240,
  },
];
</script>

<style lang="scss">
.opt-wrap {
  @include flexStart;
}
</style>

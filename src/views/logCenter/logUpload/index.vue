<template>
  <div>
    <SearchForm></SearchForm>
    <div style="margin-bottom: 10px">
      <el-button :icon="UploadFilled">批量上传</el-button>
    </div>
    <MyTable
      class="table-wrap"
      :column="column"
      :data="tableDataList"
      :header-cell-style="{ 'text-align': 'left' }"
      tooltip-effect="dark"
      show-overflow-tooltip
      @selection-change="handleSelectionChange"
    >
      <template #status="{ row }">
        <div class="opt-wrap">
          <el-tag class="ml-2" type="success" v-if="row?.deviceStatus === '1'"
            >在线</el-tag
          >
          <el-tag class="ml-2" type="info" v-else>离线</el-tag>
        </div>
      </template>
      <template #opt="{ row }">
        <div class="opt-wrap">
          <el-button
            :icon="ArrowUpBold"
            size="small"
            type="primary"
            v-if="row?.deviceStatus === '1'"
          >
            日志上传
          </el-button>
          <el-button :icon="ArrowUpBold" size="small" disabled v-else>
            日志上传
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
</template>

<script setup lang="ts">
import MyTable from "@/components/Table";
import Pagination from "@/components/Pagination.vue";
import SearchForm from "./components/searchForm.vue";
import { ElButton, ElTag } from "element-plus";
import {  UploadFilled, ArrowUpBold } from "@element-plus/icons-vue";
import uselogUploadList from './useList';

const { getList, tableDataList, totalPage, currentPage, loading } =uselogUploadList();
getList(1)

const list = [
  {
    deviceSn: "CY860_0001238BAE01",
    deviceName: "CY860_000123D9DD01",
    softwareVersion: "1.0.7",
    deviceStatus: "1",
    ip:'10.88.206.116',
    createTime: "2023-01-11 10:43:30",
  },
  {
    deviceSn: "CY860_0001238BAE01",
    deviceName: "CY860_000123D9DD01",
    softwareVersion: "1.0.7",
    deviceStatus: "0",
    ip:'10.88.206.116',
    createTime: "2023-01-11 10:43:30",
  },
];

const pageChange = (i) => {
  currentPage.value = i;
};

const sizeChange = (size) => {
  console.log(size);
};

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
    prop: "deviceStatus",
    label: "设备状态",
    slotName: "status",
    width: 120,
  },

  {
    prop: "softwareVersion",
    label: "设备分类",
    showOverflowTooltip: true,
  },
  {
    prop: "ip",
    label: "设备IP",
    showOverflowTooltip: true,
  },
  {
    prop: "createTime",
    label: "创建时间",
    showOverflowTooltip: true,
  },

  {
    slotName: "opt",
    label: "操作",
    fixed: "right",
    width: 105,
  },
];
</script>

<style></style>

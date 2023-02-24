<template>
  <div>
    <SearchForm></SearchForm>
    <div style="margin-bottom: 10px">
      <el-button :icon="Delete" @click="batchDel" type="danger">批量删除</el-button>
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
      <template #size="{ row }">
        {{ getfilesize(row.fileSize) }}
      </template>
      <template #opt="{ row }">
        <div class="opt-wrap">
          <el-button  size="small" @click="singleExport(row)" >
            导出
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

<script setup >
import { ref } from "vue";
import MyTable from "@/components/Table";
import SearchForm from "./components/searchForm.vue";
import Pagination from "@/components/Pagination.vue";
import { ElButton } from "element-plus";
import {  Delete } from "@element-plus/icons-vue";
import uselogManageList from './useList';
import { getfilesize,downloadByUrl } from '@/hooks/useFile'
import { batchDelLog } from '@/api/iot'


const seletedList=ref([])
const { getList, tableDataList, totalPage, currentPage, loading } =uselogManageList();

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


const handleSelectionChange = (val) => {
    seletedList.value=val
};

const  singleExport=(row)=>{
  downloadByUrl(`http://192.168.0.228:8001/minio/download/${row.realName}`)
}

const  batchDel= async ()=>{
  const res= await batchDelLog({logList:seletedList.value})
}
const pageChange = (i) => {
  currentPage.value = i;
  console.log("当前page==》",i);
};

const sizeChange = (size) => {
  console.log("当前size==》",size);
};

const column = [
  {
    type: "selection",
    width: 50,
  },

  {
    prop: "deviceId",
    label: "设备名称",
    showOverflowTooltip: true,
  },

  {
    prop: "fileName",
    label: "文件名称",
    showOverflowTooltip: true,
  },


  {
    prop: "fileSize",
    label: "文件大小",
    slotName:'size'
  },
  
  {
    prop: "fileUrl",
    label: "地址",
  },


  {
    prop: "createTime",
    label: "创建时间",
    showOverflowTooltip: true,
  },
  {
    prop: "realName",
    label: "真实名称",
  },
  {
   
    label: "操作",
    slotName:'opt'
  },
];
</script>

<style></style>

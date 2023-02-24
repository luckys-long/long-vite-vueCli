<template>
  <div>
    <div style="margin: 10px 0">
      <el-button :icon="UploadFilled" @click="dialogFormVisible=true">批量配置</el-button>
    </div>
    <MyTable
      class="table-wrap"
      :column="column"
      :data="list"
      :header-cell-style="{ 'text-align': 'left' }"
      tooltip-effect="dark"
      show-overflow-tooltip
      @selection-change="handleSelectionChange"
    >
      <template #switch="{ row }">
        <el-switch
          v-model="row.hisSwitch"
          class="ml-2"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          @change="handleRowSwitch"
        />
      </template>
      <template #opt="{ row }">
        <div class="opt-wrap">
          <el-button :icon="ArrowUpBold" size="small"> 日志配置 </el-button>
        </div>
      </template>
    </MyTable>
  </div>
    <DialogForm :isShow="dialogFormVisible" :before-close="()=>dialogFormVisible=false" v-if="dialogFormVisible"></DialogForm>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElButton, ElSwitch,ElMessage } from "element-plus";
import { UploadFilled, ArrowUpBold } from "@element-plus/icons-vue";
import MyTable from "@/components/Table";
import DialogForm from './components/dialogForm.vue'



const list = [
  {
    deviceSn: "CY860_0001238BAE01",
    deviceName: "CY860_000123D9DD01",
    softwareVersion: "1.0.7",
    deviceStatus: "1",
    ip: "10.88.206.116",
    createTime: "2023-01-11 10:43:30",
    hisSwitch: false,
  },
  {
    deviceSn: "CY860_0001238BAE01",
    deviceName: "CY860_000123D9DD01",
    softwareVersion: "1.0.7",
    deviceStatus: "0",
    ip: "10.88.206.116",
    createTime: "2023-01-11 10:43:30",
    hisSwitch: true,
  },
];

const dialogFormVisible = ref(false)



const handleSelectionChange = (val) => {
  const seletedList = [];
  val.forEach((item) => {
    seletedList.push(item?.id);
  });
};

const handleRowSwitch=(val)=>{
  console.log("val===>",val);
  ElMessage({
    message: '操作成功',
    type: 'success',
  })
  
}
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
    prop: "ip",
    label: "设备IP",
    showOverflowTooltip: true,
  },

  {
    prop: "softwareVersion",
    label: "设备分类",
    showOverflowTooltip: true,
  },
  {
    prop: "softwareVersion",
    label: "ini配置文件名",
    showOverflowTooltip: true,
  },
  {
    prop: "softwareVersion",
    label: "ue config文件名",
    showOverflowTooltip: true,
  },
  {
    prop: "ip",
    label: "海思日志开关",
    showOverflowTooltip: true,
    slotName: "switch",
  },
];
</script>

<style></style>

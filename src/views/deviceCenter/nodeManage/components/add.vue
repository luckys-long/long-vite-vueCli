<template>
  <div class="wrap">
    <MyDialog :show="isShow" :before-close="handleClosed" :title="title">
      <MyForm
        :formData="formData"
        :form-columns="formColumns"
        label-width="115px"
      >
        <template #footer="formRef">
          <div class="form-footer">
            <el-button @click="handleClosed"> 取消 </el-button>
            <el-button type="primary" @click="handleSubmit(formRef)">
              保存
            </el-button>
          </div>
        </template>
      </MyForm>
    </MyDialog>
  </div>
</template>

<script setup lang="ts">
import MyDialog from "@/components/dialog.vue";
import MyForm from "@/components/Form/index.vue";
import {  ref } from "vue";
import { saveNodeInfo } from '@/api/iot'
import { ElButton,ElMessage } from "element-plus";

type Props = {
  isShow: boolean;
  beforeClose(): void;
  doAddHandle?: () => void;
  title:string;
  details?: any;
};

const props = withDefaults(defineProps<Props>(), {
  isShow: false,
  title:'添加节点',
  doAddHandle: () => {
    /* doAddHandle */
  },
  details:{nodeName:'',nodeIp:'',nodeParent:'',nodeSuggest:'' }
});

const formData = ref(props.details);

const handleClosed = () => {
  props.beforeClose();
};

const formColumns = [
  {
    prop: "nodeName",
    label: "节点名称",
    tag: "Input",
    span: 20,
  },
  {
    prop: "nodeIp",
    label: "节点地址",
    tag: "Input",
    span: 20,
  },
  {
    prop: "nodeParent",
    label: "父节点",
    tag: "Input",
    span: 20,
  },
  {
    prop: "nodeSuggest",
    label: "节点描述",
    tag: "Input",
    type: "textarea",
    span: 20,
  },
]

const handleSubmit = (formRef) => {
  formRef.validate(async (valid) => {
    if (valid) {
      const res= await saveNodeInfo({...formData.value})
      if(res){
        ElMessage({
            message: '添加成功',
            type: "success",
          });
        props.doAddHandle();
      }
    } else {
      console.log("error submit!");
      return false;
    }
    return null;
  });
};
</script>

<style lang="scss">
.wrap {
  .el-dialog__footer {
    display: none;
  }
  .form-footer {
    display: flex;
    justify-content: end;
    align-items: center;
  }
}
</style>

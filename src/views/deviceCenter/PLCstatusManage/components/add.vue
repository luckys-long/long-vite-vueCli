<template>
  <div class="wrap">
    <MyDialog :show="isShow" :before-close="handleClosed" title="添加">
      <MyForm
        :formData="formData"
        :form-columns="formColumns"
        :form-rules="formRules"
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
import { reactive, ref } from "vue";
import { ElButton } from "element-plus";

type Props = {
  isShow: boolean;
  beforeClose(): void;
  doAddHandle?: () => void;
  name?: string;
};

const props = withDefaults(defineProps<Props>(), {
  isShow: false,
  doAddHandle: () => {
    /* doAddHandle */
  },
});

const formData = ref({ id:'',status:false,frequency:1,spacing:10,port:23 });

const handleClosed = () => {
  props.beforeClose();
};

const formRules = reactive({
  id: [{ required: true, message: "请输入设备imei号", trigger: "blur" }],
  ip: [{ required: true, message: "请输入ip地址", trigger: "blur" }],
  nodeName: [{ required: true, message: "请输入设备名称", trigger: "blur" }],
});


const formColumns = ref([
  {
    prop: "id",
    placeholder: "请输入设备imei号",
    label: "设备唯一表示",
    tag: "Input",
    span: 20,
  },
  {
    prop: "ip",
    placeholder: "请输入ip地址",
    label: "ip地址",
    tag: "Input",
    span: 20,
  },
  {
    prop: "nodeName",
    placeholder: "请输入设备名称",
    label: "设备名称",
    tag: "Input",
    span: 20,
  },
  {
    prop: "nodeSuggest",
    placeholder: "请输入排查建议",
    label: "排查建议",
    tag: "Input",
    type: "textarea",
    span: 20,
  },
  {
    prop: "status",
    label: "Telnet检测",
    tag: "Switch",
    span: 20,
    change: (val) => handleCheck(val),
  },
]);


const handleCheck = (val) => {
  console.log("====>",val);
  if(val){
    const arr = [
    {
      prop: "port",
      label: "端口号",
      tag: "Input",
      span: 20,
    },
    {
      prop: "username",
      label: "用户名",
      tag: "Input",
      span: 20,
    },
    {
      prop: "password",
      label: "密码",
      tag: "Input",
      span: 20,
    },
    {
      prop: "frequency",
      label: "检测频率",
      tag: "Input",
      span: 20,
    },
    {
      prop: "spacing",
      label: "记录间隔",
      tag: "Input",
      span: 20,
    },
  ];
  formColumns.value=formColumns.value.concat(arr)
  }else{
    formColumns.value=formColumns.value.slice(0,5)
  }
};


const handleSubmit = (formRef) => {
  formRef.validate((valid) => {
    if (valid) {
      console.log("===>提交的值", formData.value);

      props.doAddHandle();
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

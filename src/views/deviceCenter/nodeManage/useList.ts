import { ref, type Ref } from 'vue';
import { getNodeList } from '@/api/iot'
import type { nodeDetailType } from '@/model/log';

interface Result {
  tableDataList: Ref<Array<nodeDetailType>>;
  getList: (pageNum: number,  size?: number) => void;
  totalPage: Ref<number>;
  currentPage: Ref<number>;
  loading: Ref<boolean>;
}

const tableDataList: Ref<Array<nodeDetailType>> = ref([]);
const totalPage: Ref<number> = ref(0);
const currentPage: Ref<number> = ref(1);
const loading: Ref<boolean> = ref(true);

const dealData = (item: nodeDetailType): void => {
   // const _item = item;
};

const getList = async (pageNum: number,  size = 10) => {
  try {
    const list: any = await getNodeList({
      pageNum,
      pageSize: size
    });
    window.console.log("===>",list)
    // const { records, total } = list;
    // records.map((item: nodeDetailType) => {
    //   dealData(item);
    //   return item;
    // });
    tableDataList.value = list;
    // totalPage.value = ~~total;
    currentPage.value = pageNum;
    loading.value = false;
  } catch (err) {
    loading.value = false;
    console.log(err);
  }
};

const useNodeManageList = (): Result => ({
  getList,
  tableDataList,
  totalPage,
  currentPage,
  loading
});

export default useNodeManageList;

import { ref, type Ref } from 'vue';
import { getLogManagelist } from '@/api/iot'
import type { logManageListType } from '@/model/log';

interface Result {
  tableDataList: Ref<Array<logManageListType>>;
  getList: (pageNum: number,  size?: number) => void;
  totalPage: Ref<number>;
  currentPage: Ref<number>;
  loading: Ref<boolean>;
}

const tableDataList: Ref<Array<logManageListType>> = ref([]);
const totalPage: Ref<number> = ref(0);
const currentPage: Ref<number> = ref(1);
const loading: Ref<boolean> = ref(true);

const dealData = (item: logManageListType): void => {
   // const _item = item;
};

const getList = async (pageNum: number,  size = 10) => {
  try {
    const list: any = await getLogManagelist({
      pageNum,
      pageSize: size
    });
    const { records, total } = list;
    records.map((item: logManageListType) => {
      dealData(item);
      return item;
    });
    tableDataList.value = records;
    totalPage.value = ~~total;
    currentPage.value = pageNum;
    loading.value = false;
  } catch (err) {
    loading.value = false;
    console.log(err);
  }
};

const uselogManageList = (): Result => ({
  getList,
  tableDataList,
  totalPage,
  currentPage,
  loading
});

export default uselogManageList;

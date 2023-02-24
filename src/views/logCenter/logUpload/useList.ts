import { ref, type Ref } from 'vue';
import { getLogUploadlist } from '@/api/iot'
import type { logListType } from '@/model/log';

interface Result {
  tableDataList: Ref<Array<logListType>>;
  getList: (pageNum: number,  size?: number) => void;
  totalPage: Ref<number>;
  currentPage: Ref<number>;
  loading: Ref<boolean>;
}

const tableDataList: Ref<Array<logListType>> = ref([]);
const totalPage: Ref<number> = ref(0);
const currentPage: Ref<number> = ref(1);
const loading: Ref<boolean> = ref(true);

const dealData = (item: logListType): void => {
  // const _item = item;
};

const getList = async (pageNum: number,  size = 10) => {
  try {
    const list: any = await getLogUploadlist({
      pageNum,
      pageSize: size
    });
    const { records, total } = list;
    records.map((item: logListType) => {
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

const uselogUploadList = (): Result => ({
  getList,
  tableDataList,
  totalPage,
  currentPage,
  loading
});

export default uselogUploadList;

import 'element-plus/es/components/table/style/css';
import 'element-plus/es/components/table-column/style/css';


// import type ElTable from 'element-plus/lib/components/table';
// import type { ElTableColumn } from 'element-plus/lib/components/table';
import { ElTable, ElTableColumn } from 'element-plus';
import { isFun } from '@/hooks/utils';
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

import './index.scss';


type ElTableType = InstanceType<typeof ElTable>;
type ElTableProps = ElTableType['$props'];

type UserElTableColumnProps = {
  slotName?: string;
  headerSlot?: string;
  render?: (...arg: any[]) => any;
  children?: ElTableColumnProps[];
};

export type ElTableColumnProps = InstanceType<typeof ElTableColumn>['$props'] &
  UserElTableColumnProps;

export type ConditionalKeys<Base, Condition> = NonNullable<
  // Wrap in `NonNullable` to strip away the `undefined` type from the produced union.
  {
    // Map through all the keys of the given base type.
    [Key in keyof Base]: Key extends Condition // Pick only keys with types extending the given `Condition` type.
      ? // Retain this key since the condition passes.
        Key
      : // Discard this key since the condition fails.
        never;

    // Convert the produced object into a union type of the keys which passed the conditional test.
  }[keyof Base]
>;

type eventKeyVal = {
  [key in keyof ElTableType]: key extends `on${infer stringA}` ? `on${stringA}` : never;
};
type EmitKeyMethod = ConditionalKeys<ElTableType, `on${string}`>;
type eventKey = NonNullable<eventKeyVal[keyof eventKeyVal]>;
type CamelEventKey<T extends string> = {
  [key in T]: key extends `on${infer stringA}-${infer stringB}`
    ? `on${stringA}${Capitalize<stringB>}`
    : key;
};
type eventJsx = CamelEventKey<CamelEventKey<EmitKeyMethod>[keyof CamelEventKey<EmitKeyMethod>]>;
type eventKeyName = eventJsx[keyof eventJsx];

type eventMethodProps = {
  [key in eventKeyName]: (...args: any[]) => any;
};

export const tableProps = {
  data: {
    type: Array as PropType<Record<string, any>[]>,
    default: () => [],
  },
  align: {
    type: String,
    default: 'left',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  column: {
    type: Array as PropType<ElTableColumnProps[]>,
    default: () => [],
  },
};
type OmitTableProp = Required<Omit<ElTableProps, 'data' | 'class' | eventKey>>;

type KeyConstructor<Base extends object> = {
  [KeyProp in keyof Base]: PropType<Base[KeyProp]>;
};
type TableValidProps = KeyConstructor<OmitTableProp>;

export type MergeTableProps = typeof tableProps &
  eventMethodProps & {
    otherProps: PropType<Record<string, any>>;
    summaryMethod: PropType<(...param: any[]) => string[]>;
  } & TableValidProps;

const MyTable = defineComponent({
  name: 'MyTable',
  props: {
    ...(tableProps as MergeTableProps),
  },
  setup(
    props: {
      data: any;
      column: any;
      align: string;
      loading: boolean;
    },
    { attrs, slots }
  ) {
    return () => {
      const { data, column, align } = props;
      const renderColumn = (columnDict: Record<string, any>, index: number) => {
        const { render, slotName, headerSlot, children, ...restAtts } = columnDict;
        const vSlots: {
          default?: (scope: Record<string, any>) => any;
          header?: (scope: Record<string, any>) => any;
        } = {};
        // console.log("attrs",slots,attrs);
        if (isFun(render)) {
          vSlots.default = scope => {
            if (restAtts.prop) {
              return render(scope.row[restAtts.prop], scope);
            }
            return render(scope);
          };
        }
        if (slotName && isFun(slots[slotName])) {
          // ????????????????????? ?????????????????? { row, column, $index }
          vSlots.default = scope => (slots[slotName] as any)(scope);
        }
        if (headerSlot && slots[headerSlot]) {
          // ??????????????????????????? ?????????????????? { column, $index }
          // console.log("===>",headerSlot);
          vSlots.header = scope => (slots[headerSlot] as any)(scope);
        }
        if (children?.length > 0) {
          vSlots.default = () => children.map(renderColumn);
        }
        return <ElTableColumn key={index} align={align||'left'} {...restAtts} v-slots={vSlots} />;
      };
      const columnsSlots = column.map(renderColumn);

      return (
        <div className='table-wrap'>
            <ElTable
              data={data}
              ref="elTableRef"
              highlightCurrentRow={true}
              stripe
              border={true}
              fit
              {...attrs}
              v-slots={{
                // ????????????????????????????????????????????? ????????????????????????????????????????????????????????????????????????????????? slot??? ??????????????????????????? slot ????????????????????????
                append: () => slots.append && slots.append(),
                // ????????????????????????????????????
                empty: () =>
                  (slots.empty && slots.empty()) ,
              }}
            >
              {columnsSlots}
            </ElTable>
        </div>
      );
    };
  },
  mounted() {
    this.injectTablePrimaryMethods();
  },
  methods: {
    // ???$refs.Table?????????????????????this???, ?????????????????????Table?????????
    // https://element-plus.org/zh-CN/component/table.html#table-??????
    injectTablePrimaryMethods() {
      const _self = this as any;
      const { elTableRef } = _self.$refs;
      // Table ??????
      const tableMethodNameList = [
        'clearSelection',
        'toggleRowSelection',
        'toggleAllSelection',
        'toggleRowExpansion',
        'setCurrentRow',
        'clearSort',
        'clearFilter',
        'doLayout',
        'sort',
      ];
      tableMethodNameList.map(methodName => {
        if (_self[methodName]) {
          console.warn(`the ${methodName} method is exist!, please rename it `);
        } else {
          _self[methodName] = elTableRef?.[methodName as keyof ElTableType];
        }
        return null;
      });
    },
  },
});

export { MyTable };
export default MyTable;

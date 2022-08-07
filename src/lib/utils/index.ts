import { endOfMonth, getDay, startOfMonth, getDate, getYear, getMonth } from 'date-fns';

type MonthTableRowType = Array<number | false>;

const getRangeArray = (start: number, end: number): number[] => {
  return Array(end - start + 1)
    .fill(undefined)
    .map((_, index) => index + start);
};

const splitArray = (array: MonthTableRowType, part: number): MonthTableRowType[] => {
  const tmp = [];
  for (let i = 0; i < array.length; i += part) {
    tmp.push(array.slice(i, i + part));
  }

  const lastTmpRow = tmp[tmp.length - 1];
  if (lastTmpRow.length < part) {
    const requiredCellCount = part - lastTmpRow.length;
    lastTmpRow.push(...Array(requiredCellCount).fill(false));
  }

  return tmp;
};

// getMonthData
interface IGetMonthData {
  (year: number, month: number): MonthTableRowType[];
}

export const getMonthData: IGetMonthData = (year, month) => {
  if (month < 1 || month > 12) {
    console.error('month must be between 1 and 12');
    return [];
  }

  const date = new Date(year, month - 1);
  const startDay = getDay(startOfMonth(date)); // 요일 index 얻기
  const endDate = getDate(endOfMonth(date)); // 30일 or 31일

  const daysArray = getRangeArray(1, endDate); // [1, 2, ..., 30]
  const spaceArray = Array(startDay).fill(false);
  const targetArray = spaceArray.concat(daysArray);

  return splitArray(targetArray, 7); // 1d -> 2d
};

export const getNextYearAndMonth = (year: number, month: number): [number, number] => {
  const firstMonth = 1;
  const lastMonth = 12;

  if (month === lastMonth) {
    return [year + 1, firstMonth];
  }

  return [year, month + 1];
};

export const getPrevYearAndMonth = (year: number, month: number): [number, number] => {
  const firstMonth = 1;
  const lastMonth = 12;

  if (month === firstMonth) {
    return [year - 1, lastMonth];
  }

  return [year, month - 1];
};

export const getThisYearAndThisMonth = () => {
  const today = new Date();
  return [getYear(today), getMonth(today)];
};

export const getYearMonth = (year: number, month: number) => {
  return new Intl.DateTimeFormat(navigator.language, { year: 'numeric', month: 'long' }).format(
    new Date(year, month - 1),
  );
};

export const getWeekDay = (locale: string) => {
  if (locale.startsWith('ko')) {
    return ['일', '월', '화', '수', '목', '금', '토'];
  }

  if (locale.startsWith('ja')) {
    return ['日', '月', '火', '水', '木', '金', '土'];
  }

  if (locale.startsWith('zh')) {
    return ['日', '一', '二', '三', '四', '五', '六'];
  }

  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
};

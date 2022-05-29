import React, { memo, createContext, useMemo } from 'react';
import styled from 'styled-components';

import Days from './Days';
import { getMonthData } from './utils';
import Weekday from './Weekday';

interface Props {
  year: number;
  month: number;
}

export const YearMonthContext = createContext<number[]>([0, 0]);

function MonthTable({ year, month }: Props) {
  const days = useMemo(() => getMonthData(year, month), [year, month]);
  const value = useMemo(() => [year, month], [year, month]);

  return (
    <YearMonthContext.Provider value={value}>
      <S.MonthTableLayer>
        <S.Header>
          <S.YearMonth>
            {year}년 {month}월
          </S.YearMonth>
        </S.Header>
        <S.Table>
          <Weekday />
          <Days days={days} />
        </S.Table>
      </S.MonthTableLayer>
    </YearMonthContext.Provider>
  );
}

const S = {
  YearMonth: styled.h2`
    font-size: 16px !important;
    cursor: default !important;
  `,

  Header: styled.header`
    margin-bottom: 24px !important;
    text-align: center !important;
  `,

  Table: styled.table`
    border-collapse: separate !important;
    border-spacing: 0 2px !important;
    font-weight: bold !important;
  `,

  MonthTableLayer: styled.div`
    display: inline-block !important;
    padding: 0 32px !important;
  `,
};

export default memo(MonthTable);

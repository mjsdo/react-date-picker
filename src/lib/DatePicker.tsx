import React, { useState, createContext } from 'react';
import styled from 'styled-components';

import MonthTable from './MonthTable';
import * as I from './styles/icons';
import theme from './styles/theme';
import { getNextYearAndMonth, getPrevYearAndMonth, getThisYearAndThisMonth } from './utils';

export const DisablePreviousDaysContext = createContext<boolean>(false);

interface Props {
  disablePreviousDays: boolean;
}

export function DatePicker({ disablePreviousDays = false }: Props) {
  const [thisYear, thisMonth] = getThisYearAndThisMonth();
  const [monthTableData, setMonthTableData] = useState([
    { year: thisYear, month: thisMonth + 1 },
    { year: thisYear, month: thisMonth + 2 },
  ]);

  const onClickNextButton = () => {
    setMonthTableData(([, { year: prevRightDisplayYear, month: prevRightDisplayMonth }]) => {
      const [nextRightDisplayYear, nextRightDisplayMonth] = getNextYearAndMonth(
        prevRightDisplayYear,
        prevRightDisplayMonth,
      );
      return [
        { year: prevRightDisplayYear, month: prevRightDisplayMonth },
        { year: nextRightDisplayYear, month: nextRightDisplayMonth },
      ];
    });
  };

  const onClickPrevButton = () => {
    setMonthTableData(([{ year: prevLeftDisplayYear, month: prevLeftDisplayMonth }]) => {
      const [nextLeftDisplayYear, nextLeftDisplayMonth] = getPrevYearAndMonth(
        prevLeftDisplayYear,
        prevLeftDisplayMonth,
      );
      return [
        { year: nextLeftDisplayYear, month: nextLeftDisplayMonth },
        { year: prevLeftDisplayYear, month: prevLeftDisplayMonth },
      ];
    });
  };

  return (
    <DisablePreviousDaysContext.Provider value={disablePreviousDays}>
      <S.DatePickerLayer>
        {monthTableData.map(({ year, month }) => (
          <MonthTable key={`${year}${month}`} year={year} month={month} />
        ))}
        <span className="prevbtn-prevbtn" onClick={onClickPrevButton}>
          <I.Prev />
        </span>
        <span className="nextbtn-nextbtn" onClick={onClickNextButton}>
          <I.Next />
        </span>
      </S.DatePickerLayer>
    </DisablePreviousDaysContext.Provider>
  );
}

const S = {
  DatePickerLayer: styled.div`
    min-width: 930px !important;
    position: relative !important;
    display: inline-block !important;
    font-size: 12px !important;
    padding: 64px !important;
    box-shadow: 0 4px 10px rgba(51, 51, 51, 0.1), 0 0 4px rgba(51, 51, 51, 0.05);
    background-color: ${theme.color.white} !important;
    border-radius: 40px !important;

    .prevbtn-prevbtn,
    .nextbtn-nextbtn {
      cursor: pointer;
      position: absolute !important;
      padding: 8px !important;
      margin-top: 20px !important;
      border-radius: 50% !important;
      width: 32px !important;
      height: 32px !important;
      font-size: ${theme.fontSize.xs} !important;

      &:hover {
        background-color: ${theme.color.gray6} !important;
      }
    }

    .prevbtn-prevbtn {
      left: 88px !important;
    }

    .nextbtn-nextbtn {
      right: 88px !important;
    }

    &,
    * {
      box-sizing: border-box !important;
    }
  `,
};

export default DatePicker;

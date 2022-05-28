import React, { memo, useContext } from 'react';
import styled from 'styled-components';

import { DisablePreviousDaysContext } from './DatePicker';
import { useDayCell } from './hooks/useDayCell';
import { YearMonthContext } from './MonthTable';
import { mixin } from './styles/mixin';
import theme from './styles/theme';

interface Props {
  day: number | false;
}

interface CheckIsPreviousDayInput {
  year: number;
  month: number;
  day: number | false;
}

const checkIsPreviousDay = ({ year, month, day }: CheckIsPreviousDayInput) => {
  if (!day) {
    return true;
  }

  const currentCellDate = new Date(year, month - 1, day);
  const today = new Date();

  return today > currentCellDate;
};

function DayCell({ day }: Props) {
  const [year, month] = useContext(YearMonthContext);
  const {
    isSelected,
    isBetweenPickedDates,
    isFirstPickedDate,
    isSecondPickedDate,
    onClickDayCell,
  } = useDayCell({ year, month, day });
  const isPreviousDaysDisabled = useContext(DisablePreviousDaysContext);
  const isPreviousDay = checkIsPreviousDay({ year, month, day });

  return (
    <S.CellLayer
      isBetweenPickedDates={!!day && isBetweenPickedDates}
      isFirstPickedDate={isFirstPickedDate}
      isSecondPickedDate={isSecondPickedDate}
    >
      {day && (
        <S.Cell
          onClick={onClickDayCell}
          isSelected={isSelected}
          disabled={isPreviousDaysDisabled && isPreviousDay}
        >
          {day}
        </S.Cell>
      )}
    </S.CellLayer>
  );
}

const S = {
  CellLayer: styled.td<{
    isBetweenPickedDates: boolean;
    isFirstPickedDate: boolean;
    isSecondPickedDate: boolean;
  }>`
    width: 48px !important;
    height: 48px !important;

    // 체크인, 체크아웃 모두 선택된 경우

    // 체크인 <= CellLayer <= 체크아웃인 경우
    //background-color: ${theme.color.gray6};
    ${({ isBetweenPickedDates }) =>
      isBetweenPickedDates &&
      `
      background-color: ${theme.color.gray6};
    `};

    // CellLayer가 firstDayOfMonth인 경우
    //background: linear-gradient(to left, ${theme.color.gray6}, ${theme.color.white});

    // CellLayer가 lastDayOfMonth인 경우
    //background: linear-gradient(to right, ${theme.color.gray6}, ${theme.color.white});

    // 체크인 버튼인 경우
    ${({ isFirstPickedDate }) =>
      isFirstPickedDate &&
      `
      border-top-left-radius: 50%;
      border-bottom-left-radius: 50%;
    `}

    // 체크아웃 버튼인 경우
    ${({ isSecondPickedDate }) =>
      isSecondPickedDate &&
      `
      border-top-right-radius: 50%;
      border-bottom-right-radius: 50%;
    `}
  `,

  Cell: styled.div<{ isSelected: boolean; disabled: boolean }>`
    ${mixin.flexbox({ ai: 'center', jc: 'center' })};
    height: 100%;
    border: 1px solid transparent;
    border-radius: 50%;
    cursor: pointer;
    transition: all 100ms;
    font-size: ${theme.fontSize.xs} !important;

    &:hover {
      border-color: ${theme.color.gray1};
    }

    // isDisabled === true
    ${({ disabled }) =>
      disabled &&
      `
       pointer-events: none;
       color: ${theme.color.gray4};
    `}
    //

    // 클릭시
    ${({ isSelected }) =>
      isSelected &&
      `
        background-color: ${theme.color.gray1};
        color: ${theme.color.white};
      `}
  `,
};

export default memo(DayCell);

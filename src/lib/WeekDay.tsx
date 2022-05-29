import React from 'react';
import styled from 'styled-components';

import theme from './styles/theme';

const weekday = ['일', '월', '화', '수', '목', '금', '토'];

function WeekDay() {
  return (
    <S.WeekDay>
      <S.Row>
        {weekday.map((day) => (
          <S.Cell key={day}>{day}</S.Cell>
        ))}
      </S.Row>
    </S.WeekDay>
  );
}

const S = {
  Cell: styled.th`
    color: ${theme.color.gray4};
    font-weight: normal !important;
    font-size: ${theme.fontSize.xs} !important;
  `,

  Row: styled.tr`
    height: 24px !important;
  `,

  WeekDay: styled.thead`
    padding: 0 !important;
  `,
};

export default WeekDay;

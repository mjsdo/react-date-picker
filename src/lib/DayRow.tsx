import React, { memo } from 'react';
import styled from 'styled-components';

import DayCell from './DayCell';

interface Props {
  dayList: Array<number | false>;
}

function DayRow({ dayList }: Props) {
  return (
    <S.Row>
      {dayList.map((day, cellIdx) => (
        <DayCell key={String(cellIdx)} day={day} />
      ))}
    </S.Row>
  );
}

const S = {
  Row: styled.tr``,
};

export default memo(DayRow);

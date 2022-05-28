import React, { memo } from 'react';
import styled from 'styled-components';

import DayRow from './DayRow';

interface Props {
  days: Array<Array<number | false>>;
}

function Days({ days }: Props) {
  return (
    <S.Tbody>
      {days.map((dayList, rowIdx) => (
        <DayRow key={String(rowIdx)} dayList={dayList} />
      ))}
    </S.Tbody>
  );
}

const S = {
  Tbody: styled.tbody``,
};

export default memo(Days);

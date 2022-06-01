# React date picker

Airbnb style date picker

## Installation

```bash
$ npm i @bcad1591/react-date-picker
```

<br />

## Examples

```tsx
import React from 'react';
import { createRoot } from 'react-dom/client';

import {
  DatePicker,
  DatePickerProvider,
  useDatePickGetter,
  useDatePickReset,
} from '@bcad1591/react-date-picker';

const container = document.getElementById('root');
const root = createRoot(container);

function App() {
  const { pickedDates } = useDatePickGetter();

  const resetFunc = useDatePickReset();

  return (
    <div>
      <DatePicker disablePreviousDays />
      <hr />
      <div>{pickedDates.firstPickedDate?.toString()}</div>
      <div>{pickedDates.secondPickedDate?.toString()}</div>
      <button type="button" onClick={resetFunc}>
        Reset
      </button>
    </div>
  );
}

root.render(
  <DatePickerProvider>
    <App />
  </DatePickerProvider>,
);
```

![DatePicker](https://user-images.githubusercontent.com/79135734/171417925-8872cb93-4d9b-4812-b05c-1bf55d4e5081.gif)

## Props

Props of `<DatePicker />` Component
| Option | Type | Description |
| ------------------- | ------- | --------------------------------------------------- |
| disablePreviousDays | boolean | Default: `true`. <br/> 이전 날짜 선택 비활성화 여부 |

## Hooks

| Hooks             | Return                           | Description       |
| ----------------- | -------------------------------- | ----------------- |
| useDatePickGetter | { pickedDateUnits, pickedDates } | 선택된 날짜 State |
| useDatePickReset  | resetFunc                        | State 초기화 함수 |

## Type Declaration

- pickedDateUnits

```ts
declare const pickedDateUnits: IPickedDateUnits;

interface IPickedDateUnits {
  firstPickedDateUnit: IPickedDateUnit | null;
  secondPickedDateUnit: IPickedDateUnit | null;
}

interface IPickedDateUnit {
  year: number;
  month: number; // 1 <= month <= 12
  day: number; // 1 <= day <= 31
}
```

- pickedDates

```ts
declare const pickedDates: IPickedDates;

interface IPickedDates {
  firstPickedDatet: Date | null;
  secondPickedDate: Date | null;
}
```

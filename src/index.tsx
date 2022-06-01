import React from 'react';
import { createRoot } from 'react-dom/client';

import { DatePicker, DatePickerProvider, useDatePickGetter, useDatePickReset } from './lib';

const container = document.getElementById('root');
const root = createRoot(container as Element);

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

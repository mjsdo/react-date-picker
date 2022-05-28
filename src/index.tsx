import React from 'react';
import { createRoot } from 'react-dom/client';

import { DatePicker, DatePickerProvider, useDatePickGetter } from './lib';

const container = document.getElementById('root');
const root = createRoot(container as Element);

function App() {
  const picks = useDatePickGetter();

  return (
    <div>
      <DatePicker disablePreviousDays />
    </div>
  );
}

root.render(
  <DatePickerProvider>
    <App />
  </DatePickerProvider>,
);

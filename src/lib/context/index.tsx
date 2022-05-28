import React, { useContext, createContext, useState } from 'react';

export interface PickedDateUnit {
  year: number;
  month: number;
  day: number | false;
}

export type PickedDateUnits = {
  firstPickedDateUnit: PickedDateUnit | null;
  secondPickedDateUnit: PickedDateUnit | null;
};
type PickedDatesDispatch = React.Dispatch<React.SetStateAction<PickedDateUnits>>;

const PickedDateUnitsContext = createContext<PickedDateUnits | null>(null);
const PickedDateUnitsDispatchContext = createContext<PickedDatesDispatch | null>(null);

export function DatePickerProvider({ children }: { children: React.ReactNode }) {
  const [pickedDateUnits, setPickedDateUnits] = useState<PickedDateUnits>({
    firstPickedDateUnit: null,
    secondPickedDateUnit: null,
  });

  return (
    <PickedDateUnitsDispatchContext.Provider value={setPickedDateUnits}>
      <PickedDateUnitsContext.Provider value={pickedDateUnits}>
        {children}
      </PickedDateUnitsContext.Provider>
    </PickedDateUnitsDispatchContext.Provider>
  );
}

export const useDatePick = (): [PickedDateUnits, PickedDatesDispatch] => {
  const pickedDateUnits = useContext(PickedDateUnitsContext);
  const setPickedDateUnits = useContext(PickedDateUnitsDispatchContext);

  if (!pickedDateUnits || !setPickedDateUnits) {
    throw new Error('DatePick Error');
  }

  return [pickedDateUnits, setPickedDateUnits];
};

export const useDatePickGetter = () => {
  const pickedDateUnits = useContext(PickedDateUnitsContext);

  if (!pickedDateUnits) {
    throw new Error('DatePickGetter Error');
  }

  return pickedDateUnits;
};

export const useDatePickSetter = () => {
  const setPickedDateUnits = useContext(PickedDateUnitsDispatchContext);

  if (!setPickedDateUnits) {
    throw new Error('DatePickSetter Error');
  }

  return setPickedDateUnits;
};

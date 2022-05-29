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
type PickedDateUnitsDispatch = React.Dispatch<React.SetStateAction<PickedDateUnits>>;

const PickedDateUnitsContext = createContext<PickedDateUnits | null>(null);
const PickedDateUnitsDispatchContext = createContext<PickedDateUnitsDispatch | null>(null);

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

export const useDatePick = (): [PickedDateUnits, PickedDateUnitsDispatch] => {
  const pickedDateUnits = useContext(PickedDateUnitsContext);
  const setPickedDateUnits = useContext(PickedDateUnitsDispatchContext);

  if (!pickedDateUnits || !setPickedDateUnits) {
    throw new Error('DatePick Error');
  }

  return [pickedDateUnits, setPickedDateUnits];
};

// TODO: Date객체도 반환하도록 변경하기.
// TODO: Setter제공하지 않도록 고려하기.
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

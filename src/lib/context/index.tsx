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

const unitToDateObj = (obj: null | PickedDateUnit) => {
  if (!obj || !obj.day) {
    return null;
  }
  const { year, month, day } = obj;
  return new Date(year, month - 1, day);
};

export const useDatePickGetter = () => {
  const pickedDateUnits = useContext(PickedDateUnitsContext);

  if (!pickedDateUnits) {
    throw new Error('DatePickGetter Error');
  }

  const { firstPickedDateUnit, secondPickedDateUnit } = pickedDateUnits;
  const pickedDate = {
    firstPickedDate: unitToDateObj(firstPickedDateUnit),
    secondPickedDate: unitToDateObj(secondPickedDateUnit),
  };

  return { pickedDateUnits, pickedDate };
};

export const useDatePickReset = () => {
  const setPickedDateUnits = useContext(PickedDateUnitsDispatchContext);

  if (!setPickedDateUnits) {
    throw new Error('DatePickSetter Error');
  }

  const reset = () => {
    setPickedDateUnits({
      firstPickedDateUnit: null,
      secondPickedDateUnit: null,
    });
  };

  return reset;
};

export const useDatePickSetter = () => {
  const setPickedDateUnits = useContext(PickedDateUnitsDispatchContext);

  if (!setPickedDateUnits) {
    throw new Error('DatePickSetter Error');
  }

  return setPickedDateUnits;
};

import dayjs, { Dayjs } from "dayjs";
import { useCallback, useMemo, useState } from "react";

export const useCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  const currentDay = useMemo(() => dayjs().toDate(), []);

  const firstDayOfTheMonth = useMemo(
    () => selectedDate.clone().startOf("month"),
    [selectedDate]
  );

  const firstDayOfFirstWeekOfMonth = useMemo(
    () => dayjs(firstDayOfTheMonth).startOf("week"),
    [firstDayOfTheMonth]
  );

  const generateFirstDayOfEachWeek = useCallback((day: Dayjs): Dayjs[] => {
    const dates: Dayjs[] = [day];
    for (let i = 1; i < 6; i++) {
      const date = day.clone().add(i, "week");
      dates.push(date);
    }
    return dates;
  }, []);

  const generateWeek = useCallback((day: Dayjs): Date[] => {
    const dates: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const date = day.clone().add(i, "day").toDate();
      dates.push(date);
    }
    return dates;
  }, []);

  const generateWeeksOfTheMonth = useMemo((): Date[][] => {
    const firstDayOfEachWeek = generateFirstDayOfEachWeek(
      firstDayOfFirstWeekOfMonth
    );
    return firstDayOfEachWeek.map((date) => generateWeek(date));
  }, [generateFirstDayOfEachWeek, firstDayOfFirstWeekOfMonth, generateWeek]);

  const onChangeDay = (date: Dayjs) => {
    setSelectedDate(date);
  };

  //    --------------------------------------------

  const increaseHour = useCallback(() => {
    setSelectedDate((currentDate) =>
      currentDate.hour() === 11
        ? currentDate.set("hour", 1)
        : currentDate.add(1, "hour")
    );
  }, [setSelectedDate]);

  const increaseMinute = useCallback(() => {
    setSelectedDate((currentDate) =>
      currentDate.minute() === 59
        ? currentDate.set("minute", 0).add(1, "hour")
        : currentDate.add(1, "minute")
    );
  }, [setSelectedDate]);

  const increaseSecond = useCallback(() => {
    setSelectedDate((currentDate) =>
      currentDate.second() === 59
        ? currentDate.set("second", 0).add(1, "minute")
        : currentDate.add(1, "second")
    );
  }, [setSelectedDate]);

  const decreaseHour = useCallback(() => {
    setSelectedDate((currentDate) =>
      currentDate.hour() === 1
        ? currentDate.set("hour", 12)
        : currentDate.subtract(1, "hour")
    );
  }, [setSelectedDate]);

  const decreaseMinute = useCallback(() => {
    setSelectedDate((currentDate) =>
      currentDate.minute() === 0
        ? currentDate.set("minute", 59).subtract(1, "hour")
        : currentDate.subtract(1, "minute")
    );
  }, [setSelectedDate]);

  const decreaseSecond = useCallback(() => {
    setSelectedDate((currentDate) =>
      currentDate.second() === 0
        ? currentDate.set("second", 59).subtract(1, "minute")
        : currentDate.subtract(1, "second")
    );
  }, [setSelectedDate]);

  const toggle12DateSystem = useCallback(() => {
    setSelectedDate((currentDate) =>
      currentDate.hour() >= 12
        ? currentDate.subtract(12, "hour")
        : currentDate.add(12, "hour")
    );
  }, [setSelectedDate]);

  //   ---------------------------------------------------

  return {
    currentDay,
    selectedDate,
    firstDayOfTheMonth,
    firstDayOfFirstWeekOfMonth,
    generateWeeksOfTheMonth,
    generateFirstDayOfEachWeek,
    generateWeek,
    setSelectedDate,
    increaseHour,
    increaseMinute,
    increaseSecond,
    decreaseHour,
    decreaseMinute,
    decreaseSecond,
    toggle12DateSystem,
    onChangeDay,
  };
};

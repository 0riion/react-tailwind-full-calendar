import dayjs from "dayjs";
import { useCalendar } from "../hooks/useCalendar";

interface TimeUnit {
  value: string;
  format: string;
  increment: () => void;
  decrement: () => void;
}

export default function DatePicker() {
  const {
    selectedDate,
    generateWeeksOfTheMonth,
    modifyDateTime,
    toggleAmPm,
    onDateChange,
  } = useCalendar();

  console.log(selectedDate.toDate());

  const CalendarControls = () => {
    return (
      <div className="flex items-center justify-between w-full px-20 h-1/6">
        <button
          onClick={() => modifyDateTime("month", false)}
          className="text-white"
        >{`<`}</button>
        <p className="text-white">{selectedDate.clone().format("MMMM YYYY")}</p>
        <button
          onClick={() => modifyDateTime("month", true)}
          className="text-white"
        >{`>`}</button>
      </div>
    );
  };

  const CalendarDates = () => {
    return (
      <div className="w-full h-3/6">
        <div className="flex justify-between w-full px-6 h-1/6">
          {generateWeeksOfTheMonth[0].map((day, index) => (
            <p key={`week-day-${index}`} className="text-white">
              {dayjs(day).format("dd")}
            </p>
          ))}
        </div>
        <div className="px-4 pt-4">
          {generateWeeksOfTheMonth.map((week, weekIndex) => (
            <div key={`week-${weekIndex}`} className="flex justify-between">
              {week.map((day, dayIndex) => (
                <p
                  key={`day-${dayIndex}`}
                  className={`cursor-pointer ${
                    selectedDate.clone().toDate().getMonth() !== day.getMonth()
                      ? "text-gray-600"
                      : "text-white"
                  }`}
                  onClick={() => onDateChange(dayjs(day))}
                >
                  {day.getDate()}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const CalendarTime: React.FC = () => {
    const timeUnits: TimeUnit[] = [
      {
        value: selectedDate.format("hh"),
        format: "hh",
        increment: () => modifyDateTime("hour", true),
        decrement: () => modifyDateTime("hour", false),
      },
      {
        value: selectedDate.format("mm"),
        format: "mm",
        increment: () => modifyDateTime("minute", true),
        decrement: () => modifyDateTime("minute", false),
      },
      {
        value: selectedDate.format("ss"),
        format: "ss",
        increment: () => modifyDateTime("second", true),
        decrement: () => modifyDateTime("second", false),
      },
      {
        value: selectedDate.format("a"),
        format: "a",
        increment: toggleAmPm,
        decrement: toggleAmPm,
      },
    ];

    return (
      <div className="flex items-center w-full h-1/6 justify-evenly">
        {timeUnits.map((unit) => (
          <div key={unit.format} className="w-10 h-10 text-white">
            <span className="cursor-pointer" onClick={unit.increment}>
              up
            </span>
            <p>{unit.value}</p>
            <span className="cursor-pointer" onClick={unit.decrement}>
              down
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-[#2A2842] rounded-lg w-80 h-96">
      <CalendarControls />
      <CalendarDates />
      <CalendarTime />
    </div>
  );
}

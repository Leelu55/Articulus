import dateMethods, {ArticulusDateType} from './dateMethods';

it('test dateMethods', () => {
  const dateBefore: ArticulusDateType = {y: 2000, m: 1, d: 2};
  const dateAfter: ArticulusDateType = {y: 2030, m: 11, d: 23};

  expect(dateMethods.compareDates(dateBefore, dateAfter)).toBe(-1);
  expect(dateMethods.compareDates(dateAfter, dateAfter)).toBe(0);
  expect(dateMethods.compareDates(dateAfter, dateBefore)).toBe(1);

  expect(dateMethods.dateToString({y: 2000, m: 1, d: 2})).toBe('2000-1-2');
  expect(dateMethods.stringToDate('2000-1-2')).toStrictEqual({
    d: 2,
    m: 1,
    y: 2000,
  });

  const articulusDate = {y: 2000, m: 1, d: 19};
  const jsDate = dateMethods.articulusDateToJsDate(articulusDate);
  expect({
    y: jsDate.getFullYear(),
    m: jsDate.getMonth(),
    d: jsDate.getDate(),
  }).toEqual(articulusDate);

  // KEIN Schaltjahr
  const _today1: ArticulusDateType = {
    y: 1999,
    m: 1, // february
    d: 25,
  };

  expect(dateMethods.getFutureDate(4, _today1)).toStrictEqual({
    y: 1999,
    m: 2, // march
    d: 1,
  });

  // Schaltjahr
  const _today2: ArticulusDateType = {
    y: 2000,
    m: 1, // february
    d: 25,
  };
  expect(dateMethods.getFutureDate(4, _today2)).toStrictEqual({
    d: 29,
    m: 1, // february
    y: 2000,
  });

  expect(dateMethods.getFutureDate(5, _today2)).toStrictEqual({
    d: 1,
    m: 2, // march
    y: 2000,
  });
});

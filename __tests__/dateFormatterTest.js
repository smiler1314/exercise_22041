import {format} from '../src/dateFormatter';

it('when the system date and the date to format are the same day formats as "TODAY"', () => {
  const December = 11; //js Date object month is indexed from 0
  const systemDateTime = new Date(2018, December, 15, 10, 5).getTime();
  const dateTimeToFormat = new Date(2018, December, 15, 12, 50).getTime(); //Same day different time
  expect(format(dateTimeToFormat, systemDateTime)).toBe('TODAY');
});

it('when the system date and the date to format are not the same day formats as "DD/MM/YYYY"', () => {
  const December = 11; //js Date object month is indexed from 0
  const January = 0; //js Date object month is indexed from 0
  const systemDateTime = new Date(2018, December, 15, 10, 5).getTime();
  const dateTimeToFormat1 = new Date(2018, January, 15, 12, 50).getTime();
  expect(format(dateTimeToFormat1, systemDateTime)).toBe('15/01/2018');
  const dateTimeToFormat2 = new Date(2019, January, 2, 12, 50).getTime();
  expect(format(dateTimeToFormat2, systemDateTime)).toBe('02/01/2019');
});

it('when the system date and/or the date to format are not valid timestamps, nothing is returned, and errors are logged', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  const December = 11; //js Date object month is indexed from 0
  const January = 0; //js Date object month is indexed from 0
  const systemDateTime = new Date(2018, December, 15, 10, 5).getTime();
  const dateTimeToFormat = new Date(2018, January, 15, 12, 50).getTime();
  expect(format('', systemDateTime)).toBe('');
  expect(consoleSpy).toHaveBeenCalledWith("invalid input parameters: '', '1544868300000'");
  expect(format(dateTimeToFormat, '')).toBe('');
  expect(consoleSpy).toHaveBeenCalledWith("invalid input parameters: '1516020600000', ''");
  expect(format('', '')).toBe('');
  expect(consoleSpy).toHaveBeenCalledWith("invalid input parameters: '', ''");
  expect(format(0, systemDateTime)).toBe('01/01/1970');
  expect(format({}, systemDateTime)).toBe('');
  expect(consoleSpy).toHaveBeenCalledWith("invalid input parameters: '[object Object]', '1544868300000'");
  expect(format(8640000000000000, systemDateTime)).toBe('13/09/275760');
  expect(format(-8640000000000001, systemDateTime)).toBe('');
  expect(consoleSpy).toHaveBeenCalledWith("invalid input parameters: '-8640000000000001', '1544868300000'");
  expect(format(8640000000000001, systemDateTime)).toBe('');
  expect(consoleSpy).toHaveBeenCalledWith("invalid input parameters: '8640000000000001', '1544868300000'");
  expect(format(0, -8640000000000001)).toBe('');
  expect(consoleSpy).toHaveBeenCalledWith("invalid input parameters: '0', '-8640000000000001'");
  expect(format(0, 8640000000000001)).toBe('');
  expect(consoleSpy).toHaveBeenCalledWith("invalid input parameters: '0', '8640000000000001'");
  expect(format(null, 8640000000000001)).toBe('');
  expect(consoleSpy).toHaveBeenCalledWith("invalid input parameters: 'null', '8640000000000001'");
  expect(format(undefined, 8640000000000001)).toBe('');
  expect(consoleSpy).toHaveBeenCalledWith("invalid input parameters: 'undefined', '8640000000000001'");
});

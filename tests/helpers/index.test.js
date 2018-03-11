import { parseDate } from '../../src/helpers';

describe('helpers: parseDate', () => {
  it('should return properly formated date', () => {
    const incomeDate = '03/11/2017';

    expect(parseDate(incomeDate)).toEqual('11.03.2017');
  });

  it('should return properly formated date for Jan', () => {
    const incomeDate = '01/01/2018';

    expect(parseDate(incomeDate)).toEqual('01.01.2018');
  });
});

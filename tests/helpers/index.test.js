import * as misc from '../../src/misc';

describe('misc: formatDate', () => {
  it('should return properly formated date', () => {
    const incomeDate = '2018-03-11T15:28:19';

    expect(misc.formatDate(incomeDate)).toEqual('11.03.2018');
  });

  it('should return properly format7ed date for Jan', () => {
    const incomeDate = '2018-01-01T23:28:19';

    expect(misc.formatDate(incomeDate)).toEqual('01.01.2018');
  });
});

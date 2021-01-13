export interface ArticulusDateType {
  y: number;
  m: number;
  d: number;
}

const dateMethods = {
  // 2021-01-12
  stringToDate(dateString: string): ArticulusDateType {
    const [yString, mString, dString] = dateString.split('-');
    const [y, m, d] = [
      parseInt(yString, 10),
      parseInt(mString, 10),
      parseInt(dString, 10),
    ];
    return {
      y,
      m,
      d,
    };
  },

  // returns 1 if a > b, -1 if a < b and 0 if both equal
  compareDates(a: ArticulusDateType, b: ArticulusDateType): 0 | -1 | 1 {
    if (a.y > b.y) {
      return 1;
    }

    if (a.y < b.y) {
      return -1;
    }

    // a.y === b.y
    if (a.m > b.m) {
      return 1;
    }

    if (a.m < b.m) {
      return -1;
    }

    // a.m === b.m
    if (a.d > b.d) {
      return 1;
    }

    if (a.d < b.d) {
      return -1;
    }

    return 0;
  },

  getCurrentDate(): ArticulusDateType {
    const currentDate = new Date();

    return {
      y: currentDate.getFullYear(),
      m: currentDate.getMonth(),
      d: currentDate.getDate(),
    };
  },

  getFutureDate(
    diffDays: number,
    _today?: ArticulusDateType,
  ): ArticulusDateType {
    const articulusDate: ArticulusDateType = _today
      ? _today
      : dateMethods.getCurrentDate();

    const futureDate: Date = dateMethods.articulusDateToJsDate(articulusDate);
    futureDate.setDate(futureDate.getDate() + diffDays);

    return {
      y: futureDate.getFullYear(),
      m: futureDate.getMonth(),
      d: futureDate.getDate(),
    };
  },

  dateToString(date: ArticulusDateType): string {
    return date.y + '-' + date.m + '-' + date.d;
  },

  articulusDateToJsDate(articulusDate: ArticulusDateType): Date {
    return new Date(articulusDate.y, articulusDate.m, articulusDate.d);
  },
};

export default dateMethods;

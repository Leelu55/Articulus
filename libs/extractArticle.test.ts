import extractArticle from './extractArticle';

it('test for das article', () => {
  expect(
    extractArticle([
      'total seltsam oder',
      'das total seltsam oder',
      'sag total seltsam oder',
      "sag' total seltsam oder",
      'dark total seltsam oder',
    ]),
  ).toBe('das');
});

it('test for der article', () => {
  expect(
    extractArticle([
      ' ',
      'm',
      'Baum',
      'derDieDas der bauen',
      'der die.das der Baum',
    ]),
  ).toBe('der');

  expect(
    extractArticle([
      'ich darf die der Hund',
      'ich das die der Hund',
      'ich dass die der Hund',
      'Ich das die der Hund',
      'ist das die der Hund',
    ]),
  ).toBe('der');
});

it('test for die article', () => {
  expect(
    extractArticle([
      'derDieDas die Baum',
      'der die das die Baum',
      'der-die-das der Baum',
      'derDieDas der bauen',
      'der die.das der Baum',
    ]),
  ).toBe('die');
  expect(
    extractArticle([
      'der das die Katze',
      'der dass die Katze',
      'der das die Katz',
      'der daß die Katze',
      'der dass die Katz',
    ]),
  ).toBe('die');
});

it('test for answer too long', () => {
  expect(
    extractArticle([
      'diese Dinger unter anderem daraus da kommt da raus da kommt da raus damit daraus da kommt da raus',
      'diese Dinger und das letzte an der kommt da raus da kommt da raus da kommt da raus damit daraus da kommt da raus',
      'diese Dinger und gucken das letzte an der kommt da raus da kommt da raus da kommt da raus damit daraus da kommt da raus',
      'diese Dinger und gucken letzte an der kommt da raus da kommt da raus da kommt da raus damit daraus da kommt da raus',
      'diese Dinger unter anderem daraus da kommt da raus da kommt da raus dann auch da raus da kommt da raus',
    ]),
  ).toBe(null);
});

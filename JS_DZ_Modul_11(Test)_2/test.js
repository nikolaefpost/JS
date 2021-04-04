
describe("MyString", function() {

  it("removes element at index", function() {
    assert.equal(new MyString("qwerty").remove(0), 'werty');
    assert.equal(new MyString("qwerty").remove(2), 'qwrty');
    assert.equal(new MyString("qwerty").remove(10), 'qwerty');
    assert.equal(new MyString("qwerty").remove(-4), 'qwerty');
  });
  it("insert character at index", function() {
    assert.equal(new MyString("qwerty").insert(0, 'X'), 'Xwerty');
    assert.equal(new MyString("qwerty").insert(2, 'X'), 'qwXrty');
    assert.equal(new MyString("qwerty").insert(10, 'X'), 'qwertyX');
    assert.equal(new MyString("qwerty").insert(-4, 'X'), 'Xqwerty');
  });
  it("deleting consecutive identical characters", function() {
    assert.equal(new MyString("qwerty").trimSign(), 'qwerty');
    assert.equal(new MyString("qweeeerty").trimSign(), 'qwerty');
    assert.equal(new MyString("qweeertttty").trimSign(), 'qwerty');
    assert.equal(new MyString("qwe....rty").trimSign(), 'qwe.rty');
  });
  it("replacing uppercase letters with lowercase letters", function() {
    assert.equal(new MyString("qwerty").toggle(), 'QWERTY');
    assert.equal(new MyString("QWERTY").toggle(), 'qwerty');
    assert.equal(new MyString("qweRTY").toggle(), 'QWErty');
  });
  it("number of characters in a line", function() {
    assert.equal(new MyString("qwerty").counter('e'), 1);
    assert.equal(new MyString("apple").counter('p'), 2);
    assert.equal(new MyString("avokado").counter('a'), 2);
  });

});

describe("MyDate", function() {

  it("date output in text", function() {
    assert.equal(new MyDate(20, 1, 1990).showDate(), ' двадцатое января');
    assert.equal(new MyDate(21, 1, 1990).showDate(), ' двадцатое первое января');
  });
  it("check: future date or past", function() {
    assert.equal(new MyDate(20, 5, 2056).isFuture(), 'true');
    assert.equal(new MyDate(20, 6, 1990).isFuture(), 'false')
  });
  it("check: leap year or not", function() {
    assert.equal(new MyDate(20, 6, 1990).isLeapYear(), 'false');
    assert.equal(new MyDate(20, 6, 2020).isLeapYear(), 'true');
  });
  it("date of next day", function() {
    assert.equal(new MyDate(20, 6, 2020).nextDay(), '21/6/2020');
    assert.equal(new MyDate(31, 1, 2020).nextDay(), '1/2/2020');
    assert.equal(new MyDate(28, 2, 2020).nextDay(), '29/2/2020');
    assert.equal(new MyDate(28, 6, 2019).nextDay(), '1/3/2020');
    assert.equal(new MyDate(31, 12, 2020).nextDay(), '1/1/2021');
  });


});


// describe("MyString", function() {
//
//   it("removes element at index", function() {
//     assert.deepEqual(new MyString("qwerty").remove(0), 'werty', '== coerces values to strings');
//     assert.equal(new MyString("qwerty").remove(2), 'qwrty');
//     assert.equal(new MyString("qwerty").remove(10), 'qwerty');
//     assert.equal(new MyString("qwerty").remove(-4), 'qwerty');
//   });
//   it("insert character at index", function() {
//     assert.equal(new MyString("qwerty").insert(0, 'X'), 'Xwerty');
//     assert.equal(new MyString("qwerty").insert(2, 'X'), 'qwXrty');
//     assert.equal(new MyString("qwerty").insert(10, 'X'), 'qwertyX');
//     assert.equal(new MyString("qwerty").insert(-4, 'X'), 'Xqwerty');
//   });
//   it("deleting consecutive identical characters", function() {
//     assert.equal(new MyString("qwerty").trimSign(), 'qwerty');
//     assert.equal(new MyString("qweeeerty").trimSign(), 'qwerty');
//     assert.equal(new MyString("qweeertttty").trimSign(), 'qwerty');
//     assert.equal(new MyString("qwe....rty").trimSign(), 'qwe.rty');
//   });
//   it("replacing uppercase letters with lowercase letters", function() {
//     assert.equal(new MyString("qwerty").toggle(), 'QWERTY');
//     assert.equal(new MyString("QWERTY").toggle(), 'qwerty');
//     assert.equal(new MyString("qweRTY").toggle(), 'QWErty');
//   });
//   it("number of characters in a line", function() {
//     assert.equal(new MyString("qwerty").counter('e'), 1);
//     assert.equal(new MyString("apple").counter('p'), 2);
//     assert.equal(new MyString("avokado").counter('a'), 2);
//   });
//
// });

  // describe("MyDate", function() {
  //
  //   it("date output in text", function() {
  //     assert.deepEqual(new MyDate(20, 1, 1990).showDate(), ' двадцатое января');
  //     assert.equal(new MyDate(21, 1, 1990).showDate(), ' двадцатое первое января');
  //   });
  //   it("check: future date or past", function() {
  //     assert.equal(new MyDate(20, 5, 2056).isFuture(), true);
  //     assert.equal(new MyDate(20, 6, 1990).isFuture(), false)
  //   });
  //   it("check: leap year or not", function() {
  //     assert.equal(new MyDate(20, 6, 1990).isLeapYear(), false);
  //     assert.equal(new MyDate(20, 6, 2020).isLeapYear(), true);
  //   });
  //   it("date of next day", function() {
  //     assert.equal(new MyDate(20, 6, 2020).nextDay(), '21/6/2020');
  //     assert.equal(new MyDate(31, 1, 2020).nextDay(), '1/2/2020');
  //     assert.equal(new MyDate(28, 2, 2020).nextDay(), '29/2/2020');
  //     assert.equal(new MyDate(28, 6, 2019).nextDay(), '29/6/2019');
  //     assert.equal(new MyDate(31, 12, 2020).nextDay(), '1/1/2021');
  //   });
  // });


  function createTestRemove(str, index, expected) {
    it(`removes element at index: ${index}, from string "${str}" == "${expected}".`,() => assert.equal(new MyString(str).remove(index), expected,) );
  }

  function createTestInsert(str, index, character, expected) {
    it(`insert ${character} at index: ${index} from string "${str}" == "${expected}".`,() => assert.equal(new MyString(str).insert(index, character), expected,) );
  }

  function createTestTrimSign(str, expected) {
    it(`deleting consecutive identical characters from string "${str}" == "${expected}".`,() => assert.equal(new MyString(str).trimSign(), expected,) );
  }

  function createTestToggle(str, expected) {
    it(`replacing uppercase letters with lowercase letters from string "${str}" == "${expected}".`,() => assert.equal(new MyString(str).toggle(), expected,) );
  }

  function createTestCounter(str, character, expected) {
    it(`number of ${character} in a string "${str}" == "${expected}".`,() => assert.equal(new MyString(str).counter(character), expected) );
  }

  describe ('MyString', ()=>{

    describe ('Tested method - .remove()', ()=>{
      describe('positive test', ()=>{
        createTestRemove('qwerty', 0, 'werty');
        createTestRemove('qwerty', 2, 'qwrty');
      });
      describe('negative test', ()=>{
        createTestRemove('qwerty', undefined, 'qwerty');
        createTestRemove('qwerty', 'string', 'qwerty');
      });
    });

    describe ('Tested method - .insert()', ()=>{
      describe('positive test', ()=>{
        createTestInsert('qwerty', 0, 'X', 'Xwerty');
        createTestInsert('qwerty', 2, 'X', 'qwXrty');
      });
      describe('negative test', ()=>{
        createTestInsert('qwerty', {x:5}, 'X', 'qwerty');
        createTestInsert('qwerty', undefined, 'X', 'qwerty');
      });
    });

    describe ('Tested method - .trimSign()', ()=>{
      describe('positive test', ()=>{
        createTestTrimSign('qwerty', 'qwerty');
        createTestTrimSign('qweeeerty', 'qwerty');
      });
      describe('negative test', ()=>{
        createTestTrimSign('q.....weeertttty', 'q.werty');
        createTestTrimSign('qwe  .-.  -.rty', 'qwe .-. -.rty');
      });
    });

    describe ('Tested method - .toggle()', ()=>{
      describe('positive test', ()=>{
        createTestToggle('qwerty', 'QWERTY');
        createTestToggle('qweRTY', 'QWErty');
      });
      describe('negative test', ()=>{
        createTestToggle('Q_WE.RTY', 'q_we.rty');
        createTestToggle('5', '5');
      });
    });

    describe ('Tested method - .counter()', ()=>{
      describe('positive test', ()=>{
        createTestCounter('qwerty', 'e', 1);
        createTestCounter('avokado', 'a', 2);
      });
      describe('negative test', ()=>{
        createTestCounter('qwerty', {x:'q'}, 0);
        createTestCounter('qwerty', undefined, 0);
      });
    });
  })

  function createTestShowDate(day, month, year, expected) {
    it(`"${day}, ${month}, ${year}" date output in text == "${expected}"`,() => assert.deepEqual(new MyDate(day, month, year).showDate(), expected) );
  }

  function createTestIsFuture(day, month, year, expected) {
    it(`"${day}, ${month}, ${year}" check date (future): "${expected}"`,() => assert.deepEqual(new MyDate(day, month, year).isFuture(), expected) );
  }

  function createTestIsLeapYear(day, month, year, expected) {
    it(`"${day}, ${month}, ${year}" leap year or not: "${expected}"`,() => assert.deepEqual(new MyDate(day, month, year).isLeapYear(), expected) );
  }

  function createTestNextDay(day, month, year, expected) {
    it(`"${day}, ${month}, ${year}" date of next day: "${expected}"`,() => assert.deepEqual(new MyDate(day, month, year).nextDay(), expected) );
  }


  describe('MyDate', ()=>{
    describe ('Tested method - .showDate()', ()=>{
      describe('positive test', ()=>{
        createTestShowDate(20, 1, 2020, ' двадцать(ое) января');
        createTestShowDate(21, 1, 1990, ' двадцать(ое) первое января');
      });
      describe('negative test', ()=>{
        createTestShowDate(30, 2, 2020, 'You entered a date that does not exist!');
        createTestShowDate(29, 2, 2020, ' двадцать(ое) девятое февраля');
      });
    });

    describe ('Tested method - .isFuture()', ()=>{
      describe('positive test', ()=>{
        createTestIsFuture(20, 5, 2056, true);
        createTestIsFuture(20, 6, 1990, false);
      });
      describe('negative test', ()=>{
        createTestIsFuture(7, 4, 2021, false);                                  // если подставить сегодняшнюю дату
        createTestIsFuture(49, 4, 2021, 'You entered a date that does not exist!');
      });
    });

    describe ('Tested method - .isLeapYear()', ()=>{
      describe('positive test', ()=>{
        createTestIsLeapYear(20, 5, 2056, true);
        createTestIsLeapYear(20, 6, 1990, false);
      });
      describe('negative test', ()=>{
        createTestIsLeapYear(7, 4, 0, false);
        createTestIsLeapYear(49, 4, 2021, 'You entered a date that does not exist!');
      });
    });

    describe ('Tested method - .nextDay()', ()=>{
      describe('positive test', ()=>{
        createTestNextDay(31, 1, 2020, '1/2/2020');
        createTestNextDay(28, 2, 2020, '29/2/2020');
      });
      describe('negative test', ()=>{
        createTestNextDay(28, 2, 2019, '1/3/2019');
        createTestNextDay(49, 4, 2021, 'You entered a date that does not exist!');
      });
    });
  })



































  function makeTest(a,b) {
    it(`sum ${a} +${b} = ${a+b}`,() => assert.equal(sum(a, b), a+b) );
  }

  function makeTestM(a,b,r) {
    it(`sum ${a} +${b} = ${r}`,() => assert.equal(sum(a, b), r) );
  }
  describe ('Test sum', ()=>{
    describe('Positive test', ()=>{
      makeTest(2,2);
      makeTest(3,7);
      makeTestM(10,7,17);
      makeTestM(22,33,55);
      makeTestM('3',7,10);
      makeTestM(5,'12',17);
    });
    describe('Negative test', ()=>{
      it(`sum throw Error`, () => { assert.throws(sum, Error)});
      it(`sum 12 + NaN thorws error`, () => {
        // try {
        //   sum(12, 'ddgdsg');
        // } catch (e) {
        //   console.log(e instanceof SyntaxError);
        //   // if(e instanceof SyntaxError) assert.instanceOf(e, Error);
        // }

      } );
      // it(`sum NaN + 35 thorws error`, () => assert.throws(sum('ddgdsg', 35), Error) );
      // it(`sum NaN + NaN thorws error`, () => assert.throws(sum('ddgdsg', 'ddgdsg'), Error) );
      // it(`sum 44 + undefined thorws error`, () => assert.throws(sum(44), Error) );
      // it(`sum 72 + null thorws error`, () => assert.throws(sum(12, null), Error) );
    })
  })

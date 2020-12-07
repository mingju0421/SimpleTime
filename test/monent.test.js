import monent from "../index";

it("测试", () => {
  expect(monent("2020,1,1").format()).toEqual("2020-01-01");
  expect(monent("2020-1-1").format()).toEqual("2020-01-01");
  expect(monent(1607309315582).format()).toEqual("2020-12-07");

  expect(monent("2020,1,1").date()).toEqual(1);
  expect(monent("2020,1,5").date()).toEqual(5);
  expect(monent("2020,2,29").date()).toEqual(29);
  expect(monent("2021-02-29").date()).toEqual(1);

  expect(monent("2020,1,1").day()).toEqual("3");
  expect(monent("2020,11,11").day()).toEqual("3");
  expect(monent("2020,11,15").day()).toEqual("0");
  expect(monent("2020,11,16").day()).toEqual("1");

  expect(monent("2020,11,16").monthWeek()).toEqual(3);
  expect(monent("2020,11,11").monthWeek()).toEqual(2);
  expect(monent("2020,3,1").monthWeek()).toEqual(1);
  expect(monent("2020,3,2").monthWeek()).toEqual(1);
  expect(monent("2020,2,2").monthWeek()).toEqual(2);

  expect(monent("2020,2,2").yearWeek()).toEqual(6);
  expect(monent("2020,1,1").yearWeek()).toEqual(1);
  expect(monent("2020,1,2").yearWeek()).toEqual(1);
  expect(monent("2020,1,3").yearWeek()).toEqual(1);
  expect(monent("2020,1,4").yearWeek()).toEqual(1);
  expect(monent("2020,1,5").yearWeek()).toEqual(2);
  expect(monent("2020,12,1").yearWeek()).toEqual(49);
  expect(monent("2020,12,31").yearWeek()).toEqual(53);

  expect(monent("2020,12,31").month()).toEqual("12");
  expect(monent("2020,1,31").month()).toEqual("1");
  expect(monent("2020,3,1").month()).toEqual("3");

  expect(monent("2020,3,1").quarter()).toEqual("1");
  expect(monent("2020,4,1").quarter()).toEqual("2");

  expect(monent("2020,4,1").year()).toEqual("2020");
  expect(monent("2021,4,1").year()).toEqual("2021");

  expect(monent("2021,4,1").add(1, "Y").format()).toEqual("2022-04-01");
  expect(monent("2021,4,1").add(-1, "Y").format()).toEqual("2020-04-01");
  expect(monent("2021,4,1").add(-1, "Q").format()).toEqual("2021-01-01");
  expect(monent("2021,4,1").add(1, "Q").format()).toEqual("2021-07-01");
  expect(monent("2021,4,1").add(1, "M").format()).toEqual("2021-05-01");
  expect(monent("2021,4,1").add(-1, "M").format()).toEqual("2021-03-01");

  expect(monent("2021,4,1").startDay("Y")).toEqual("2021-01-01");
  expect(monent("2021,4,1").startDay("Q")).toEqual("2021-04-01");
  expect(monent("2021,4,1").startDay("w")).toEqual("2021-03-29");

  expect(monent("2021,4,1").endDay("w")).toEqual("2021-04-04");
  expect(monent("2021,4,1").endDay("M")).toEqual("2021-04-30");
  expect(monent("2021,4,1").endDay("Q")).toEqual("2021-06-30");
  expect(monent("2021,4,1").endDay("Y")).toEqual("2021-12-31");
});

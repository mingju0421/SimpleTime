# SimpleTime

非常简陋哈, 不过平时工作够用了

## 使用

```javascript
import monent from "simple-time-mj";
let time = monent;
const time = monent(new Date().getTime());
const time = monent("2020,1,1"); // 2020-01-01
const time = monent("2020-1-1"); // 2020-01-01
const time = monent("2020-1"); // 2020-01-01
```

- `date()` 获取日期

```javascript
monent("2020,1,1").date(); // 1
```

- `day()` 获取或设置星期几

```javascript
monent("2020,1,1").day(); // '3'
```

- `monthWeek()` 获取本月第几周 周日开始

```javascript
monent("2020,11,16").monthWeek(); // 3
```

- `yearWeek()` 获取本年第几周 周日开始

```javascript
monent("2020,12,1").yearWeek(); // 49
```

- `month()` 获取月份

```javascript
monent("2020,12,1").month(); // '12'
```

- `quarter()` 获取季度

```javascript
monent("2020,12,1").quarter(); // '4'
```

- `year()` 获取年份

```javascript
monent("2020,12,1").year(); // '2020'
```

- `add(num, type)` 修改时间 num 可以为负数, type Y: 年, Q: 季度, M: 月份, w: 周, d: 天, h: 小时, m: 分钟, s: 秒钟

```javascript
monent("2020,12,1").add(1, "d").format(); // '2020-12-02'
```

- `startDay(type)` 获取开始日期 type Y:年, Q: 季度, M:月, w: 周

```javascript
monent("2020,,12,22").startDay("M"); // '2020-12-01'
```

- `endDay(type)` 获取开始日期 type Y:年, Q: 季度, M:月, w: 周

```javascript
monent("2020,,12,22").endDay("M"); // '2020-12-31'
```

- `format()` 时间格式化 默认 YYYY-MM-DD

```javascript
monent("2020,12,1").format(); // '2020-12-01'
```

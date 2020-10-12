class Moment {
    /**
     * 
     * @param {string} time - 格式: 2020-11-12T00:00:00 或 2020-11-12
     */
    constructor(time) {
        let reg = /^\d{4}-\d{1,2}-\d{1,2}(T\d{1,2}:\d{1,2}:\d{1,3})?$/
        this.time = reg.test(time) ? new Date(time.replace('T', ' ')) : new Date()
    }
    /** 获取日期 */
    date() {
        return this.time.getDate()
    }
    /**
     * 获取或设置星期几
     * @param {number?} num - 设置星期几
     */
    day(num) {
        if (num) {
            let week = new Date(this.time).getDay()
            this.add(num - week, 'd')
            return this
        } else {
            return this.time.getDay() + ''
        }
    }
    /** 获取本月第几周 */
    monthWeek() {
        let day = this.time.getDay() || 7
        let date = this.time.getDate()
        return Math.ceil((day + date) / 7)
    }
    /** 获取本年第几周 */
    yearWeek() {
        let year = this.time.getFullYear()
        let diff = this.time - new Date(`${year}-1-1`) + ((new Date(`${year}-1-1`).getDay() || 7) * 1000 * 60 * 60 * 24)
        return Math.ceil(diff / (1000 * 60 * 60 * 24 * 7))
    }
    /** 获取月份 */
    month() {
        return this.time.getMonth() + 1 + ''
    }
    /** 获取季度 */
    quarter() {
        return Math.ceil((this.time.getMonth() + 1) / 3) + ''
    }
    /** 获取年份 */
    year() {
        return this.time.getFullYear() + ''
    }
    /**
     * 修改原始值
     * @param {number} num - 加减的日期 
     * @param {string} type - 加减的单位 y: 年, Q: 季度, M: 月份, w: 周, d: 天, h: 小时, m: 分钟, s: 秒钟 
     */
    add(num, type) {
        let date = this.time.getDate()
        let year = this.time.getFullYear()
        let month = this.time.getMonth()
        let hour = this.time.getHours()
        let minute = this.time.getMinutes()
        let seconds = this.time.getSeconds()
        let result
        switch (type) {
            case 'y':
                year += num
                if (month == 2) {
                    let lastDate = new Date(year, 2, 0)
                    date = date <= lastDate ? date : lastDate
                }
                result = new Date(year, month, date, hour, minute, seconds)
                break;
            case 'Q':
                {
                    let months = year * 12 + num * 3 + month
                    year = ~~(months / 12)
                    month = months % 12
                    let lastDate = new Date(year, month, 0)
                    date = date <= lastDate ? date : lastDate
                    result = new Date(year, month, date, hour, minute, seconds)
                }
                break;
            case 'M':
                {
                    let months = year * 12 + num + month
                    console.log(months)
                    year = ~~(months / 12)
                    month = months % 12
                    let lastDate = new Date(year, month, 0)
                    date = date <= lastDate ? date : lastDate
                    result = new Date(year, month, date, hour, minute, seconds)
                }
                break;
            case 'w':
                result = new Date(this.time.getTime() + (1000 * 60 * 60 * 24 * 7) * num)
                break
            case 'd':
                result = new Date(this.time.getTime() + (1000 * 60 * 60 * 24) * num)
                break
            case 'h':
                result = new Date(this.time.getTime() + (1000 * 60 * 60) * num)
                break
            case 'm':
                result = new Date(this.time.getTime() + (1000 * 60) * num)
                break
            case 's':
                result = new Date(this.time.getTime() + (1000) * num)
                break
            default:
                console.warn('格式错误')
                result = this.time
                break;
        }
        this.time = result
        return this
    }
    /**
     * 获取开始日期
     * @param {string} type - Y:年, Q: 季度, M:月, w: 周,
     */
    startDay(type) {
        let year = this.time.getFullYear()
        let month = this.time.getMonth()
        let quarter = Math.ceil((month + 1) / 3)
        let result
        switch (type) {
            case 'Y':
                result = `${year}-1-1`
                break;
            case 'Q':
                result = `${year}-${-2 + quarter * 3}-1`
                break;
            case 'M':
                result = `${year}-${month}-1`
                break;
            case 'w':
                result = new Moment(this.time).add(-this.time.getDay() + 1, 'd').format()
                break
            default:
                console.warn(`startDay 错误`)
                break;
        }
        return result
    }
    /**
     * 获取结束日期
     * @param {string} type - Y:年, Q: 季度, M:月, w: 周,
     */
    endDay(type) {
        let year = this.time.getFullYear()
        let month = this.time.getMonth() + 1
        let quarter = Math.ceil((month) / 3)
        let result
        switch (type) {
            case 'Y':
                result = `${year}-12-31`
                break;
            case 'Q':
                result = `${year}-${quarter * 3}-${new Date(year, quarter * 3, 0).getDate()}`
                break;
            case 'M':
                let date = new Date(year, month, 0).getDate()
                result = `${year}-${month}-${date}`
                break;
            case 'w':
                result = new Moment(this.time).add(7 - this.time.getDay(), 'd').format()
                break
            default:
                console.warn(`startDay 错误`)
                break;
        }
        return result
    }
    /**
     * 时间格式化
     * @param {string} format - Y:年, M:月, D日, h:小时, m: 分钟, s: 秒钟 
     */
    format(format = 'YYYY-MM-DD') {
        let ret
        let time = this.time
        let option = {
            'Y+': '0000' + time.getFullYear(),
            'M+': '0000' + (time.getMonth() + 1),
            'D+': '0000' + time.getDate(),
            'h+': '0000' + time.getHours(),
            'm+': '0000' + time.getMinutes(),
            's+': '0000' + time.getSeconds()
        }
        for (let key of Object.keys(option)) {
            ret = new RegExp(`(${key})`).exec(format)
            if (ret) {
                format = format.replace(ret[1], option[key].substring(option[key].length - ret[1].length))
            }
        }
        return format
    }
}
export default Moment
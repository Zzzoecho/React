import $ from 'jquery';
import './calendar.css'

export function DatePicker() {
    var $body = $('body')
    this.init()
    this.render()
    this.setDate()
    this.bind()
}

DatePicker.prototype = {
    init: function () {
        this.date = new Date()
        this.watchDate = new Date()
    },
    render: function () {
        var tpl = '<div class="calendar">' +
            '<div class="header"><span class="btn pre">&lt</span><span class="btn next">&gt</span></div><h3 class="cur"></h3>' +
            '<table class="panel">' +
            '<thead> <tr> <th>sun</th><th>mon</th><th>tue</th><th>wed</th><th>thu</th><th>fri</th><th>sat</th> </tr> </thead>' +
            '<tbody></tbody>' +
            '</div>'
        this.$datepicker = $(tpl)
        this.$datepicker.prependTo("body")
    },
    setDate: function () {
        this.$datepicker.find('tbody').html('')

        var firstDay = this.getFirstDay(this.watchDate),
            lastDay = this.getLastDay(this.watchDate),
            dateArr = []

        for (var i = firstDay.getDay(); i > 0; i--) {
            var d = new Date(firstDay.getTime() - i * 24 * 60 * 60 * 1000)
            dateArr.push({
                type: 'pre',
                date: d
            })
        }

        for (var j = 0; j < lastDay.getDate() - firstDay.getDate() + 1; j++) {
            var d = new Date(firstDay.getTime() + j * 24 * 60 * 60 * 1000)
            dateArr.push({
                type: 'cur',
                date: d
            })
        }

        for (var k = 1; k < 7 - lastDay.getDay(); k++) {
            var d = new Date(lastDay.getTime() + k * 24 * 60 * 60 * 1000)
            dateArr.push({
                type: 'next',
                date: d
            })
        }

        this.$datepicker.find('.cur').text(this.transfer())

        var tpl = ''
        for (var i = 0; i < dateArr.length; i++) {
            if (i % 7 === 0) {
                tpl = '<tr>' + tpl
            }

            tpl += '<td class="'
            if (dateArr[i].type === 'pre') {
                tpl += 'pre-month'
            } else if (dateArr[i].type === 'cur') {
                tpl += 'cur-month'
            } else if (dateArr[i].type === 'next') {
                tpl += 'next-month'
            }

            if (this.getYYMMDD(this.date) === this.getYYMMDD(dateArr[i].date)) {
                tpl += ' cur-date'
            }
            tpl += '"'

            tpl += ' data-date="' + this.getYYMMDD(dateArr[i].date) + '">'
            tpl += this.toFixed(dateArr[i].date.getDate()) + '</td>'

            if (i % 7 === 6) {
                tpl += '</tr>'
            }
        }
        this.$datepicker.find('tbody').html(tpl)
    },

    //获取 date 所在月份的第一天的时间对象
    getFirstDay: function (date) {
        var year = date.getFullYear(),
            month = date.getMonth()
        let newDate = new Date(year, month, 1)
        return newDate
    },

    //获取 date 所在月份最后一天的时间对象
    getLastDay: function (date) {
        var year = date.getFullYear(),
            month = date.getMonth()
        month++

        if (month > 11) {
            year++
            month = 0
        }
        var newDate = new Date(year, month, 1)
        return new Date(newDate.getTime() - 24 * 60 * 60 * 1000)
    },

    getYYMMDD: function (date) {
        var year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate()

        return year + '/' + this.toFixed(month) + '/' + this.toFixed(day)
    },

    toFixed: function (n) {
        var num = ''
        if ((n + '').length === 1) {
            num = '0' + n
        } else {
            num = n + ''
        }
        return num
    },

    transfer: function () {
        var mouth = this.watchDate.getMonth(),
            mouthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return mouthList[mouth]

    },

    bind: function () {
        var _this = this
        this.$datepicker.find('.pre').on('click', function () {
            _this.watchDate = _this.getPreMonth(_this.watchDate)
            _this.setDate()
        })
        this.$datepicker.find('.next').on('click', function () {
            _this.watchDate = _this.getNextMonth(_this.watchDate)
            _this.setDate()
        })

    },

    //获取date 上个月1号时间对象
    getPreMonth: function (date) {
        var year = date.getFullYear(),
            month = date.getMonth()
        month--

        if (month < 0) {
            year--
            month = 11
        }
        return new Date(year, month, 1)
    },

    //获取date 下个月1号时间对象
    getNextMonth: function (date) {
        var year = date.getFullYear(),
            month = date.getMonth()
        month++

        if (month > 11) {
            year++
            month = 0
        }
        return new Date(year, month, 1)
    }

}

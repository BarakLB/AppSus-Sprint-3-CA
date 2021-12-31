export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    getRandomColor,
    padNum,
    getDayName,
    getMonthName,
    getCurrencySymbol,
    pageCountTxt,
    publishDateTxt,
    classNameByPrice,
    checkOnSale,
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function padNum(num) {
    return (num > 9) ? num + '' : '0' + num
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

// getDayName('12/25/2021', 'he') ->  'יום שבת'
function getDayName(date, locale) {
    date = new Date(date)
    return date.toLocaleDateString(locale, { weekday: 'long' })
}


function getMonthName(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    return monthNames[date.getMonth()]
}

function getCurrencySymbol(symbol) {
    switch (symbol) {
      case 'EUR':
        return '€';
      case 'ILS':
        return '₪';
      case 'USD':
        return '$';
      default:
        return '';
    }
  }


   function pageCountTxt(book) {
        if (book.pageCount >= 500) return book.pageCount + ' Long Reading'
        else if (book.pageCount >= 200) return book.pageCount + ' Decent Reading'
        if (book.pageCount <= 100) return book.pageCount + ' Light Reading'
        return book.pageCount
    }

    function publishDateTxt(book) {
        if (book.publishedDate >= 2020) return book.publishedDate + ' New'
        if (book.publishedDate <= 2010) return book.publishedDate + ' Veteran Book'

        return book.publishedDate
    }

    function classNameByPrice(book) {
        if (book.listPrice.amount > 150) return 'red'
        else if (book.listPrice.amount < 20) return 'green'

        return ''
    }

    function checkOnSale(book) {
        if (book.listPrice.isOnSale) return 'SALE'

        return ''
    }
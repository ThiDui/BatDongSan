const format = {
    formatMoney(rawData) {
        const MoneyType = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 2
        })
        return MoneyType.format(rawData);
    },
    formatDate(in_date) {
        const out_date = new Date(in_date);

        return out_date.getFullYear() + '-' + (out_date.getMonth() + 1) + '-'
            + out_date.getDate();
    },
    formatVNDate(in_date) {
        const out_date = new Date(in_date);

        return out_date.getDate() + '/' + (out_date.getMonth() + 1) + '/'
            + out_date.getFullYear();
    },
    formatTime(in_date) {
        const out_date = new Date(in_date);
        return out_date.getHours() + ":" + out_date.getMinutes() + ":" + out_date.getSeconds();
    }

}

export default format;
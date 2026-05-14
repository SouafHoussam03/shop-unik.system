const displayMADCurrency = (num) => {

    const formatter = new Intl.NumberFormat('fr-MA', {
        style: "currency",
        currency: 'MAD',
        minimumFractionDigits: 0
    })

    return formatter.format(num)

}

export default displayMADCurrency
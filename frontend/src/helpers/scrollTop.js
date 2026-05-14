const scrollTop = (
    top = 0,
    behavior = "smooth"
) => {

    try {

        window.scrollTo({
            top,
            behavior
        })

    } catch (error) {

        // fallback
        window.scrollTop = top
    }
}

export default scrollTop
export default cachedEventHandler(async (event) => {
    return getPages()
}, {
    maxAge: 60 * 60 * 24,
    swr: true,
});
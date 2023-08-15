

/**
 * Required element to accomodate a screen or any element on a full screen fashion.
 * @param {*} children 
 * @returns 
 */
const FullScreen = ({children}) => {

    return (
        <section className='flex h-screen text-center text-black bg-white pt-20 mb-16 z-10'>
            {children}
        </section>
    )
}

export default FullScreen;
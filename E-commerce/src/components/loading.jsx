import "./loading.css"
function Loading(){
    return(
        <div className="loading-screen">
            <div className="spinner"></div>
            <h2>Loading Exrcises....</h2>
            <p>Please wait while we fetch datas.</p>
        </div>
    )
}
export default Loading;
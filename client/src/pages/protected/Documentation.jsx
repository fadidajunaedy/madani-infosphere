import Content from "../../components/documentation/Content"
import Nav from "../../components/documentation/Nav"

const Documentation = () => {
    return (
        <>
            <div data-aos="fade-up" className="bg-base-100  flex overflow-hidden rounded-lg" style={{height : "82vh"}}>
                    <div className="flex-none p-4">
                        <Nav activeIndex={1}/>
                    </div>

                    <div className="grow pt-16  overflow-y-scroll">
                        <Content />
                    </div>

                </div>
        </>
    )
}

export default Documentation
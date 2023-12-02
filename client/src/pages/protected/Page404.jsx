import { HiFaceFrown } from "react-icons/hi2";

const Page404 = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-[70vh] bg-base-200">
                <HiFaceFrown className="h-48 w-48 mb-4 text-primary"/>
                <h1 className="text-5xl  font-bold text-primary">404 - Not Found</h1>
        </div>
    )
}

export default Page404
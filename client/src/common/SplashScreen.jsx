import LogoMadani from "../images/logomadani.png"

const SplashScreen = () => {
    return (
        <div className="flex h-screen items-center justify-center bg-base-200 transition-all ease-in">
            <img src={LogoMadani} className="h-20 animate-pulse" alt="Logo Madani" />
        </div>
    )
}

export default SplashScreen
import { logout } from "../services/AuthServices"
import { Link, useNavigate } from "react-router-dom"
import { BsSunFill, BsFillMoonFill } from "react-icons/bs"
import { HiUser } from "react-icons/hi2"

import { useEffect, useState } from "react"
import { themeChange } from "theme-change"

const Header = () => {
    const navigate = useNavigate()
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme"))

    const handleLogout = async () => {
        await logout()
        if (logout){
            navigate("/login", { state: { logoutMessage: "Berhasil Logout" } })
        }
    }

    useEffect(() => {
        themeChange(false)
        if(currentTheme === null){
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ) {
                setCurrentTheme("light")
            }else{
                setCurrentTheme("dark")
            }
        }
    }, [currentTheme])

    return (
        <div className="navbar fixed flex justify-between bg-base-100 z-10 shadow-md px-6">
            <div className="navbar-start ">
                <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                </label>
            </div>
            {/* {notification && <p>{notification}</p>} */}
            <div className="navbar-end flex items-center gap-2">
                <label className="btn btn-ghost btn-circle swap py-0 h-full">
                    <input type="checkbox"/>
                    <BsSunFill data-set-theme="light" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 "+(currentTheme === "dark" ? "swap-on" : "swap-off")}/>
                    <BsFillMoonFill data-set-theme="dark" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 "+(currentTheme === "light" ? "swap-on" : "swap-off")} />
                </label>
                <div className="dropdown dropdown-end">
                    <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                        {/* <div className="w-10 rounded-full "> */}
                            <HiUser className="w-6 h-6"/>
                        {/* </div> */}
                    </label>
                    <ul tabIndex="0" className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 rounded">
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li>
                            <button className="py-4" onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header
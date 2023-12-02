import { useState } from "react"

const Nav = ({activeIndex}) => {

    const SECTION_NAVS = [
        {name : "About", isActive : activeIndex === 1 ? true : false},
        {name : "FAQ", isActive : false},
    ]
    const [navs, setNavs] = useState(SECTION_NAVS)

    const scrollToSection = (currentIndex) => {
        setNavs(navs.map((n, k) => {
            if(k === currentIndex)return {...n, isActive : true}
            else return {...n, isActive : false}
        }))
        document.getElementById('content'+(currentIndex+1)).scrollIntoView({behavior: 'smooth' })
    }

    return(
        <ul className="menu w-56 mt-10 text-sm">
            <li className="menu-title"><span className="">Documentation</span></li>
            
            {
                navs.map((n, k) => {
                    return(
                        <li key={k} onClick={() => scrollToSection(k)} className={n.isActive ? "border-l-4 border-primary" : ""}><a>{n.name}</a></li>
                    )
                })
            }
        </ul>
    )
}

export default Nav
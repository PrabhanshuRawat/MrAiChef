import ChefImage from "./images/Chef-logo1.png"

export default function Header(){
    return(
       <header>
        <img src={ChefImage}/>
        <h1>Mr AI Chef </h1>
       </header>
    )
}
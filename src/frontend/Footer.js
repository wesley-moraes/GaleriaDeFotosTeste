import objectiveLogo from "../img/logo3.png"

const Footer = () =>{
    return(
        <footer className='footerGallery w-full flex items-center justify-center sm:justify-between'>
            <p className="hidden sm:block">Todos os direitos reservados ©</p>
            <img src={objectiveLogo} alt="Logo Objective" />
        </footer>
    )
}

export default Footer;
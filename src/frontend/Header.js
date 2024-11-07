

const Header = () => {
    return (
        <header className="headerGalleryContainer w-full h-28 sm:h-40 flex 
        justify-center
        sm:justify-start items-center">
            <div className="headerGalleryBox flex w-80">
                <div className="flex flex-row justify-center sm:justify-start w-full">
                    <div className="textGalleryTitle ">
                        <h1 className="text-base sm:text-3xl">Galeria de Imagens</h1>
                    </div>
                </div>
                
            </div>
        </header>
    );
}

export default Header;
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';


const AlertToast = ({message, show, contextualBg, onClose, titleToaster}) =>{
    
    return(


        <ToastContainer
        className="p-3 static"
        position={'top-center'}
        style={{ zIndex: 1, position: "fixed" }}
        
    >
        <Toast bg={contextualBg} show={show} onClose={onClose} delay={8000} autohide>
            <Toast.Header>
                
            <strong className="me-auto">{titleToaster}</strong>
            <small></small>

            </Toast.Header>
            <Toast.Body className='text-white'>{message}</Toast.Body>
        </Toast>
    </ToastContainer>
    )
}

export default AlertToast;
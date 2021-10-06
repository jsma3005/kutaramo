import cls from './Chat.module.scss';
import { BsChatSquare } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames'
import { closeChatAction, openChatAction } from '../../redux/App/actions';
import { AiOutlineClose } from 'react-icons/ai'
import { useEffect } from 'react';

const Chat = () => {
    const { chat } = useSelector(s => s.App);
    const dispatch = useDispatch();

    const handleOpen = () => {
        dispatch(openChatAction())
    }

    const handleClose = () => {
        dispatch(closeChatAction())
    }

    // Закрытие по ESC
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) {
                handleClose()
            }
        };
        window.addEventListener('keydown', handleEsc);
     
        return () => {
           window.removeEventListener('keydown', handleEsc);
        };
    }, [dispatch])
    
    return (
        <div className={cn(cls.root, {[cls.active]: chat})}>
            <div onClick={handleOpen} className={cls.closedChat}>
                <span className={cls.chatTitle}>CHAT</span>
                <span>
                    <BsChatSquare />
                </span>
            </div>
            <div className={cls.openedChat}>
                <div className={cls.header}>
                    <AiOutlineClose onClick={handleClose} />
                    <span>CHAT</span>
                    <div></div>
                </div>
                <div className={cls.chat}>
                    <span className={cls.welcomeMessage}>Welcome to Kutaramo Chat. How can we help you?</span>
                </div>
                <div className={cls.input}>
                    <input placeholder='message' type='text' />
                    <button>send</button>
                </div>
            </div>
        </div>
    )
}

export default Chat;
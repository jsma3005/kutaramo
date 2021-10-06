import cls from './Loader.module.scss';

const Loader = ({ isLoadingPage }) => {
    return (
        <div 
            className={cls.root}
            style={{
                height: isLoadingPage ? '90vh' : '100%'
            }}
        >
            <div className={cls.loader}><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loader
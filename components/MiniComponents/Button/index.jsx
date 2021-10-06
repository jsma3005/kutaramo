import cls from './Button.module.scss';
import classNames from 'classnames'

export default function Button({ className, children, disabled, ...props }){
    return (
        <button disabled={disabled} className={classNames(cls.root, className)} {...props}>
            {children}
        </button>
    )
}
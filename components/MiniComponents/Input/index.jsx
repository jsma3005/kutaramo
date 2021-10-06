import cls from './Input.module.scss';
import classNames from 'classnames'

export default function Input({ className, label, errorText, textarea = false, ...props }){
    return (
        <div className={classNames(cls.root, className)}>
            <label>
                <span>{label}</span>
                {
                    !textarea && (
                        <input className={cls.input} {...props} />
                    )
                }
                {
                    textarea && (
                        <textarea className={classNames(cls.input, {[cls.textarea]: textarea})} {...props} />
                    )
                }
            </label>
            <span className={cls.errorText}>{errorText}</span>
        </div>
    )
}
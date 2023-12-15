import classes from './Notification.module.css';

const Notification = props => {

    let specialClass = '';

    if(props.status === 'success'){
        specialClass = classes.success
    }
    if(props.status === 'error'){
        specialClass = classes.error
    }

    const cssClasses = `${classes.notification} ${specialClass}`

    const { title, message } = props

    return <section className={cssClasses}>
        <h2>{title}</h2>
        <p>{message}</p>
    </section>

}

export default Notification;
import styles from "./Card.module.scss";

/* Higher Order Components */
function Card(props) {
  const { children, cardClass } = props;
  return <div className={` ${styles.card} ${cardClass}`}>{children}</div>;
}
export default Card;

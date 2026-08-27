import PropTypes from "prop-types";

export default function Card({ children }) {
  return <section className="card">{children}</section>;
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

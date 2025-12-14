/**
 * Description placeholder
 *
 * @interface Props
 * @typedef {Props}
 */
interface Props {
  /**
   * Description placeholder
   *
   * @type {string}
   */
  message: string;
  red?: boolean;
}

/**
 * Description placeholder
 *
 * @export
 * @param {Props} props
 * @returns {*}
 */
export function TestComponent(props: Props) {
  const { message, red } = props;
  // eslint-disable-next-line no-console
  console.log("red: ", red);
  return <div>{message}</div>;
}

TestComponent.defaultProps = {
  red: true,
};

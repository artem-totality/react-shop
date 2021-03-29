import { useEffect } from 'react';

function Alert(props) {
  const { name = '', closeAlert = Function.prototype } = props;

  useEffect(() => {
    let timerId = setTimeout(closeAlert, 1500);
    return () => clearTimeout(timerId);
    //eslint-disable-next-line
  }, [name]);

  return (
    <div id="toast-container">
      <div className="toast">{name} добавлен в корзину</div>
    </div>
  );
}

export default Alert;

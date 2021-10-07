import { FieldInterface } from '../../schemes/component/Field';
import React from 'react';
import _ from 'lodash';

function FieldDate(props: FieldInterface) {
  const renderDefault = function () {
    if (_.isEmpty(props.data.value)) return null;
    const displayValue = _.isArray(props.data.value) ?
      <div className="field__items">
        {
          props.data.value.map((e, i) => <div className="field__item" key={i}><time className="datetime">{e}</time></div>)
        }
      </div>
      : <div className="field__item"><time className="datetime">{props.data.value}</time></div>;
    return (
      <div>
        <div className="field__label"></div>
        {displayValue}
      </div>
    );
  };

  return renderDefault();
}

export default FieldDate;
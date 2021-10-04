import { FieldInterface } from '../../schemes/component/Field';
import React from 'react';
import _ from 'lodash';

function FieldNumberInteger(props: FieldInterface) {
  const renderDefault = function () {
    if (!_.isNumber(props.data.value) && _.isEmpty(props.data.value)) return <></>;
    const displayValue = _.isArray(props.data.value)
      ? <div className="field__items">{props.data.value.map((e, i) => <div key={i} className="field__item">{e}</div>)}</div>
      : <div className="field__item">{props.data.value}</div>;
    return (
      <div>
        <div className="field__label"></div>
        {displayValue}
      </div>
    );
  };

  return renderDefault();
}

export default FieldNumberInteger;
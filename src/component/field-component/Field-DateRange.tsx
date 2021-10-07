import { FieldInterface } from '../../schemes/component/Field';
import React from 'react';
import _ from 'lodash';

function FieldDateRange(props: FieldInterface) {
  const renderDefault = function () {
    if (_.isEmpty(props.data.value)) return null;
    const displayValue = _.isArray(props.data.value) ?
      <div className="field__items">
        {props.data.value.map((e, i) => <div className="field__item" key={i}><time className="datetime">{_.get(e, "value")}</time>～{' '}<time className="datetime">{_.get(e, "end_value")}</time></div>)}
      </div>
      : <div className="field__item">
        <time className="datetime">{_.get(props.data.value, "value")}</time>～{' '}<time className="datetime">{_.get(props.data.value, "end_value")}</time>
      </div>;
    return (
      <div>
        <div className="field__label"></div>
        {displayValue}
      </div>
    );
  };

  return renderDefault();
}

export default FieldDateRange;
import { FieldInterface } from '../../schemes/component/Field';
import React from 'react';
import _ from 'lodash';

function FieldLink(props: FieldInterface) {
  const renderDefault = function () {
    if (_.isEmpty(props.data.value)) return null;
    const displayValue = _.isArray(props.data.value)
      ? <div className="field__items">
        {props.data.value.map((e, i) => <div className="field__item" key={i}><a href={_.get(e, 'uri')}>{_.get(e, 'title')}</a></div>)}
      </div>
      : <div className="field__item"><a href={_.get(props.data.value, 'uri')}>{_.get(props.data.value, 'title')}</a></div>;
    return (
      <div>
        <div className="field__label"></div>
        {displayValue}
      </div>
    );
  };

  return renderDefault();
}

export default FieldLink;
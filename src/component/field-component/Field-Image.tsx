import { FieldInterface } from '../../schemes/component/Field';
import { CMS_HOST } from '../../schemes/component/Constant';
import React from 'react';
import _ from 'lodash';

function FieldImage(props: FieldInterface) {
  const renderDefault = function () {
    if (_.isEmpty(props.data.value)) return <></>;
    const imageData = [];
    const path = _.isEmpty(props.basePath) ? CMS_HOST : ((!props.basePath.endsWith('/')) ? props.basePath += '/' : props.basePath);
    if (_.isArray(props.data.value)) {
      imageData.push(...props.data.value);
      return (
        <div>
          <div className="field__label"></div>
          <div className="field__items">
            <div className="field__item">
              {imageData.map((e, i) => {
                const pos = props.data.include.findIndex(o => o.id === e.id);
                const url = `${path}${_.get(props.data.include[pos], 'attributes.uri.url')}`;
                const alt = _.get(e, 'meta.alt');
                const title = _.get(e, 'meta.title');
                return (
                  <img key={i} src={url} {...(alt ? { alt } : '')} {...(title ? { title } : '')} />
                );
              })}
            </div>
          </div>
        </div>
      );
    } else {
      imageData.push(props.data.value);
      return (
        <div>
          <div className="field__label"></div>
          <div className="field__item">
            {imageData.map((e, i) => {
              const pos = props.data.include.findIndex(o => o.id === e.id);
              const url = `${CMS_HOST}/${_.get(props.data.include[pos], 'attributes.uri.url')}`;
              const alt = _.get(e, 'meta.alt');
              const title = _.get(e, 'meta.title');
              return (
                <img key={i} src={url} {...(alt ? { alt } : '')} {...(title ? { title } : '')} />
              );
            })}
          </div>
        </div>
      );
    }

  };

  return renderDefault();
}

export default FieldImage;
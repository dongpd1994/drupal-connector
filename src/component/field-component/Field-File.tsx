import { FieldInterface } from '../../schemes/component/Field';
import { CMS_HOST } from '../../schemes/component/Constant';
import React from 'react';
import _ from 'lodash';

function FieldFile(props: FieldInterface) {
  const renderDefault = function () {
    if (_.isEmpty(props.data.value)) return null;
    const fileData = [];
    const path = _.isEmpty(props.basePath) ? CMS_HOST : ((!_.endsWith(_.get(props, 'basePath'), '/')) ? props.basePath += '/' : props.basePath);
    if (_.isArray(props.data.value)) {
      fileData.push(...props.data.value);
      return (
        <div>
          <div className="field__label"></div>
          <div className="field__items">
            <div className="field__item">
              {fileData.map(e => {
                const pos = props.data.include.findIndex(o => o.id === e.id);
                const url = `${path}${_.get(props.data.include[pos], 'attributes.uri.url')}`;
                const fileName = _.get(props.data.include[pos], 'attributes.uri.value').slice(
                  _.get(props.data.include[pos], 'attributes.uri.value').lastIndexOf('/') + 1
                );
                return (
                  <div key={e.id}>
                    <span>
                      <a href={url} style={{ fontWeight: 'normal', textDecoration: 'underline' }} download>
                        {_.get(e, 'meta.description') ? _.get(e, 'meta.description') : fileName}
                      </a>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    } else {
      fileData.push(props.data.value);
      return (
        <div>
          <div className="field__label"></div>
          <div className="field__item">
            {fileData.map(e => {
              const pos = props.data.include.findIndex(o => o.id === e.id);
              const url = `${CMS_HOST}/${_.get(props.data.include[pos], 'attributes.uri.url')}`;
              const fileName = _.get(props.data.include[pos], 'attributes.uri.value').slice(
                _.get(props.data.include[pos], 'attributes.uri.value').lastIndexOf('/') + 1
              );
              return (
                <div key={e.id}>
                  <span>
                    <a href={url} style={{ fontWeight: 'normal', textDecoration: 'underline' }} download>
                      {_.get(e, 'meta.description') ? _.get(e, 'meta.description') : fileName}
                    </a>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

  };

  return renderDefault();
}

export default FieldFile;
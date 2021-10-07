import { FieldInterface } from '../../schemes/component/Field';
import { CMS_HOST } from '../../schemes/component/Constant';
import React from 'react';
import _ from 'lodash';

function FieldReference(props: FieldInterface) {
  const renderDefault = function () {
    const referenceData = [];
    if (_.isArray(props.data.value)) {
      referenceData.push(...props.data.value);
    } else {
      referenceData.push(props.data.value);
    }
    const path = _.isEmpty(props.basePath) ? CMS_HOST : ((!props.basePath.endsWith('/')) ? props.basePath += '/' : props.basePath);
    return (
      <div>
        <div className="field__label"></div>
        <div className="field__item">
          {referenceData.map(e => {
            const pos = props.data.include.findIndex(o => o.id === e.id);
            if (pos < 0) {
              return null;
            }
            let url = '';
            const type = _.get(props.data.include[pos], 'type');
            let displayContent = '';
            if (_.startsWith(type, 'user')) {
              displayContent = _.get(props.data.include[pos], 'attributes.name');
              url = `${path}user/${_.get(props.data.include[pos], 'attributes.drupal_internal__uid')}`;
            } else if (_.startsWith(type, 'node')) {
              displayContent = _.get(props.data.include[pos], 'attributes.title');
              url = `${path}node/${_.get(props.data.include[pos], 'attributes.drupal_internal__nid')}`;
            } else if (_.startsWith(type, 'taxonomy_term')) {
              displayContent = _.get(props.data.include[pos], 'attributes.name');
              url = `${path}taxonomy/term/${_.get(props.data.include[pos], 'attributes.drupal_internal__tid')}`;
            }
            return (
              <div key={_.get(props.data.include[pos], 'id')}>
                <span>
                  <a href={url} style={{ fontWeight: 'normal', textDecoration: 'underline' }}>
                    {displayContent}
                  </a>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return renderDefault();
}

export default FieldReference;
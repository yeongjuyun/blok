import config from './blockTemplates.json';
import { StyleData, TemplateData } from './blockValidator';

export const getStyleOptions = (blockType: string): StyleData[] => {
  //동일한 blockType을 가진 다른 블록템플릿 리스트를 구함
  let blockTemplates = config.blockTemplates.filter((blockTemplate) => {
    return blockTemplate.template.blockType === blockType;
  });
  let styleOptions = blockTemplates.map(({ template }) => {
    return { label: getLabelOfTemplate(template), value: template };
  });
  return styleOptions;
};

export const getLabelOfTemplate = (template: TemplateData) => {
  const name = template.layout
    ? `${template.theme} ${template.layout}`
    : `${template.theme} Default`;
  return name;
};

export const getCurrentStyleOption = (template: TemplateData) => {
  return {
    label: getLabelOfTemplate(template),
    value: template,
  };
};

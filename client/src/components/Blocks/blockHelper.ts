import config from './blockTemplates.json';

interface StyleOption {
  label: string;
  value: string;
}
export const getStyleOptions = (blockType: string): StyleOption[] => {
  //동일한 blockType을 가진 다른 블록템플릿 리스트를 구함
  let blockTemplates = config.blockTemplates.filter((blockTemplate) => {
    return blockTemplate.template.blockType === blockType;
  });
  let styleOptions = blockTemplates.map(({ template }) => {
    let label = template.layout
      ? `${template.theme} ${template.layout}`
      : `${template.theme} Default`;
    let value = template.layout
      ? `${template.theme} ${template.layout}`
      : `${template.theme} Default`;
    return { label, value };
  });

  return styleOptions;
};

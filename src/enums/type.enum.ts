export enum eResourceType {
  COMPONENT = "component",
  DIRECTIVE = "directive",
  PIPE = "pipe",
}

export enum eComponentType {
  PAGE = "page",
  WIDGET = "widget",
}

export const ALL_RESOURCE_TYPES = [eResourceType.COMPONENT, eResourceType.DIRECTIVE, eResourceType.PIPE];
export const ALL_COMPONENT_TYPES = [eComponentType.PAGE, eComponentType.WIDGET];

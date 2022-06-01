export enum eEntityType {
  COMPONENT = "component",
  DIRECTIVE = "directive",
  SERVICE = "service",
  PIPE = "pipe",
}

export enum eComponentType {
  COMMON = "common",
  DIALOG = "dialog",
  PAGE = "page",
  WIDGET = "widget",
}

export enum eServiceType {
  COMMON = "common",
  API = "api",
}

export const ALL_ENTITY_TYPES_VALUES = Object.values(eEntityType);

export const ALL_COMPONENT_TYPES = Object.values(eComponentType);
export const ALL_SERVICE_TYPES = Object.values(eServiceType);

export const ALL_ENTITY_TYPES = {
  [eEntityType.COMPONENT]: ALL_COMPONENT_TYPES,
  [eEntityType.DIRECTIVE]: [],
  [eEntityType.SERVICE]: ALL_SERVICE_TYPES,
  [eEntityType.PIPE]: [],
};

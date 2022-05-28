export enum eResourceType {
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

export const ALL_RESOURCE_TYPES = Object.values(eResourceType);
export const ALL_COMPONENT_TYPES = Object.values(eComponentType);

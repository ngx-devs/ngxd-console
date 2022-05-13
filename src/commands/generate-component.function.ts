import * as vscode from 'vscode';

import { eError } from '../enums/error.enum';
import { ALL_COMPONENT_TYPES, ALL_RESOURCE_TYPES, eResourceType } from '../enums/type.enum';
import { installCliIfNotInstalled } from '../functions/cli.function';
import { execShell } from '../functions/exec-shell.function';

export async function generateComponent(uri: vscode.Uri) {
  await installCliIfNotInstalled();

  const path = uri.fsPath;

  const componentName = await vscode.window.showInputBox({
    placeHolder: "Enter the component name",
  });

  if (!componentName) {
    return vscode.window.showErrorMessage(eError.NAME_REQUIRED);
  }

  const resourceType = await vscode.window.showQuickPick(ALL_RESOURCE_TYPES);
  if (!resourceType) {
    return vscode.window.showErrorMessage(eError.RESOURCE_TYPE_REQUIRED);
  }

  if (resourceType !== eResourceType.COMPONENT) return;

  const componentType = await vscode.window.showQuickPick(ALL_COMPONENT_TYPES);
  await execShell(`ngxd g c ${componentType} ${componentName} --path ${path}`);

  vscode.window.showInformationMessage(`Component ${componentName} created in ${path}`);
}

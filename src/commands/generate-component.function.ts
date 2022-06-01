import * as vscode from 'vscode';

import { eError } from '../enums/error.enum';
import { ALL_COMPONENT_TYPES } from '../enums/type.enum';
import { execShell } from '../functions/exec-shell.function';

export async function generateComponent(uri: vscode.Uri) {
  const path = uri.fsPath;

  const componentName = await vscode.window.showInputBox({
    placeHolder: "Enter the component name",
  });

  if (!componentName) {
    return vscode.window.showErrorMessage(eError.NAME_REQUIRED);
  }

  const componentType = await vscode.window.showQuickPick(ALL_COMPONENT_TYPES);

  if (!componentType) {
    return vscode.window.showErrorMessage(eError.COMPONENT_TYPE_REQUIRED);
  }

  const command = `ngxd g c ${componentType} ${componentName} --path ${path}`;
  console.log({ command });
  await execShell(command);

  vscode.window.showInformationMessage(`Component ${componentName} created in ${path}`);
}

import * as vscode from 'vscode';

import { eError } from '../enums/error.enum';
import { ALL_ENTITY_TYPES, ALL_ENTITY_TYPES_VALUES, eEntityType } from '../enums/type.enum';
import { execShell } from '../functions/exec-shell.function';
import { capitalizeFirstLetter } from '../functions/utils.function';

export async function generateEntity(uri: vscode.Uri) {
  const path = uri.fsPath;

  const entityType: eEntityType = (await vscode.window.showQuickPick(ALL_ENTITY_TYPES_VALUES)) as eEntityType;

  if (!entityType) {
    return vscode.window.showErrorMessage(eError.RESOURCE_TYPE_REQUIRED);
  }

  const entityName = await vscode.window.showInputBox({
    placeHolder: `Enter the ${entityType} name`,
  });

  if (!entityName) {
    return vscode.window.showErrorMessage(eError.NAME_REQUIRED);
  }

  const entityTypes = ALL_ENTITY_TYPES[entityType];
  const serviceType = await vscode.window.showQuickPick(entityTypes);

  await execShell(`ngxd g ${entityType} ${serviceType} ${entityName} --path ${path}`);

  const capitalizedEntityType = capitalizeFirstLetter(entityType);

  vscode.window.showInformationMessage(`${capitalizedEntityType} ${entityName} created in ${path}`);
}

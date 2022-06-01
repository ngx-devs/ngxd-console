import * as vscode from 'vscode';

import { eError } from '../enums/error.enum';
import { ALL_SERVICE_TYPES } from '../enums/type.enum';
import { execShell } from '../functions/exec-shell.function';

export async function generateService(uri: vscode.Uri) {
  const path = uri.fsPath;

  const serviceName = await vscode.window.showInputBox({
    placeHolder: "Enter the service name",
  });

  if (!serviceName) {
    return vscode.window.showErrorMessage(eError.NAME_REQUIRED);
  }

  const serviceType = await vscode.window.showQuickPick(ALL_SERVICE_TYPES);

  if (!serviceType) {
    return vscode.window.showErrorMessage(eError.SERVICE_TYPE_REQUIRED);
  }

  await execShell(`ngxd g s ${serviceType} ${serviceName} --path ${path}`);

  vscode.window.showInformationMessage(`Service ${serviceName} created in ${path}`);
}

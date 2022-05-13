import * as vscode from 'vscode';

import { execShell } from './exec-shell.function';

export const hasCliInstalled = async () => {
  try {
    await execShell("ngxd --version");
    return true;
  } catch (e) {
    return false;
  }
};

export const installCliIfNotInstalled = async () => {
  const hasNgxdCliInstalled = await hasCliInstalled();
  if (hasNgxdCliInstalled) return;

  const response = await vscode.window.showInformationMessage(
    "@ngx-devs/cli is not installed do you want to install?",
    "Yes",
    "No"
  );

  if (response === "No") {
    return vscode.window.showErrorMessage("@ngx-devs/cli is required to run this extension");
  }

  await execShell("npm install -g @ngx-devs/cli");
  vscode.window.showInformationMessage("@ngx-devs/cli installed successfully");
};

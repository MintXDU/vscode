import { ExtensionContext, ViewColumn, WebviewPanel, window, commands } from 'vscode';

let webviewPanel: WebviewPanel | undefined;

export function createWebView(
    context: ExtensionContext,
    viewColumn: ViewColumn,
    label: string
) {
    if (webviewPanel === undefined) {
        webviewPanel = window.createWebviewPanel(
            'a name',
            label,
            viewColumn,
            {
                retainContextWhenHidden: true,
                enableScripts: true
            }
        )

        webviewPanel.webview.html = getIframeHtml(label);
    } else {
        webviewPanel.title = label;
        webviewPanel.reveal();
    }

    webviewPanel.onDidDispose(() => {
        webviewPanel = undefined;
    });

    return webviewPanel;
}

export function getIframeHtml(label: string) {
    if (label === "icon1")
        return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style>
                html,
                body {
                    margin: 0 !important;
                    padding: 0 !important;
                    width: 100%;
                    height: 100%;
                }
                .iframeDiv {
                    width: 100%;
                    height: 100%;
                }
            </style>
            </head>

            <body>
            hello icon4!
            <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
            <iframe id='iframe1' class="iframeDiv" src="https://rs.xidian.edu.cn/cas/login.php" scrolling="auto"></iframe>
            </body>
        </html>
        `;
    else if (label === "icon2")
        return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style>
                html,
                body {
                    margin: 0 !important;
                    padding: 0 !important;
                    width: 100%;
                    height: 100%;
                }
                .iframeDiv {
                    width: 100%;
                    height: 100%;
                }
            </style>
            </head>

            <body>
            hello icon3!
            </body>
        </html>
        `;
    else
        return '';
}

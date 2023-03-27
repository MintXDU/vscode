import { TreeItem, TreeItemCollapsibleState, TreeDataProvider, Uri, window, Command, CancellationToken, Event, ProviderResult } from 'vscode';
import { join } from 'path';

const ITEM_ICON_MAP = new Map<string, string>([
    ['icon1', 'checkmark-round.svg'],
    ['icon2', 'haishis.svg']
]);

export class TreeItemNode extends TreeItem{
    constructor(
        public readonly label: string,
        public readonly collapsibleState: TreeItemCollapsibleState,
    ) {
        super(label, collapsibleState);
    }

    command = {
        title: this.label,
        command: 'itemClick',
        tooltip: this.label,
        arguments: [
            this.label,
        ]
    }

    iconPath = TreeItemNode.getIconUriForLabel(this.label);

    static getIconUriForLabel(label: string): Uri {
        return Uri.file(join(__filename, '..', '..', 'media', ITEM_ICON_MAP.get(label)+''));
    }
}

export class TreeViewProvider implements TreeDataProvider<TreeItemNode> {
    onDidChangeTreeData?: Event<void | TreeItemNode | TreeItemNode[] | null | undefined> | undefined;

    getTreeItem(element: TreeItemNode): TreeItem | Thenable<TreeItem> {
        return element;
    }

    getChildren(element?: TreeItemNode | undefined): ProviderResult<TreeItemNode[]> {
        return ['icon1', 'icon2'].map(
            item => new TreeItemNode(
                item as string,
                TreeItemCollapsibleState.None as TreeItemCollapsibleState,
            )
        )
    }

    getParent?(element: TreeItemNode): ProviderResult<TreeItemNode> {
        throw new Error('Method not implemented.');
    }

    resolveTreeItem?(item: TreeItem, element: TreeItemNode, token: CancellationToken): ProviderResult<TreeItem> {
        throw new Error('Method not implemented.');
    }

    public static initTreeViewItem() {
        const treeViewProvider = new TreeViewProvider();

        window.registerTreeDataProvider('treeView-item', treeViewProvider);
    }
}
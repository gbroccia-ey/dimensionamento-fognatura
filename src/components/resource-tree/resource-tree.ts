import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'resource-tree-view',
    templateUrl: 'resource-tree.html'
})
export class ResourceTree {
    @Input() TreeData: any[];
    @Input() hasCheckbox: boolean = true;
    @Output() selected = new EventEmitter();

    constructor() { }

    toggleChildren(node: any) {
        node.visible = !node.visible;
    }

    toggleChildrenChecked(node: any) {
        var _toggleChecked = (n,sts?) => {
            if (sts === undefined){
                n.checked = !n.checked;
                sts = n.checked;
            }
            else {
                n.checked = sts;
            }
            n.children?.forEach((part,index,children) => _toggleChecked(children[index],sts));

        }
        _toggleChecked(node);
    }
}
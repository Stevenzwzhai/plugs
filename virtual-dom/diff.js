import {isString} from './utils'
import listDiff from './listDiff'

const diffType = {
    TEXT: 0,
    PROPS: 1,
    REPLACE:2,
    REORDER: 3
}
function diff(oldTree, newTree){
    let patches = {};
    let index = 0;
    diffWalk(oldTree, newTree, index, patches);
    return patches;
}

function diffWalk(oldNode, newNode, index, patches){
    let currentPatches = [];
    if(!newNode){

    }
    if(isString(oldNode) && isString(newNode)){
        if(oldNode !== newNode){
            currentPatches.push({
                type: diffType.TEXT,
                content: newNode
            })
        }
    } else if (oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
        let propsPatches = diffProps(oldNode, newNode);
        if(propsPatches){
            currentPatches.push({
                type: diffType.PROPS,
                props: propsPatches
            })
        }
        diffChildren(oldNode.children, newNode.children, index, patches);
    } else {
        propsPatches.push({
            type: diffProps.REPLACE,
            node: newNode
        })
    }
    if(currentPatches){
        patches[index] = currentPatches;
    }
}

function diffChildren(oldChildren, newChildren, index, patches){
    var diffs = listDiff(oldChildren, newChildren, 'key')
    newChildren = diffs.children

    if (diffs.moves.length) {
        var reorderPatch = { type: patch.REORDER, moves: diffs.moves }
        currentPatch.push(reorderPatch)
    }


    let leftNode = null;
    let currentIndex = index;
    oldChildren.forEach((node, nodeIndex) => {
        currentIndex = (leftNode && leftNode.count) ? (currentIndex + leftNode.count + 1) : (currentIndex + 1);
        //深度优先
        diffWalk(node, newChildren[index], currentIndex, patches);
        leftNode = node;
    })

}

function diffProps(oldNode, newNode){
    let oldProps = oldNode.props;
    let newProps = newNode.props;
    let count = 0;
    let propsPatches = {}
    for(let key in oldProps){
        if(oldProps[key] !== newProps[key]){
            count++;
            propsPatches[key] = newProps[key];
        }
    }

    for(let key in newProps){
        if(!oldProps.hasOwnProperty(key)){
            count++
            propsPatches[key] = newProps[key];
        }
    }
    if(!count){
        return null;
    }
    return propsPatches;
}
const diffType = {
    TEXT: 0,
    PROPS: 1,
    REPLACE:2,
    REORDER: 3
}

function patch(node, patches){
    let walk = {
        index:0
    }
    dispatch(node, walk, patches)
}

function dispatch(node, walk, patches){
    let currentPatches = patches[walk.index];
    let len = node.childNodes ? node.childNodes.length : 0;
    for(let i of len){
        walk.index++;
        dispatch(node.childNodes[i], walk, patches)
    }
    currentPatches && applayPatches(node, currentPatches);
}

function applyPatches(node, currentPatches){
    currentPatches.forEach(patch => {
        switch(patch.type) {
            case diffType.TEXT:
                if (node.textContent) {
                    node.textContent = currentPatch.content
                } else {
                  // fuck ie
                    node.nodeValue = currentPatch.content
                }
                break;
            case diffType.PROPS:
                setProps(node, patch);
                break;
            case diffType.REPLACE:
                var newNode = (typeof currentPatch.node === 'string')
                ? document.createTextNode(currentPatch.node)
                : currentPatch.node.render(),
                node.parentNode.replaceNode(node.render(), node);
                break;
            default: throw new Error('Unknown patch type ' + currentPatch.type);
        }
    })
}
    function classification(data, deep, parentId, level){
        //data=>your arrList,deep=>the most type,parentId=>your parentId name, level=>your level name
        if(Object.prototype.toString.call(data) !== '[object Array]'){
            return [];
        }
        let typeArray = [];
        data = [].concat(data);
        for(let i=0; i<deep; i++){
            typeArray[i] = [];
        }
        //分类
        data.forEach(item => {
            let index = item[level]-1;
            item.child = [];
            typeArray[index].push(item);
        })
        let length = deep;
        while(length>1){
            insertParent(typeArray[length-2], typeArray[length-1])
            length--;
        }
        if(length==1){
            return typeArray[0];
        }
        function insertParent(parent, child){
            for(let itemA of parent){
                itemA.child = [];
                for(let itemB of child){
                    if(itemB[parentId] == itemA.id){

                        itemA.child.push(itemB);
                    }
                }
            }
        }
    }

//更加简便的方式
function listToTree(list) {
  const map = {};
  let node;
  let roots = [];
  let i;
  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i; // initialize the map
    list[i].children = []; // initialize the children
  }
  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parentId != '-1') {
      // if you have dangling branches check that map[node.parentId] exists
      node.parentName = list[map[node.parentId]].label;
      list[map[node.parentId]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

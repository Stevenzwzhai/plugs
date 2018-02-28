/*
*创建二叉树并进行前序，中序，后序遍历
*/

function Node(data, left, right){
    this.data = data;
    this.getData = () => {
        return this.data;
    }
    this.left = left;
    this.right = right;
}

function insertData(data){
    let newNode = new Node(data, null, null);
    if(!this.root){
        this.root = newNode;
    }else{
        let currentNode = this.root;
        let parentNode;
        while(true){
            parentNode = currentNode;
            if(data < currentNode.data){
                currentNode = currentNode.left;
                if(!currentNode){
                    parentNode.left = newNode;
                    break;
                }
            }else{
                currentNode = currentNode.right;
                if(!currentNode){
                    parentNode.right = newNode;
                    break;
                }
            }
        }
    }
}
//中序
function printInOrder(node){
    if(node){
        printInOrder(node.left)
        console.log(node.getData());
        printInOrder(node.right)
    }
}
//前序
function printBeforeOrder(node){
    if(node){
        console.log(node.getData());
        printInOrder(node.left)
        printInOrder(node.right)
    }
}
//后序
function printAfterOrder(node){
    if(node){
        printInOrder(node.left)
        printInOrder(node.right)
        console.log(node.getData());
    }
}
function BST() {
   this.root = null;
   this.insert = insertData;
   this.printInOrder = printInOrder;
   this.printBeforeOrder = printBeforeOrder;
   this.printAfterOrder = printAfterOrder;
   
}

let bst = new BST();
bst.insert(1);
bst.insert(2);
bst.insert(3);
bst.insert(4);
bst.insert(5);
bst.printInOrder(bst.root)
bst.printBeforeOrder(bst.root)
bst.printAfterOrder(bst.root)


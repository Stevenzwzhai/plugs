class classNameOp {
    constructor(nodeObj) {
        this.nodeObj = nodeObj;
    }
    checkNames(classNames) {
        if (Object.prototype.toString.call(classNames) !== "[object Array]") {
            console.error("please use array params");
            return;
        }
    }
    add(classNames) {
        this.checknames(classNames);
        this.nodeObj.className += " " + classNames.join(" ");
    }
    remove(className) {
        this.checkNames(classNames);
        let currentNames = this.nodeObj.className.split(" ");
        classNames.forEach((item, index) => {
            if (currentNames.find(name => name === item)) {
                currentNames.splice(index, 1);
            }
        })
        this.nodeObj.className = currentNames.join(" ");
    }
    replace(oldName, newName) {
        this.nodeObj.className = this.nodeObj.className.replace(oldName.replace(/\s/g, ''), newName.replace(/\s/g, ''));

    }
    addBefore(newName, oldName) {
        let currentNames = this.nodeObj.className.split(" ");
        if (oldName) {
            let index = currentNames.findIndex(item => item === oldName);
            currentNames.splice(index, 0, newName);
            this.nodeObj.className = currentNames.join(" ");
        } else {
            this.nodeObj.className = `${newName} ${this.nodeObj.className}`;
        }
    }
    addAfter(newName, oldName) {
        let currentNames = this.nodeObj.className.split(" ");
        if (oldName) {
            let index = currentNames.findIndex(item => item === oldName);
            currentNames.splice(index + 1, 0, newName);
            this.nodeObj.className = currentNames.join(" ");
        } else {
            this.add([oldName]);
        }
    }
}
export default classNameOp;
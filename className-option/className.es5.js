;(function() {
    function classNameOp(nodeObj) {
        this.nodeObj = nodeObj;
    }
    classNameOp.prototype = {
        checkNames: function(classNames) {
            if (Object.prototype.toString.call(classNames) !== "[object Array]") {
                console.error("please use array params");
                return;
            }
        },
        add: function(classNames) {
            this.checknames(classNames);
            this.nodeObj.className += " " + classNames.join(" ");
        },
        remove: function(className) {
            this.checkNames(classNames);
            let currentNames = this.nodeObj.className.split(" ");
            classNames.forEach((item, index) => {
                if (currentNames.indexOf(item) >= 0) {
                    currentNames.splice(index, 1);
                }
            })
            this.nodeObj.className = currentNames.join(" ");
        },
        replace: function(newName, oldName) {
            this.nodeObj.className = this.nodeObj.className.replace(oldName.replace(/\s/g, ''), newName.replace(/\s/g, ''));

        },
        addBefore: function(newName, oldName) {
            let currentNames = this.nodeObj.className.split(" ");
            if (oldName) {
                let index = currentNames.indexOf(oldName);
                currentNames.splice(index, 0, newName);
                this.nodeObj.className = currentNames.join(" ");
            } else {
                this.nodeObj.className = `${newName} ${this.nodeObj.className}`;
            }
        },
        addAfter(newName, oldName) {
            let currentNames = this.nodeObj.className.split(" ");
            if (oldName) {
                let index = currentNames.indexOf(oldName);
                currentNames.splice(index + 1, 0, newName);
                this.nodeObj.className = currentNames.join(" ");
            } else {
                this.add([oldName]);
            }
        }
    }

    var moduleName = classNameOp;
    if (typeof module !== 'undefined' && typeof exports === 'object' && define.cmd) {
        module.exports = moduleName;
    } else if (typeof define === 'function' && define.amd) {

        define(function() {
            return moduleName;
        });

    } else {
        this.moduleName = moduleName;
    }
}).call(function() {

    return this || (typeof window !== 'undefined' ? window : global);
});
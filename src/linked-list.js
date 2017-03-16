const Node = require('./node');

class LinkedList {

    constructor() {
        this.nodes = [];
        this.length = this.nodes.length;
        this._head;
        this._tail;
    }

    append(data) {
        var aNode = this._createNodeAndUpdateList(data);
        this.nodes.push(aNode);
        this.length = this.nodes.length;
        this._tail = aNode;
        return this;
    }

    head() {
        return this._head ? this._head.data : null;
    }

    tail() {
        return this._tail ? this._tail.data : null;
    }

    at(index) {
        if(index >= this.length) {
            throw Error("Index out of bounds");
        }
        return this.nodes[index].data;
    }

    insertAt(index, data) {
        if(index > this.length) {
            throw Error("Index out of bounds");
        }

        this.nodes.splice(index, 0, this._createNodeAndUpdateList(data));
        
        this.length = this.nodes.length;

        if(index !== 0) {
            this.nodes[index - 1].next = this.nodes[index];
        }
        if(index !== this.length - 1) {
            this.nodes[index + 1].prev = this.nodes[index];
        }
        
        return this;
    }

    isEmpty() {
        return this.length === 0;
    }

    clear() {
        this.nodes = [];
        this.length = 0;
        this._head = null;
        this._tail = null;
        return this;
    }

    deleteAt(index) {
        if(index < 0 || index >= this.length) {
            throw Error("Index out of bounds");
        }

        if(index !== this.length - 1) {
            this.nodes[index + 1].prev = this.nodes[index - 1];
        }

        if(index !== 0) {
            this.nodes[index - 1].next = this.nodes[index + 1];
        }

        this.nodes.splice(index, 1);

        this.length = this.nodes.length;

        return this;
    }

    reverse() {
        this.nodes = this.nodes.reverse();
        this._head = this.nodes[0];
        this._tail = this.nodes[this.length - 1];
        
        this.nodes.map(function(node, index, array) {
            node.prev = index === 0 ? null : array[index - 1];
            node.next = index === array.length - 1 ? null : array[index + 1];
            return node;
        });
        
        return this;
    }

    indexOf(data) {
        return this.nodes.findIndex(x => x.data === data);
    }

    _createNodeAndUpdateList(data) {
        var prev = this.length ? this.nodes[this.length - 1] : null;
        var aNode = new Node(data, prev);

        if(this.isEmpty()) {
            this._head = aNode;
        } else {
            this.nodes[this.length - 1].next = aNode;
        }

        return aNode;
    }
}

module.exports = LinkedList;
